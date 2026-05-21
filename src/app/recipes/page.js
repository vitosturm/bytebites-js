import { Suspense } from 'react'
import { searchRecipes, getCategories, getCuisines } from '@/actions/recipe'
import { RecipeGrid } from '@/components/recipes/RecipeGrid'
import { RecipeSearch } from '@/components/recipes/RecipeSearch'
import { FilterPanel } from '@/components/recipes/FilterPanel'
import { FadeIn } from '@/components/animations/FadeIn'

export const dynamic = 'force-dynamic'

export default async function RecipesPage({ searchParams }) {
  const params = await searchParams
  const filters = {
    q:        params.q,
    category: params.category,
    cuisine:  params.cuisine,
    sort:     params.sort ?? 'newest',
    diet:     params.diet,
  }

  const [recipes, categories, cuisines] = await Promise.all([
    searchRecipes(filters),
    getCategories(),
    getCuisines(),
  ])

  const hasFilters = !!(params.q || params.category || params.cuisine || params.diet)

  return (
    <div className="container-narrow py-12">
      <FadeIn>
        <div className="mb-10">
          <p className="small-caps mb-3">
            {hasFilters
              ? `${recipes.length} result${recipes.length !== 1 ? 's' : ''}`
              : 'All Recipes'}
          </p>
          <h1 className="font-serif text-4xl font-light text-fg">
            {params.q ? (
              <>Results for <em className="italic text-accent">"{params.q}"</em></>
            ) : (
              <>Explore <em className="italic text-accent">Recipes</em></>
            )}
          </h1>
        </div>

        <div className="mb-8 space-y-4">
          <Suspense>
            <RecipeSearch defaultValue={params.q ?? ''} />
          </Suspense>
          <Suspense>
            <FilterPanel categories={categories} cuisines={cuisines} />
          </Suspense>
        </div>

        <RecipeGrid recipes={recipes} />
      </FadeIn>
    </div>
  )
}
