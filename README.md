# Wardn AI website

Single-page marketing site for [wardnai.dev](https://wardnai.dev), built with Next.js App Router, TypeScript, Tailwind CSS, and shadcn/ui primitives.

## Structure

The UI follows atomic design:

- `components/atoms`: smallest brand and layout primitives
- `components/molecules`: reusable composed UI such as the integration strip and terminal
- `components/organisms`: complete landing-page sections
- `components/templates`: page composition
- `components/ui`: shadcn/ui primitives

## Development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run lint
npm run build
```

The Next.js build produces a standalone production server.

Google Analytics is enabled only in production. It defaults to measurement ID
`G-TB10XGBRDT`, can be overridden at build time with `GOOGLE_ANALYTICS_ID`, and
defers loading until the first interaction or page exit.

## Container image

Published releases build a Linux/ARM64 image at
`ghcr.io/abhi1693/wardn-ai-website`. Like the other Wardn frontends, the image
runs the Next.js standalone server as an unprivileged Node user on port `3000`.

Pull requests build and scan the native ARM64 runtime before publication. The
same image workflow runs [the runtime smoke](scripts/runtime-smoke.sh), checking
UID `1000`, Node `26.12.1`, the package and OCI versions, Next.js, removal of
runtime npm/Yarn, real HTTP content and built assets. A temporary PNG exercises
Sharp, Next image optimization and writable image caching; it is mounted only
for the test. Runtime HIGH/CRITICAL vulnerabilities and detected secrets block
the image workflow, including findings without an available fix.

For a local native image, run:

```bash
docker build --build-arg APP_VERSION=0.1.2 -t wardn-ai-website:0.1.2 .
bash scripts/runtime-smoke.sh wardn-ai-website:0.1.2 linux/amd64 0.1.2
```

Use `linux/arm64` on an ARM64 host. The smoke requires Docker and Python 3 and
refuses cross-architecture execution. CI derives and checks the release version
against `package.json`. Trusted pushes to `master` also publish branch images;
release or manual version events publish versioned images. Verify the native
scan, smoke and published immutable digest before updating Fleet.

## Release 0.1.2

Version 0.1.2 is described in [the changelog](CHANGELOG.md). Dependency updates
include the complete package locks and the tested local brace-depth security fix.
Use Node.js 26.12.1 for frontend/CLI checks. ESLint 9 and TypeScript 6 remain at
the latest versions supported by the current lint plugins.
