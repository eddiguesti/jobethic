import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Hero } from "@/components/hero";
import { VoyagePreview } from "@/components/voyage-preview";
import { EquilibreSection } from "@/components/equilibre-section";
import { EthiqueSection } from "@/components/ethique-section";
import { FinalCta } from "@/components/final-cta";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <VoyagePreview />
        <EquilibreSection />
        <EthiqueSection />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
