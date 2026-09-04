import { ChartNoAxesColumnIncreasing, ListFilter, LockKeyhole } from "lucide-react";

import { Reveal } from "@/components/atoms/reveal";
import { SectionKicker } from "@/components/atoms/section-kicker";

const problems = [
  {
    title: "Unknown tools",
    copy: "Know which MCP servers are approved, which version is installed, and which tools each agent can reach.",
    Icon: ListFilter,
  },
  {
    title: "Scattered credentials",
    copy: "Keep secrets behind managed handles and bind access to workspaces—outside prompts, scripts, and local config files.",
    Icon: LockKeyhole,
  },
  {
    title: "Invisible actions",
    copy: "Trace prompts, tool calls, approvals, errors, token use, and cost without stitching together another observability stack.",
    Icon: ChartNoAxesColumnIncreasing,
  },
] as const;

export function ProblemSection() {
  return (
    <section className="problem section" id="platform">
      <div className="shell">
        <Reveal><SectionKicker index="01">The control layer</SectionKicker></Reveal>
        <Reveal className="problem-intro">
          <h2>The last mile of agent adoption isn’t intelligence. <em>It’s control.</em></h2>
          <p>Local configs and one-off bots work—until every agent carries a different set of credentials, policies, and blind spots. Wardn turns that sprawl into an operating model.</p>
        </Reveal>
        <div className="problem-grid">
          {problems.map(({ title, copy, Icon }, index) => (
            <Reveal className="problem-card" key={title}>
              <span className="card-number">0{index + 1}</span>
              <div className="problem-icon"><Icon /></div>
              <h3>{title}</h3><p>{copy}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
