import { Reveal } from "@/components/atoms/reveal";
import { SectionKicker } from "@/components/atoms/section-kicker";
import { Terminal } from "@/components/molecules/terminal";

const checks = ["Local or OIDC authentication", "OpenBao secret backends", "Kubernetes-oriented runtime", "Source-available deployment"];

export function DeploySection() {
  return (
    <section className="deploy section section-dark"><div className="deploy-grid shell">
      <Reveal className="deploy-copy"><SectionKicker index="05" dark>Your infrastructure</SectionKicker><h2>Own the control plane.<br />Keep your boundaries.</h2><p>Run Wardn where your tools and data already live. Start locally, connect PostgreSQL and your model providers, then move MCP execution into Kubernetes when you need stronger isolation.</p><div className="deploy-checks">{checks.map((item)=><span key={item}><i>✓</i>{item}</span>)}</div><a className="text-link text-link-light" href="https://github.com/abhi1693/wardn-ai#local-development" target="_blank" rel="noreferrer">Read the deployment guide <span>→</span></a></Reveal>
      <Reveal><Terminal /></Reveal>
    </div></section>
  );
}
