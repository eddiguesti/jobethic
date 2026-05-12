import { HouseMap } from "@/components/voyage-v2/house-map";

export const metadata = {
  title: "La Maison — Le Voyage",
  description:
    "Explore les pièces de ta tête. Chaque pièce révèle une dimension de ta manière de travailler. Une expérience interactive, pas un test.",
};

export default function VoyagePage() {
  return <HouseMap />;
}
