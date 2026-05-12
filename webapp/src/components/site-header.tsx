import Link from "next/link";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-200/60 bg-lumiere-100/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className="group flex items-center gap-2 text-base font-semibold tracking-tight"
        >
          <span
            aria-hidden
            className="inline-block h-2.5 w-2.5 rounded-full bg-neutral-900 transition-transform group-hover:scale-110"
          />
          <span>JOB&apos;S ETHIC</span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-neutral-600 sm:flex">
          <Link href="#voyage" className="hover:text-neutral-900 transition-colors">
            Le Voyage
          </Link>
          <Link href="#equilibre" className="hover:text-neutral-900 transition-colors">
            L&apos;équilibre
          </Link>
          <Link href="#ethique" className="hover:text-neutral-900 transition-colors">
            Éthique
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/voyage" className="hidden sm:block">
            <Button variant="ghost" size="sm">
              Commencer le Voyage
            </Button>
          </Link>
          <Link href="/recruteurs">
            <Button variant="primary" size="sm">
              Je recrute
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
