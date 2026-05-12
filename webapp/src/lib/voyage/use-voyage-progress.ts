"use client";

import { useCallback, useSyncExternalStore } from "react";
import type { ChapterSlug } from "@/lib/chapters";

export type SwipeChoice = "left" | "right" | "down";

export interface ChapterAnswer {
  scenarioId: string;
  choice: SwipeChoice;
  at: number; // timestamp
}

export interface ChapterProgress {
  completed: boolean;
  completedAt?: number;
  answers: ChapterAnswer[];
}

export type VoyageProgress = Partial<Record<ChapterSlug, ChapterProgress>>;

const STORAGE_KEY = "jobethic.voyage.progress.v1";
const STORAGE_EVENT = "jobethic.voyage.progress.changed";

const EMPTY_PROGRESS: VoyageProgress = Object.freeze({});

// In-memory cache so getSnapshot returns a stable reference between reads.
let cachedSnapshot: VoyageProgress = EMPTY_PROGRESS;

function readStorage(): VoyageProgress {
  if (typeof window === "undefined") return EMPTY_PROGRESS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY_PROGRESS;
    const parsed = JSON.parse(raw) as unknown;
    if (typeof parsed === "object" && parsed !== null) {
      return parsed as VoyageProgress;
    }
    return EMPTY_PROGRESS;
  } catch {
    return EMPTY_PROGRESS;
  }
}

function writeStorage(progress: VoyageProgress) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    cachedSnapshot = progress;
    window.dispatchEvent(new Event(STORAGE_EVENT));
  } catch {
    // quota or privacy mode — silently ignore
  }
}

function subscribe(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  window.addEventListener(STORAGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(STORAGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function getSnapshot(): VoyageProgress {
  // Refresh cache from storage; keep stable reference if unchanged content.
  const fresh = readStorage();
  if (JSON.stringify(fresh) !== JSON.stringify(cachedSnapshot)) {
    cachedSnapshot = fresh;
  }
  return cachedSnapshot;
}

function getServerSnapshot(): VoyageProgress {
  return EMPTY_PROGRESS;
}

/**
 * Persist Voyage progress in localStorage.
 * Uses useSyncExternalStore for SSR-safe hydration (React 19 + Next 16).
 */
export function useVoyageProgress() {
  const progress = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  // `hydrated` is true once we're definitely on the client.
  // useSyncExternalStore handles this for us — but exposing the flag keeps API parity.
  const hydrated = typeof window !== "undefined";

  const saveAnswer = useCallback(
    (slug: ChapterSlug, scenarioId: string, choice: SwipeChoice) => {
      const current = cachedSnapshot[slug] ?? {
        completed: false,
        answers: [],
      };
      const filtered = current.answers.filter(
        (a) => a.scenarioId !== scenarioId,
      );
      const next: VoyageProgress = {
        ...cachedSnapshot,
        [slug]: {
          ...current,
          answers: [...filtered, { scenarioId, choice, at: Date.now() }],
        },
      };
      writeStorage(next);
    },
    [],
  );

  const completeChapter = useCallback((slug: ChapterSlug) => {
    const current = cachedSnapshot[slug] ?? {
      completed: false,
      answers: [],
    };
    const next: VoyageProgress = {
      ...cachedSnapshot,
      [slug]: {
        ...current,
        completed: true,
        completedAt: Date.now(),
      },
    };
    writeStorage(next);
  }, []);

  const resetChapter = useCallback((slug: ChapterSlug) => {
    const next = { ...cachedSnapshot };
    delete next[slug];
    writeStorage(next);
  }, []);

  const resetAll = useCallback(() => {
    writeStorage(EMPTY_PROGRESS);
  }, []);

  return {
    progress,
    hydrated,
    saveAnswer,
    completeChapter,
    resetChapter,
    resetAll,
  };
}

/**
 * Quick selector — chapters completed (in canonical order).
 */
export function getCompletedSlugs(progress: VoyageProgress): ChapterSlug[] {
  return Object.entries(progress)
    .filter(([, p]) => p?.completed)
    .map(([slug]) => slug as ChapterSlug);
}
