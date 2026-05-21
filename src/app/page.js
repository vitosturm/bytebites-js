import Link from 'next/link'
import { getFeatured, getCategories } from '@/actions/recipe'
import { RecipeGrid } from '@/components/recipes/RecipeGrid'
import { FadeIn } from '@/components/animations/FadeIn'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const [featured, categories] = await Promise.all([
    getFeatured(12),
    getCategories(),
  ])

  return (
    <div>
      {/* Typographic hero — no image */}
      <section className="border-b border-border py-16">
        <div className="container-narrow">
          <FadeIn>
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-fg">
              ByteBites
            </p>
            <h1 className="mb-5 font-serif text-4xl font-light leading-[1.06] text-fg md:text-5xl">
              Dishes worth<br />
              <em className="italic text-accent">cooking again.</em>
            </h1>
            <div className="mt-6 h-px w-14 bg-accent" />
          </FadeIn>
        </div>
      </section>

      {/* Featured recipe magazine list */}
      <section className="py-12">
        <div className="container-narrow">
          <FadeIn delay={0.1}>
            <div className="mb-8 flex items-baseline justify-between border-b border-border pb-4">
              <h2 className="font-serif text-2xl font-light text-fg">
                Featured <em className="italic text-accent">Recipes</em>
              </h2>
              <Link
                href="/recipes"
                className="font-mono text-[10px] uppercase tracking-widest text-muted-fg transition-colors hover:text-fg"
              >
                View all
              </Link>
            </div>
          </FadeIn>
          <RecipeGrid recipes={featured} />
        </div>
      </section>

      {/* Categories */}
      {categories.length > 0 && (
        <section className="border-t border-border bg-muted py-12">
          <div className="container-narrow">
            <FadeIn>
              <div className="mb-8 border-b border-border pb-4">
                <h2 className="font-serif text-2xl font-light text-fg">
                  Browse by <em className="italic text-accent">Category</em>
                </h2>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                  <Link
                    key={cat}
                    href={`/recipes?category=${encodeURIComponent(cat)}`}
                    className="border border-border px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-muted-fg transition-all duration-200 hover:border-fg hover:text-fg"
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>
      )}
    </div>
  )
}
