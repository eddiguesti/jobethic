import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind classes safely.
 * Combines clsx (conditional classes) + tailwind-merge (resolves conflicts).
 *
 * @example
 * cn("px-2 py-1", isLarge && "px-4", "px-3") // → "py-1 px-3"
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
