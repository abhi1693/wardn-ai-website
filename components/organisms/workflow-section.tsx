"use client";

import { Search } from "lucide-react";
import { useRef, useState, type KeyboardEvent } from "react";

import { Reveal } from "@/components/atoms/reveal";
import { SectionKicker } from "@/components/atoms/section-kicker";
import { cn } from "@/lib/utils";

const steps = [
  {
    tab: "Curate",
    short: "Build a trusted catalog",
    label: "TRUSTED CATALOG",
    title: "Curate what enters your stack.",
    copy: "Review server metadata, versions, transport, and tools before a workspace can install them.",
    list: ["Organization-owned catalog", "Endpoint and tool validation", "Version-aware installations"],
    rows: [["GH", "GitHub", "Source control · 42 tools", "Approved"], ["PG", "PostgreSQL", "Database · 8 tools", "Approved"], ["API", "Internal service", "Custom · Awaiting review", "Review"]],
  },
  {
    tab: "Connect",
    short: "Scope tools and secrets",
    label: "WORKSPACE CONNECTIONS",
    title: "Connect without credential sprawl.",
    copy: "Install approved servers into the right workspace and pair them with managed secret handles.",
    list: ["Workspace-scoped installations", "Managed secret backends", "Local or container runtime"],
    rows: [["GH", "GitHub production", "42 tools · Secret bound", "Healthy"], ["PG", "Analytics database", "8 tools · Read only", "Healthy"], ["SL", "Slack workspace", "16 tools · OAuth", "Healthy"]],
  },
  {
    tab: "Govern",
    short: "Apply rules and approvals",
    label: "POLICY EVALUATION",
    title: "Put policy in the execution path.",
    copy: "Evaluate the exact tool and arguments, then allow, block, or route the action for human approval.",
    list: ["Tool-level access rules", "Argument-bound approvals", "Usage limits and budgets"],
    rows: [["✓", "Read operations", "Allow automatically", "Allowed"], ["?", "Production writes", "Platform approval", "Review"], ["×", "Destructive actions", "Blocked by policy", "Blocked"]],
  },
  {
    tab: "Operate",
    short: "Run, trace, and improve",
    label: "RUN OBSERVABILITY",
    title: "Operate agents like real systems.",
    copy: "Run work from chat, schedules, and connected channels, then inspect every decision and outcome.",
    list: ["End-to-end run traces", "Tool and runtime health", "Model usage and cost"],
    rows: [["✓", "Release notes", "Scheduled · 18.4s", "Complete"], ["↻", "Issue triage", "Slack · Running", "Active"], ["!", "Database cleanup", "Policy denied", "Blocked"]],
  },
] as const;

export function WorkflowSection() {
  const [selected, setSelected] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const current = steps[selected];

  function selectTab(index: number) {
    setSelected(index);
    tabRefs.current[index]?.focus();
  }

  function handleTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex: number | undefined;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") nextIndex = (index + 1) % steps.length;
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") nextIndex = (index - 1 + steps.length) % steps.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = steps.length - 1;
    if (nextIndex === undefined) return;

    event.preventDefault();
    selectTab(nextIndex);
  }

  return (
    <section className="workflow section section-dark" id="workflow">
      <div className="workflow-orbit" aria-hidden="true" />
      <div className="shell">
        <Reveal><SectionKicker index="02" dark>One governed path</SectionKicker></Reveal>
        <Reveal className="workflow-heading">
          <h2>From discovery to execution,<br />the guardrails stay attached.</h2>
          <p>Wardn keeps trust decisions in the path of every run—whether an agent starts in chat, on a schedule, or from a connected channel.</p>
        </Reveal>
        <Reveal className="workflow-layout">
          <div className="workflow-tabs" role="tablist" aria-label="Wardn workflow">
            {steps.map((step, index) => (
              <button
                key={step.tab}
                className={cn("workflow-tab", selected === index && "active")}
                role="tab"
                id={`workflow-tab-${index}`}
                aria-selected={selected === index}
                aria-controls="workflow-panel"
                tabIndex={selected === index ? 0 : -1}
                onClick={() => setSelected(index)}
                onKeyDown={(event) => handleTabKeyDown(event, index)}
                ref={(element) => { tabRefs.current[index] = element; }}
              >
                <span>0{index + 1}</span><b>{step.tab}</b><small>{step.short}</small>
              </button>
            ))}
          </div>
          <div className="workflow-preview" id="workflow-panel" role="tabpanel" aria-labelledby={`workflow-tab-${selected}`} aria-live="polite">
            <div className="preview-top"><span>{current.label}</span><span className="preview-live"><i /> Workspace: Platform</span></div>
            <div className="preview-body">
              <div className="preview-copy">
                <span className="preview-step">Step 0{selected + 1}</span>
                <h3>{current.title}</h3><p>{current.copy}</p>
                <ul>{current.list.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
              <div className="preview-art" aria-hidden="true">
                <div className="catalog-search"><Search /><span>{selected === 0 ? "Search approved servers" : "Search workspace activity"}</span><kbd>⌘ K</kbd></div>
                {current.rows.map(([icon, title, detail, status], index) => (
                  <div className={cn("catalog-row", index === 2 && "muted-row")} key={title}>
                    <span className={cn("server-icon", icon === "GH" && "github-logo", icon === "PG" && "pg-logo", icon === "SL" && "slack-logo")}>{icon}</span>
                    <span><strong>{title}</strong><small>{detail}</small></span><em>{status}</em>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
