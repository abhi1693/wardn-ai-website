import { Check, Github, MessageSquare, ShieldCheck, Wrench } from "lucide-react";

import { BrandMark } from "@/components/atoms/brand-mark";
import { Reveal } from "@/components/atoms/reveal";
import { Button } from "@/components/ui/button";

function ProductPreview() {
  return (
    <div className="product-stage shell">
      <div className="stage-aura" aria-hidden="true" />
      <div className="app-window">
        <div className="app-topbar">
          <div className="window-controls" aria-hidden="true"><i /><i /><i /></div>
          <div className="app-crumb"><span>Platform</span><b>/</b><strong>Run trace</strong></div>
          <div className="app-top-status"><span /> Runtime healthy</div>
        </div>
        <div className="app-body">
          <aside className="app-sidebar" aria-label="Product preview navigation">
            <div className="mini-brand"><BrandMark /></div>
            <div className="side-line active" /><div className="side-line" /><div className="side-line" /><div className="side-line short" />
            <div className="side-spacer" />
            <div className="side-line" /><div className="side-line short" />
          </aside>
          <div className="run-view">
            <div className="run-heading">
              <div><span className="micro-label">AGENT RUN</span><h2>Prepare release notes</h2></div>
              <span className="run-badge"><i /> Completed</span>
            </div>
            <div className="run-meta"><span><b>Triggered by</b> Scheduled task</span><span><b>Agent</b> Release steward</span><span><b>Duration</b> 18.4s</span></div>
            <div className="trace-panel">
              <div className="trace-title"><span>Execution trace</span><span>4 steps</span></div>
              <ol className="trace-list">
                <li><span className="trace-icon icon-request"><MessageSquare /></span><span className="trace-line" /><div className="trace-content"><strong>Request received</strong><p>Summarize merged changes since the last release.</p></div><time>0.0s</time></li>
                <li><span className="trace-icon icon-policy"><ShieldCheck /></span><span className="trace-line" /><div className="trace-content"><strong>Policy evaluated</strong><p><span className="code-chip">github.list_pull_requests</span> allowed</p></div><span className="trace-result">Passed</span></li>
                <li><span className="trace-icon icon-tool"><Wrench /></span><span className="trace-line" /><div className="trace-content"><strong>Tool called</strong><p>GitHub MCP · 14 pull requests returned</p></div><time>1.8s</time></li>
                <li><span className="trace-icon icon-done"><Check /></span><div className="trace-content"><strong>Response delivered</strong><p>Posted to <span className="code-chip">#product-releases</span></p></div><time>18.4s</time></li>
              </ol>
            </div>
          </div>
          <aside className="context-panel">
            <span className="micro-label">RUN CONTEXT</span>
            <div className="context-card"><span>Model</span><strong>Claude Sonnet</strong></div>
            <div className="context-card"><span>Tools exposed</span><strong>3 of 26</strong></div>
            <div className="context-card"><span>Approvals</span><strong>Not required</strong></div>
            <div className="cost-card"><span>RUN COST</span><strong>$0.028</strong><small>2,842 tokens</small></div>
          </aside>
        </div>
      </div>
      <div className="floating-card floating-policy" aria-hidden="true"><span className="float-icon"><ShieldCheck /></span><span><small>GUARDRAIL</small><strong>Policy passed</strong></span></div>
      <div className="floating-card floating-trace" aria-hidden="true"><span className="float-icon trace-dot"><i /></span><span><small>TRACE</small><strong>Every action recorded</strong></span></div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="hero" id="top">
      <div className="hero-grid" aria-hidden="true" /><div className="hero-glow hero-glow-one" aria-hidden="true" /><div className="hero-glow hero-glow-two" aria-hidden="true" />
      <Reveal className="hero-copy shell">
        <a className="eyebrow-pill" href="https://github.com/abhi1693/wardn-ai" target="_blank" rel="noreferrer"><span className="status-pulse" /> Source available · built to self-host <span aria-hidden="true">→</span></a>
        <h1>Give AI agents tools.<br /><span>Keep control.</span></h1>
        <p className="hero-lede">Wardn is the control plane for governed AI tool access—one place to approve MCP servers, protect credentials, run agents, and account for every action.</p>
        <div className="hero-actions">
          <Button asChild><a href="https://github.com/abhi1693/wardn-ai#local-development" target="_blank" rel="noreferrer">Start self-hosting <span aria-hidden="true">↗</span></a></Button>
          <Button asChild variant="ghost"><a href="https://github.com/abhi1693/wardn-ai" target="_blank" rel="noreferrer"><Github /> Explore the source</a></Button>
        </div>
        <p className="hero-note"><span>Built for</span> platform engineering, security, and AI teams</p>
      </Reveal>
      <Reveal><ProductPreview /></Reveal>
    </section>
  );
}
