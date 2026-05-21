'use client'

import { useSearch } from '@/hooks/useSearch'
import { Search } from 'lucide-react'

export function RecipeSearch({ defaultValue }) {
  const { setParam, isPending } = useSearch()

  function handleSubmit(e) {
    e.preventDefault()
    const q = new FormData(e.currentTarget).get('q')
    setParam('q', q)
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-fg" />
      <input
        name="q"
        defaultValue={defaultValue}
        placeholder="Search recipes…"
        className="h-11 w-full border border-border bg-transparent pl-9 pr-4 font-sans text-sm text-fg placeholder:text-muted-fg/60 transition-colors focus:border-fg focus:outline-none"
      />
      {isPending && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-[10px] uppercase tracking-widest text-muted-fg">
          …
        </span>
      )}
    </form>
  )
}
