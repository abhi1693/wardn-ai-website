import { Brand } from "@/components/atoms/brand";

const groups = [
  { title: "Product", links: [["#platform", "Platform"], ["#workflow", "How it works"], ["#teams", "For teams"]] },
  { title: "Resources", links: [["https://github.com/abhi1693/wardn-ai", "GitHub"], ["https://github.com/abhi1693/wardn-ai#local-development", "Documentation"], ["https://hub.wardnai.dev/", "Wardn Hub"]] },
] as const;

export function SiteFooter() {
  return (
    <footer className="site-footer"><div className="shell footer-main"><div className="footer-brand"><Brand /><p>The control plane for governed AI tool access.</p></div><div className="footer-links">{groups.map((group)=><div key={group.title}><strong>{group.title}</strong>{group.links.map(([href,label])=><a key={href} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined}>{label}</a>)}</div>)}</div></div><div className="shell footer-bottom"><span>© {new Date().getFullYear()} Wardn AI</span><span>Source available · Self-hosted · Built for governed action</span></div></footer>
  );
}
