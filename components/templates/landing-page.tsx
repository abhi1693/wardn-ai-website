import { IntegrationStrip } from "@/components/molecules/integration-strip";
import { CapabilitiesSection } from "@/components/organisms/capabilities-section";
import { DeploySection } from "@/components/organisms/deploy-section";
import { FinalCta } from "@/components/organisms/final-cta";
import { HeroSection } from "@/components/organisms/hero-section";
import { ProblemSection } from "@/components/organisms/problem-section";
import { SiteFooter } from "@/components/organisms/site-footer";
import { SiteHeader } from "@/components/organisms/site-header";
import { TeamsSection } from "@/components/organisms/teams-section";
import { WorkflowSection } from "@/components/organisms/workflow-section";

export function LandingPage() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <SiteHeader />
      <main id="main">
        <HeroSection />
        <IntegrationStrip />
        <ProblemSection />
        <WorkflowSection />
        <CapabilitiesSection />
        <TeamsSection />
        <DeploySection />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
