"use client";

import {
  motion,
  useMotionValue,
  useTransform,
  type PanInfo,
} from "framer-motion";
import { useState } from "react";

export type SwipeChoice = "left" | "right" | "down";

interface SwipeCardProps {
  scenario: string;
  context?: string;
  choices: {
    left: { label: string; hint: string };
    right: { label: string; hint: string };
    down: { label: string; hint: string };
  };
  onSwipe: (choice: SwipeChoice) => void;
}

const easeOutCubic = [0.33, 1, 0.68, 1] as const;

export function SwipeCard({
  scenario,
  context,
  choices,
  onSwipe,
}: SwipeCardProps) {
  const [exiting, setExiting] = useState<SwipeChoice | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Visual feedback as user drags
  const rotate = useTransform(x, [-200, 200], [-12, 12]);
  const leftOpacity = useTransform(x, [-150, -40, 0], [1, 0, 0]);
  const rightOpacity = useTransform(x, [0, 40, 150], [0, 0, 1]);
  const downOpacity = useTransform(y, [0, 40, 150], [0, 0, 1]);

  function handleDragEnd(_: unknown, info: PanInfo) {
    const SWIPE_THRESHOLD = 100;
    const VELOCITY_THRESHOLD = 500;

    const goingDown =
      info.offset.y > SWIPE_THRESHOLD ||
      info.velocity.y > VELOCITY_THRESHOLD;
    const goingRight =
      info.offset.x > SWIPE_THRESHOLD ||
      info.velocity.x > VELOCITY_THRESHOLD;
    const goingLeft =
      info.offset.x < -SWIPE_THRESHOLD ||
      info.velocity.x < -VELOCITY_THRESHOLD;

    if (goingDown && Math.abs(info.offset.y) > Math.abs(info.offset.x)) {
      setExiting("down");
      setTimeout(() => onSwipe("down"), 250);
    } else if (goingRight) {
      setExiting("right");
      setTimeout(() => onSwipe("right"), 250);
    } else if (goingLeft) {
      setExiting("left");
      setTimeout(() => onSwipe("left"), 250);
    }
  }

  return (
    <div className="relative mx-auto w-full max-w-md">
      <motion.div
        drag
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        dragElastic={0.6}
        onDragEnd={handleDragEnd}
        style={{ x, y, rotate }}
        animate={
          exiting === "left"
            ? { x: -600, opacity: 0, rotate: -25 }
            : exiting === "right"
              ? { x: 600, opacity: 0, rotate: 25 }
              : exiting === "down"
                ? { y: 600, opacity: 0 }
                : { x: 0, y: 0, rotate: 0, opacity: 1 }
        }
        transition={{ duration: 0.25, ease: easeOutCubic }}
        whileTap={{ cursor: "grabbing" }}
        className="relative cursor-grab touch-none select-none rounded-3xl bg-lumiere-100 p-8 shadow-lg ring-1 ring-rythme-100 sm:p-10"
      >
        {/* Decision indicators (overlays during drag) */}
        <motion.div
          style={{ opacity: leftOpacity }}
          className="pointer-events-none absolute left-6 top-6 rounded-lg border-2 border-rythme-700 bg-rythme-50 px-3 py-1 text-sm font-semibold uppercase tracking-wider text-rythme-700"
        >
          {choices.left.label}
        </motion.div>
        <motion.div
          style={{ opacity: rightOpacity }}
          className="pointer-events-none absolute right-6 top-6 rounded-lg border-2 border-comm-700 bg-comm-50 px-3 py-1 text-sm font-semibold uppercase tracking-wider text-comm-700"
        >
          {choices.right.label}
        </motion.div>
        <motion.div
          style={{ opacity: downOpacity }}
          className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 rounded-lg border-2 border-autonomie-700 bg-autonomie-50 px-3 py-1 text-sm font-semibold uppercase tracking-wider text-autonomie-700"
        >
          {choices.down.label}
        </motion.div>

        {/* Context */}
        {context && (
          <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">
            {context}
          </p>
        )}

        {/* Scenario */}
        <p className="mt-3 font-serif text-2xl leading-snug text-neutral-900 sm:text-3xl text-balance">
          {scenario}
        </p>

        {/* Inline hint */}
        <p className="mt-6 text-sm text-neutral-500">
          Glisse la carte. Ou utilise les boutons en bas. Suis ton instinct.
        </p>
      </motion.div>

      {/* Button row (accessibility + mobile-friendly fallback) */}
      <div className="mt-6 grid grid-cols-3 gap-2">
        <button
          onClick={() => {
            setExiting("left");
            setTimeout(() => onSwipe("left"), 250);
          }}
          className="rounded-xl border border-rythme-200 bg-lumiere-100 px-3 py-3 text-left text-sm text-neutral-700 transition-colors hover:bg-rythme-50 hover:text-rythme-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rythme-500"
          aria-label={`${choices.left.label}: ${choices.left.hint}`}
        >
          <span className="block text-xs font-semibold uppercase tracking-wide text-rythme-700">
            ← {choices.left.label}
          </span>
          <span className="mt-1 block text-xs text-neutral-500">
            {choices.left.hint}
          </span>
        </button>
        <button
          onClick={() => {
            setExiting("down");
            setTimeout(() => onSwipe("down"), 250);
          }}
          className="rounded-xl border border-autonomie-200 bg-lumiere-100 px-3 py-3 text-center text-sm text-neutral-700 transition-colors hover:bg-autonomie-50 hover:text-autonomie-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-autonomie-500"
          aria-label={`${choices.down.label}: ${choices.down.hint}`}
        >
          <span className="block text-xs font-semibold uppercase tracking-wide text-autonomie-700">
            ↓ {choices.down.label}
          </span>
          <span className="mt-1 block text-xs text-neutral-500">
            {choices.down.hint}
          </span>
        </button>
        <button
          onClick={() => {
            setExiting("right");
            setTimeout(() => onSwipe("right"), 250);
          }}
          className="rounded-xl border border-comm-200 bg-lumiere-100 px-3 py-3 text-right text-sm text-neutral-700 transition-colors hover:bg-comm-50 hover:text-comm-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-comm-500"
          aria-label={`${choices.right.label}: ${choices.right.hint}`}
        >
          <span className="block text-xs font-semibold uppercase tracking-wide text-comm-700">
            {choices.right.label} →
          </span>
          <span className="mt-1 block text-xs text-neutral-500">
            {choices.right.hint}
          </span>
        </button>
      </div>
    </div>
  );
}
