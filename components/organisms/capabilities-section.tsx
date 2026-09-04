import { LockKeyhole } from "lucide-react";

import { BrandMark } from "@/components/atoms/brand-mark";
import { Reveal } from "@/components/atoms/reveal";
import { SectionKicker } from "@/components/atoms/section-kicker";

export function CapabilitiesSection() {
  return (
    <section className="capabilities section">
      <div className="shell">
        <Reveal><SectionKicker index="03">The whole operating layer</SectionKicker></Reveal>
        <Reveal className="capabilities-heading"><h2>Everything between<br />the model and the action.</h2><p>A compact control plane for the parts that become fragmented when agent programs move beyond a proof of concept.</p></Reveal>
        <div className="bento-grid">
          <Reveal className="bento-card bento-wide catalog-feature">
            <div className="bento-copy"><span className="feature-tag">MCP CATALOG + RUNTIME</span><h3>Approve once.<br />Deploy with confidence.</h3><p>Curate server metadata, install into scoped workspaces, validate real tools, and run with local or Kubernetes-oriented isolation.</p></div>
            <div className="mini-catalog" aria-hidden="true"><div className="mini-catalog-head"><span>Connections</span><span className="mock-button">+ Add connection</span></div><div className="mini-row"><i className="server-icon github-logo">GH</i><span><b>GitHub production</b><small>Healthy · 42 tools</small></span><em>Running</em></div><div className="mini-row"><i className="server-icon pg-logo">PG</i><span><b>Analytics database</b><small>Healthy · 8 tools</small></span><em>Running</em></div><div className="mini-row"><i className="server-icon slack-logo">SL</i><span><b>Slack workspace</b><small>Healthy · 16 tools</small></span><em>Running</em></div></div>
          </Reveal>
          <Reveal className="bento-card bento-tall guardrail-feature">
            <div className="bento-copy"><span className="feature-tag">GUARDRAILS</span><h3>Policy before execution.</h3><p>Restrict tool use, require a human decision, and bind approval to the exact action and arguments.</p></div>
            <div className="policy-code" aria-hidden="true"><div className="code-header"><span><i /><i /><i /></span><b>production-writes</b></div><pre><span>when</span> tool.risk == <em>&quot;write&quot;</em>{"\n"}<span>and</span>  workspace == <em>&quot;production&quot;</em>{"\n\n"}<span>then</span> require_approval({`{`}{"\n"}  route: <em>&quot;platform-oncall&quot;</em>,{"\n"}  expires: <em>&quot;15m&quot;</em>{"\n"}{`}`})</pre><div className="code-result"><span>✓</span> Evaluated before tool call</div></div>
          </Reveal>
          <Reveal className="bento-card agent-feature">
            <div className="bento-copy"><span className="feature-tag">AGENTS + SCHEDULES</span><h3>One agent, many ways to work.</h3><p>Run through chat, recurring tasks, Slack, Telegram, or WhatsApp—with the same tools and policy path.</p></div>
            <div className="channel-path" aria-hidden="true"><span>Chat</span><span>Schedule</span><span>Slack</span><i /><b><BrandMark /></b></div>
          </Reveal>
          <Reveal className="bento-card secrets-feature">
            <div className="bento-copy"><span className="feature-tag">SECRETS + MODELS</span><h3>Credentials stay out of the prompt.</h3><p>Connect model providers and managed secret handles without handing raw credentials to every agent.</p></div>
            <div className="secret-pill" aria-hidden="true"><span><LockKeyhole /></span><code>secret://github/prod</code><i>••••••••</i></div>
          </Reveal>
          <Reveal className="bento-card bento-wide observability-feature">
            <div className="bento-copy"><span className="feature-tag">OBSERVABILITY + USAGE</span><h3>Every run tells the whole story.</h3><p>Follow tool calls, approvals, failures, model use, token volume, and cost from organization health down to one execution.</p></div>
            <div className="metrics-art" aria-hidden="true"><div className="metric"><small>RUN SUCCESS</small><strong>98.2%</strong><em>↗ 2.4%</em></div><div className="chart">{[30,42,36,58,54,75,68,88,80,94].map((height) => <i key={height} style={{height:`${height}%`}} />)}</div><div className="metric-lines"><span><i />Tool calls <b>1,284</b></span><span><i />Approvals <b>36</b></span><span><i />Blocked <b>12</b></span></div></div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
