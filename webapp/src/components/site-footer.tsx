import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-neutral-200/60 bg-lumiere-100 py-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 text-base font-semibold">
              <span
                aria-hidden
                className="inline-block h-2.5 w-2.5 rounded-full bg-neutral-900"
              />
              <span>JOB&apos;S ETHIC</span>
            </div>
            <p className="mt-3 max-w-xs text-sm text-neutral-600">
              Le moteur d&apos;équilibre professionnel. On ne cherche plus un
              job. On trouve la bonne collaboration.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
              Produit
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-neutral-700">
              <li>
                <Link href="/voyage" className="hover:text-neutral-900">
                  Le Voyage
                </Link>
              </li>
              <li>
                <Link href="/recruteurs" className="hover:text-neutral-900">
                  Pour les recruteurs
                </Link>
              </li>
              <li>
                <Link href="/freelances" className="hover:text-neutral-900">
                  Pour les freelances
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
              Éthique
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-neutral-700">
              <li>
                <Link href="/ethique" className="hover:text-neutral-900">
                  Notre engagement
                </Link>
              </li>
              <li>
                <Link href="/dpia" className="hover:text-neutral-900">
                  DPIA publique
                </Link>
              </li>
              <li>
                <Link href="/transparence" className="hover:text-neutral-900">
                  Rapport de transparence
                </Link>
              </li>
              <li>
                <Link href="/accessibilite" className="hover:text-neutral-900">
                  Accessibilité (WCAG 2.2 AA)
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
              Légal
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-neutral-700">
              <li>
                <Link href="/cgu" className="hover:text-neutral-900">
                  CGU
                </Link>
              </li>
              <li>
                <Link href="/confidentialite" className="hover:text-neutral-900">
                  Confidentialité
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="hover:text-neutral-900">
                  Cookies
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-neutral-900">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-neutral-200/60 pt-8 sm:flex-row sm:items-center">
          <p className="text-xs text-neutral-500">
            © 2026 JOB&apos;S ETHIC · Conçu en France · Hébergé en UE ·
            Conforme AI Act &amp; RGPD natif
          </p>
          <div className="flex gap-2 text-xs text-neutral-500">
            <span className="rounded-full border border-neutral-200 px-2.5 py-1">
              🇫🇷 Made in France
            </span>
            <span className="rounded-full border border-neutral-200 px-2.5 py-1">
              ⚖️ AI Act ready
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
