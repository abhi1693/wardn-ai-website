import { CodeXml, ShieldCheck } from "lucide-react";

import { Reveal } from "@/components/atoms/reveal";
import { SectionKicker } from "@/components/atoms/section-kicker";

const teams = [
  { className: "engineer-panel", eyebrow: "FOR PLATFORM + AI TEAMS", title: "Build the useful thing.", copy: "Give teams approved tools and reusable agents without rebuilding auth, runtime management, scheduling, and traces for every project.", items: ["Validated MCP installations", "Reusable agents and skills", "Multiple models and channels"], Icon: CodeXml },
  { className: "security-panel", eyebrow: "FOR SECURITY + OPERATIONS", title: "Know what it can do.", copy: "Keep trust, credentials, limits, and approval decisions centrally managed while preserving a complete record of agent activity.", items: ["Tool-level access rules", "Human approval routes", "Usage and audit visibility"], Icon: ShieldCheck },
] as const;

export function TeamsSection() {
  return (
    <section className="teams section" id="teams"><div className="shell">
      <Reveal><SectionKicker index="04">One shared system</SectionKicker></Reveal>
      <Reveal className="teams-heading"><h2>Engineering gets velocity.<br /><em>Security gets control.</em></h2></Reveal>
      <div className="team-panels">{teams.map(({ className, eyebrow, title, copy, items, Icon }) => <Reveal className={`team-panel ${className}`} key={eyebrow}><div className="team-top"><span className="team-icon"><Icon /></span><span>{eyebrow}</span></div><h3>{title}</h3><p>{copy}</p><ul>{items.map((item,index)=><li key={item}><span>0{index+1}</span>{item}</li>)}</ul></Reveal>)}</div>
    </div></section>
  );
}
