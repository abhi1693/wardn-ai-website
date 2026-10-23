#!/usr/bin/env bash
# Shared image-workflow interface: image reference, native platform, app version.
set -Eeuo pipefail

if [[ $# != 3 ]]; then
  echo 'Usage: runtime-smoke.sh IMAGE PLATFORM APP_VERSION' >&2
  exit 1
fi
image=$1
platform=$2
app_version=$3
case "$(uname -m)" in
  x86_64) native=linux/amd64 ;;
  aarch64|arm64) native=linux/arm64 ;;
  *) echo 'Unsupported native architecture' >&2; exit 1 ;;
esac
[[ "$platform" == "$native" ]] || { echo 'Runtime smoke requires a native image' >&2; exit 1; }

repo=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd)
next_version=$(python3 -c 'import json,sys; print(json.load(open(sys.argv[1]))["dependencies"]["next"])' "$repo/package.json")
source_version=$(python3 -c 'import json,sys; print(json.load(open(sys.argv[1]))["version"])' "$repo/package.json")
[[ "$app_version" == "$source_version" ]] || { echo 'App version differs from package.json' >&2; exit 1; }
[[ "$(docker image inspect --format '{{index .Config.Labels "org.opencontainers.image.version"}}' "$image")" == "$app_version" ]] || {
  echo 'Runtime OCI version differs from the requested version' >&2
  exit 1
}

docker run --rm -i --platform "$platform" --entrypoint node \
  --env EXPECTED_APP_VERSION="$app_version" --env EXPECTED_NEXT_VERSION="$next_version" "$image" - <<'JS'
const assert = require('node:assert/strict');
const fs = require('node:fs');
assert.equal(process.getuid(), 1000, 'Runtime must use UID 1000');
assert.equal(process.versions.node, '26.12.1', 'Unexpected runtime Node version');
assert.equal(process.env.APP_VERSION, process.env.EXPECTED_APP_VERSION);
assert.equal(require('next/package.json').version, process.env.EXPECTED_NEXT_VERSION);
for (const path of ['/usr/local/lib/node_modules/npm', '/usr/local/bin/npm', '/usr/local/bin/npx', '/usr/local/bin/yarn', '/usr/local/bin/yarnpkg']) {
  assert.equal(fs.existsSync(path), false, `Build package manager remains: ${path}`);
}
assert.equal(fs.readdirSync('/opt').some(name => name.startsWith('yarn-')), false);
fs.accessSync('/app/.next/cache', fs.constants.W_OK);
assert.ok(require('sharp').versions.vips, 'Sharp native runtime did not load');
JS

fixture_dir=$(mktemp -d)
container=''
cleanup() {
  status=$?
  if [[ -n "$container" ]]; then
    if [[ "$status" != 0 ]]; then docker logs --tail 80 "$container" >&2 || true; fi
    docker rm -f "$container" >/dev/null || true
  fi
  rm -rf -- "$fixture_dir"
  exit "$status"
}
trap cleanup EXIT

# Generate test-only material with the image's own native Sharp, without adding
# an application endpoint or a production fixture to the published image.
docker run --rm --platform "$platform" --entrypoint node "$image" -e \
  'require("sharp")({create:{width:32,height:32,channels:3,background:"#12734a"}}).png().toBuffer().then(data=>process.stdout.write(data)).catch(error=>{console.error(error);process.exit(1)})' \
  > "$fixture_dir/runtime-smoke.png"
chmod 644 "$fixture_dir/runtime-smoke.png"
container=$(docker run -d --platform "$platform" --publish 127.0.0.1::3000 \
  --env HOSTNAME=0.0.0.0 --env PORT=3000 \
  --mount "type=bind,src=$fixture_dir/runtime-smoke.png,dst=/app/public/runtime-smoke.png,readonly" "$image")
port=$(docker port "$container" 3000/tcp | sed -n 's/^127\.0\.0\.1://p')
[[ "$port" =~ ^[0-9]+$ ]] || { echo 'Missing private smoke-test port' >&2; exit 1; }

python3 - "http://127.0.0.1:$port" <<'PY'
import time
from html.parser import HTMLParser
from urllib.error import URLError
from urllib.request import Request, urlopen
import sys

base = sys.argv[1]

def get(path, accept="*/*"):
    with urlopen(Request(base + path, headers={"Accept": accept}), timeout=5) as response:
        assert response.status == 200, f"HTTP failure for {path}"
        return response.headers, response.read()

for attempt in range(60):
    try:
        headers, body = get("/")
        break
    except (URLError, TimeoutError, ConnectionError):
        if attempt == 59:
            raise
        time.sleep(1)
html = body.decode()
assert "Wardn AI" in html and "control plane for governed AI tool access" in html
assert "https://github.com/abhi1693/wardn-ai" in html
assert headers.get("X-Content-Type-Options") == "nosniff"

class Assets(HTMLParser):
    paths = set()

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        path = attrs.get("src") if tag == "script" else attrs.get("href")
        if path and path.startswith("/_next/static/") and path.endswith((".js", ".css")):
            self.paths.add(path)

assets = Assets()
assets.feed(html)
assert any(path.endswith(".css") for path in assets.paths), "No built stylesheet"
assert any(path.endswith(".js") for path in assets.paths), "No built JavaScript"
for path in sorted(assets.paths):
    headers, body = get(path)
    assert body, f"Empty built asset: {path}"
    expected = "text/css" if path.endswith(".css") else "javascript"
    assert expected in headers.get("Content-Type", ""), f"Wrong asset type: {path}"

headers, body = get("/runtime-smoke.png")
assert body.startswith(b"\x89PNG\r\n\x1a\n"), "Fixture was not served"
optimizer = "/_next/image?url=%2Fruntime-smoke.png&w=32&q=75"
for attempt in range(10):
    headers, body = get(optimizer, "image/webp")
    assert headers.get("Content-Type", "").startswith("image/webp")
    assert body[:4] == b"RIFF" and body[8:12] == b"WEBP", "Image was not optimized"
    if headers.get("X-Nextjs-Cache") == "HIT":
        break
    if attempt == 9:
        raise AssertionError("Next image cache never became readable after writing")
    time.sleep(0.5)
print(f"Native runtime smoke passed: homepage, {len(assets.paths)} built assets, Sharp/WebP and writable image cache")
PY
