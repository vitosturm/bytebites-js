'use client'

import { useSearch } from '@/hooks/useSearch'
import { cn } from '@/utils/cn'

const DIET_OPTIONS = [
  { value: 'vegan',       label: 'Vegan' },
  { value: 'vegetarian',  label: 'Vegetarian' },
  { value: 'glutenFree',  label: 'Gluten-free' },
  { value: 'dairyFree',   label: 'Dairy-free' },
]

const selectClass =
  'h-9 border border-border bg-transparent px-3 font-mono text-[10px] uppercase tracking-wide text-fg transition-colors focus:border-fg focus:outline-none cursor-pointer hover:border-fg/50 appearance-none pr-8'

export function FilterPanel({ categories, cuisines }) {
  const { setParam, searchParams } = useSearch()
  const activeDiet     = searchParams.get('diet')     ?? ''
  const activeCategory = searchParams.get('category') ?? ''
  const activeCuisine  = searchParams.get('cuisine')  ?? ''
  const activeSort     = searchParams.get('sort')     ?? 'newest'

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <div className="relative">
          <select value={activeCategory} onChange={e => setParam('category', e.target.value)} className={selectClass}>
            <option value="">All Categories</option>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-muted-fg">{'▾'}</span>
        </div>

        <div className="relative">
          <select value={activeCuisine} onChange={e => setParam('cuisine', e.target.value)} className={selectClass}>
            <option value="">All Cuisines</option>
            {cuisines.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-muted-fg">{'▾'}</span>
        </div>

        <div className="relative">
          <select value={activeSort} onChange={e => setParam('sort', e.target.value)} className={selectClass}>
            <option value="newest">Newest first</option>
            <option value="quickest">Quickest first</option>
            <option value="az">A – Z</option>
          </select>
          <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-muted-fg">{'▾'}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        {DIET_OPTIONS.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setParam('diet', activeDiet === value ? '' : value)}
            className={cn(
              'font-mono text-[10px] uppercase tracking-widest transition-colors duration-150',
              activeDiet === value
                ? 'text-accent underline underline-offset-4'
                : 'text-muted-fg hover:text-fg'
            )}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}
