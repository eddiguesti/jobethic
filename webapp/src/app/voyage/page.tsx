import { VoyageIndex } from "./voyage-index";

export const metadata = {
  title: "Le Voyage — Découvre qui tu es professionnellement",
  description:
    "Un voyage de 6 semaines, 5 min par jour, pour découvrir comment tu travailles vraiment. Pas un test. Une expérience.",
};

export default function VoyagePage() {
  return <VoyageIndex />;
}
