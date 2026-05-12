import { SyntheseClient } from "./synthese-client";

export const metadata = {
  title: "Ton portrait · Synthèse · Le Voyage",
  description:
    "Tu as terminé l'Acte 1 de La Découverte. Voici qui tu es professionnellement.",
};

export default function SynthesePage() {
  return <SyntheseClient />;
}
