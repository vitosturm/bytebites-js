import Link from 'next/link'

export function EmptyCookbookState() {
  return (
    <div className="flex flex-col items-center justify-center py-32 text-center">
      <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-muted-fg">
        Your Cookbook
      </p>
      <h2 className="mb-4 font-serif text-3xl font-light text-fg">
        Nothing saved yet
      </h2>
      <p className="mb-10 max-w-xs font-sans text-muted-fg">
        Browse the recipe collection and save the dishes you want to cook.
      </p>
      <Link
        href="/recipes"
        className="border border-fg px-8 py-3 font-mono text-[11px] uppercase tracking-widest text-fg transition-all hover:bg-fg hover:text-bg"
      >
        Explore Recipes
      </Link>
    </div>
  )
}
