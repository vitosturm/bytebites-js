import Link from 'next/link'
import Image from 'next/image'

export function SimilarRecipes({ recipes }) {
  if (!recipes.length) return null

  return (
    <aside>
      <p className="mb-5 font-mono text-[10px] uppercase tracking-widest text-muted-fg">
        Similar Recipes
      </p>
      <div className="space-y-4">
        {recipes.map(r => (
          <Link
            key={r.id}
            href={`/recipes/${r.id}`}
            className="group flex gap-4 border-b border-border pb-4 last:border-0 last:pb-0"
          >
            <div className="relative h-16 w-16 shrink-0 overflow-hidden">
              <Image
                src={r.image}
                alt={r.title}
                fill
                sizes="64px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="line-clamp-2 font-serif text-sm font-light leading-tight text-fg transition-colors group-hover:text-accent">
                {r.title}
              </p>
              {r.readyInMinutes && (
                <p className="mt-1 font-mono text-[10px] uppercase tracking-wide text-muted-fg">
                  {r.readyInMinutes} min
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </aside>
  )
}
