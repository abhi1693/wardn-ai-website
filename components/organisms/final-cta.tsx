import { BrandMark } from "@/components/atoms/brand-mark";
import { Reveal } from "@/components/atoms/reveal";
import { Button } from "@/components/ui/button";

export function FinalCta() {
  return (
    <section className="final-cta section"><div className="final-grid" aria-hidden="true" /><div className="final-glow" aria-hidden="true" /><Reveal className="shell final-inner"><BrandMark className="final-mark" /><span className="micro-label">CONTROL WITHOUT THE BOTTLENECK</span><h2>Your agents can move fast.<br /><em>Your standards can keep up.</em></h2><p>Bring tools, policy, execution, and evidence into one governed path.</p><div className="hero-actions"><Button asChild><a href="https://github.com/abhi1693/wardn-ai#local-development" target="_blank" rel="noreferrer">Start self-hosting <span aria-hidden="true">↗</span></a></Button><Button asChild variant="ghost"><a href="https://github.com/abhi1693/wardn-ai" target="_blank" rel="noreferrer">View on GitHub <span aria-hidden="true">→</span></a></Button></div></Reveal></section>
  );
}
