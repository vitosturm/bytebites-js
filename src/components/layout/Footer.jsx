import Link from 'next/link'

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border">
      <div className="container-narrow py-10">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <Link href="/" className="font-serif text-lg font-light text-fg">
            Byte<em className="not-italic text-accent">Bites</em>
          </Link>
          <nav className="flex gap-8" aria-label="Footer">
            {[
              { href: '/recipes',      label: 'Recipes' },
              { href: '/cookbook',     label: 'Cookbook' },
              { href: '/cookbook/new', label: 'Add Recipe' },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="font-mono text-[10px] uppercase tracking-widest text-muted-fg transition-colors hover:text-fg"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-fg/50">
            Dishes worth cooking again
          </p>
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-fg/50">
            {'©'} {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  )
}
