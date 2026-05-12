import { GameClient } from "./game-client";

export const metadata = {
  title: "Le Jeu · Le Voyage",
  description:
    "Explore Le Salon dans un vrai jeu top-down. Bouge avec WASD, interagis avec E ou clique.",
};

export default function JeuPage() {
  return <GameClient />;
}
