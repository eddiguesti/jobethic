import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { RecruteursHero } from "@/components/recruteurs/recruteurs-hero";
import { RecruteursFlow } from "@/components/recruteurs/recruteurs-flow";
import { RecruteursPricing } from "@/components/recruteurs/recruteurs-pricing";
import { RecruteursGuarantee } from "@/components/recruteurs/recruteurs-guarantee";
import { FinalCta } from "@/components/final-cta";

export const metadata = {
  title: "Recruteurs — 3 profils en 48h, et qui durent 2x plus longtemps",
  description:
    "Vous ne triez plus 100 CV. Vous recevez 3 profils déjà compatibles, avec une explication claire et les zones de tension à connaître. Décidez en 10 minutes, et arrêtez de vous tromper.",
};

export default function RecruteursPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <RecruteursHero />
        <RecruteursFlow />
        <RecruteursPricing />
        <RecruteursGuarantee />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
