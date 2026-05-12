"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, RotateCcw } from "lucide-react";
import { HOUSE_ROOMS, HOUSE_DOORS } from "@/lib/voyage/house-config";
import { useVoyageProgress } from "@/lib/voyage/use-voyage-progress";
import { getColorTokens } from "@/lib/voyage/chapter-colors";

const easeOutCubic = [0.33, 1, 0.68, 1] as const;

export function HouseMap() {
  const { progress, hydrated, resetAll } = useVoyageProgress();
  const [hovered, setHovered] = useState<string | null>(null);

  const visitedCount = HOUSE_ROOMS.filter(
    (r) => progress[r.slug]?.completed,
  ).length;
  const totalRooms = HOUSE_ROOMS.length;

  return (
    <div className="min-h-full bg-neutral-50">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-neutral-200/60 bg-lumiere-100/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-semibold tracking-tight"
          >
            <span
              aria-hidden
              className="inline-block h-2 w-2 rounded-full bg-neutral-900"
            />
            <span>JOB&apos;S ETHIC</span>
          </Link>
          <span className="text-xs uppercase tracking-wider text-neutral-500">
            La Maison · {hydrated ? `${visitedCount}/${totalRooms} pièces explorées` : "…"}
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeOutCubic }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
            Le Voyage · Acte 1
          </p>
          <h1 className="mt-4 font-serif text-4xl leading-tight tracking-tight text-neutral-900 text-balance sm:text-5xl">
            Explore les pièces de ta tête.
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-neutral-600 text-pretty">
            Chaque pièce révèle une dimension de ta manière de travailler.
            Clique sur une pièce, entre, observe les objets — ils te parlent.
          </p>
        </motion.div>

        {/* House SVG */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: easeOutCubic }}
          className="mx-auto mt-14 max-w-3xl"
        >
          <svg
            viewBox="0 0 100 110"
            className="w-full"
            role="img"
            aria-label="Plan de la maison du Voyage"
          >
            {/* Outer wall */}
            <rect
              x="2"
              y="2"
              width="96"
              height="92"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.6"
              className="text-neutral-300"
              rx="2"
            />

            {/* Rooms */}
            {HOUSE_ROOMS.map((room, i) => {
              const tokens = getColorTokens(room.color);
              const isCompleted = progress[room.slug]?.completed ?? false;
              const hasStarted =
                (progress[room.slug]?.answers.length ?? 0) > 0 && !isCompleted;
              const isHovered = hovered === room.slug;

              return (
                <motion.g
                  key={room.slug}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.3 + i * 0.06,
                    ease: easeOutCubic,
                  }}
                  onMouseEnter={() => setHovered(room.slug)}
                  onMouseLeave={() => setHovered(null)}
                  className="cursor-pointer"
                >
                  <Link href={`/voyage/${room.slug}`}>
                    <rect
                      x={room.rect.x}
                      y={room.rect.y}
                      width={room.rect.w}
                      height={room.rect.h}
                      className={`${tokens.fill500} transition-opacity ${
                        isHovered
                          ? "opacity-20"
                          : isCompleted
                            ? "opacity-15"
                            : hasStarted
                              ? "opacity-10"
                              : "opacity-5"
                      }`}
                      rx="1"
                    />
                    <rect
                      x={room.rect.x}
                      y={room.rect.y}
                      width={room.rect.w}
                      height={room.rect.h}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={isHovered ? "0.5" : "0.3"}
                      className={`${tokens.text700} transition-all ${
                        isHovered ? "opacity-100" : "opacity-40"
                      }`}
                      rx="1"
                    />

                    {/* Emoji + room name */}
                    <text
                      x={room.rect.x + room.rect.w / 2}
                      y={room.rect.y + room.rect.h / 2 - 1}
                      textAnchor="middle"
                      className="select-none"
                      fontSize="3.5"
                    >
                      {room.roomEmoji}
                    </text>
                    <text
                      x={room.rect.x + room.rect.w / 2}
                      y={room.rect.y + room.rect.h / 2 + 4}
                      textAnchor="middle"
                      className={`fill-current select-none font-medium ${tokens.text900}`}
                      fontSize="2.4"
                    >
                      {room.roomName}
                    </text>

                    {/* Status indicator */}
                    {isCompleted && (
                      <circle
                        cx={room.rect.x + room.rect.w - 3}
                        cy={room.rect.y + 3}
                        r="1.4"
                        className="fill-comm-500"
                      />
                    )}
                    {hasStarted && (
                      <circle
                        cx={room.rect.x + room.rect.w - 3}
                        cy={room.rect.y + 3}
                        r="1.4"
                        className="fill-autonomie-500"
                      />
                    )}
                  </Link>
                </motion.g>
              );
            })}

            {/* Front door (entrance label) */}
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 1, ease: easeOutCubic }}
            >
              <rect
                x="42"
                y="91"
                width="16"
                height="4"
                className="fill-neutral-200"
                rx="0.5"
              />
              <text
                x="50"
                y="93.7"
                textAnchor="middle"
                className="fill-neutral-600 select-none font-medium"
                fontSize="1.8"
              >
                ENTRÉE
              </text>
            </motion.g>

            {/* Doors footer — interview + synthese */}
            <motion.g
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 1.2, ease: easeOutCubic }}
            >
              <foreignObject x="2" y="98" width="96" height="12">
                <div className="flex h-full items-center justify-between text-[3px] sm:text-[2.5px]">
                  <Link
                    href={HOUSE_DOORS.entretien.href}
                    className="rounded-md border border-neutral-300 bg-lumiere-100 px-2 py-1 text-neutral-700 hover:border-neutral-400 hover:text-neutral-900"
                    style={{ fontSize: "9px" }}
                  >
                    🎥 {HOUSE_DOORS.entretien.label}
                  </Link>
                  <Link
                    href={HOUSE_DOORS.synthese.href}
                    className="rounded-md border border-neutral-900 bg-neutral-900 px-2 py-1 text-lumiere-100 hover:bg-neutral-800"
                    style={{ fontSize: "9px" }}
                  >
                    {HOUSE_DOORS.synthese.label} →
                  </Link>
                </div>
              </foreignObject>
            </motion.g>
          </svg>

          {/* Hover tooltip */}
          <div className="mt-6 flex h-12 items-center justify-center">
            {hovered &&
              (() => {
                const room = HOUSE_ROOMS.find((r) => r.slug === hovered);
                if (!room) return null;
                return (
                  <motion.p
                    key={hovered}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center text-sm italic text-neutral-600"
                  >
                    <span className="not-italic">{room.roomEmoji}</span>{" "}
                    {room.roomName} — {room.tagline}
                  </motion.p>
                );
              })()}
          </div>
        </motion.div>

        {/* Progress + reset */}
        {hydrated && visitedCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: easeOutCubic }}
            className="mx-auto mt-12 max-w-md text-center"
          >
            <div className="mx-auto h-1 w-full max-w-xs overflow-hidden rounded-full bg-neutral-200">
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: `${(visitedCount / totalRooms) * 100}%`,
                }}
                transition={{ duration: 0.8, ease: easeOutCubic }}
                className="h-full bg-gradient-to-r from-rythme-500 via-limites-500 to-environnement-500"
              />
            </div>
            <p className="mt-3 text-xs text-neutral-500">
              {visitedCount} / {totalRooms} pièces explorées
              {" · "}
              <button
                onClick={() => {
                  if (confirm("Tout effacer ? Cette action est irréversible.")) {
                    resetAll();
                  }
                }}
                className="inline-flex items-center gap-1 hover:text-neutral-700"
              >
                <RotateCcw className="h-3 w-3" />
                réinitialiser
              </button>
            </p>
          </motion.div>
        )}

        {/* Phase 0 note */}
        <p className="mx-auto mt-16 max-w-xl text-center text-xs text-neutral-500">
          🚧 <strong className="text-neutral-700">Phase 0.</strong> Seul{" "}
          <Link href="/voyage/rythme" className="underline">
            Le Salon
          </Link>{" "}
          est entièrement aménagé en version proto. Les autres pièces sont
          jouables en mode questionnaire en attendant.
        </p>

        {/* Back to home */}
        <div className="mt-12 flex justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-neutral-600 hover:text-neutral-900"
          >
            <ArrowRight className="h-4 w-4 rotate-180" />
            Retour à l&apos;accueil
          </Link>
        </div>
      </main>
    </div>
  );
}
