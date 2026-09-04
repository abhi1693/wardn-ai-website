"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

const setupCommands = `git clone https://github.com/abhi1693/wardn-ai.git
cd wardn-ai
cp wardn/backend/.env.example wardn/backend/.env
# Configure PostgreSQL and the required WARDN_* settings.
(cd wardn/backend && uv sync --extra dev && uv run alembic upgrade head)
npm install`;

export function Terminal() {
  const [copied, setCopied] = useState(false);

  async function copyCommand() {
    await navigator.clipboard.writeText(setupCommands);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <div className="terminal">
      <div className="terminal-top">
        <span><i /><i /><i /></span>
        <b>Quick start</b>
        <button type="button" onClick={copyCommand} aria-label="Copy bootstrap commands">
          {copied ? <Check /> : <Copy />}
          <span>{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>
      <div className="terminal-body">
        <span className="terminal-step-label">BOOTSTRAP</span>
        <div><span className="prompt">$</span><code>git clone https://github.com/abhi1693/wardn-ai.git</code></div>
        <div><span className="prompt">$</span><code>cd wardn-ai</code></div>
        <div><span className="prompt">$</span><code>cp wardn/backend/.env.example wardn/backend/.env</code></div>
        <div className="terminal-comment"><span>#</span><code>Configure PostgreSQL and required WARDN_* settings</code></div>
        <div><span className="prompt">$</span><code>(cd wardn/backend &amp;&amp; uv sync --extra dev &amp;&amp; uv run alembic upgrade head)</code></div>
        <div><span className="prompt">$</span><code>npm install</code></div>
        <span className="terminal-step-label process-label">RUN IN THREE TERMINALS</span>
        <div><span className="terminal-number">1</span><code>cd wardn/backend &amp;&amp; uv run uvicorn app.main:app --port 8000 --reload</code></div>
        <div><span className="terminal-number">2</span><code>cd wardn/backend &amp;&amp; uv run python -m app.manage runmcpjobs</code></div>
        <div><span className="terminal-number">3</span><code>npm run web:dev</code></div>
      </div>
      <div className="terminal-foot">
        <span><i /> API</span><span><i /> MCP worker</span><span><i /> frontend</span><strong>Three required processes</strong>
      </div>
    </div>
  );
}
