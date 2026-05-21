'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { cn } from '@/utils/cn'

const NAV_LINKS = [
  { href: '/',             label: 'Home' },
  { href: '/recipes',      label: 'Recipes' },
  { href: '/cookbook',     label: 'Cookbook' },
  { href: '/cookbook/new', label: '+ Add' },
]

export function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  const today = new Date().toLocaleDateString('en-US', {
    day: 'numeric', month: 'long', year: 'numeric',
  })

  return (
    <header className="sticky top-0 z-50 bg-bg">
      {/* Row 1: Terracotta meta bar */}
      <div className="bg-accent">
        <div className="container-narrow flex items-center justify-between py-1">
          <span className="font-mono text-[10px] uppercase tracking-widest text-bg/70">
            {today}
          </span>
          <Link
            href="/cookbook"
            className="font-mono text-[10px] uppercase tracking-widest text-bg/70 transition-colors hover:text-bg"
          >
            My Cookbook
          </Link>
        </div>
      </div>

      {/* Row 2: Centered logo with thick bottom border */}
      <div className="border-b-2 border-fg py-3 text-center">
        <Link href="/" className="font-serif text-2xl font-light tracking-tight text-fg">
          Byte<em className="not-italic text-accent">Bites</em>
        </Link>
      </div>

      {/* Row 3: Desktop nav links centered */}
      <div className="hidden border-b border-border md:block">
        <div className="container-narrow flex items-center justify-center gap-10 py-2">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'relative font-mono text-[10px] uppercase tracking-widest transition-colors duration-200',
                pathname === href ? 'text-accent' : 'text-muted-fg hover:text-fg'
              )}
            >
              {label}
              {pathname === href && (
                <motion.span
                  layoutId="nav-indicator"
                  className="absolute -bottom-0.5 left-0 h-px w-full bg-accent"
                  transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                />
              )}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile hamburger row */}
      <div className="flex items-center justify-between border-b border-border px-4 py-2 md:hidden">
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-fg">
          Menu
        </span>
        <button
          onClick={() => setMobileOpen(v => !v)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          className="flex h-8 w-8 items-center justify-center text-muted-fg hover:text-fg"
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile dropdown — inside header so stacking is correct */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            key="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-b border-border bg-bg md:hidden"
          >
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'flex items-center border-t border-border px-6 py-4 font-mono text-[10px] uppercase tracking-widest transition-colors',
                  pathname === href ? 'text-accent' : 'text-muted-fg hover:text-fg'
                )}
              >
                {label}
              </Link>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
