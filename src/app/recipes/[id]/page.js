import { notFound } from 'next/navigation'
import { getRecipeById, getSimilar } from '@/actions/recipe'
import { isInCookbook } from '@/actions/cookbook'
import { RecipeDetails } from '@/components/recipes/RecipeDetails'
import { SimilarRecipes } from '@/components/recipes/SimilarRecipes'
import { FadeIn } from '@/components/animations/FadeIn'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }) {
  const { id } = await params
  const recipe = await getRecipeById(Number(id))
  if (!recipe) return { title: 'Rezept nicht gefunden — ByteBites' }
  return { title: `${recipe.title} — ByteBites` }
}

export default async function RecipeDetailPage({ params }) {
  const { id } = await params
  const recipeId = Number(id)
  if (isNaN(recipeId)) notFound()

  const [recipe, inCookbook] = await Promise.all([
    getRecipeById(recipeId),
    isInCookbook(recipeId),
  ])

  if (!recipe) notFound()

  const similar = await getSimilar(recipe.category, recipe.id, 4)

  return (
    <FadeIn>
      <RecipeDetails recipe={recipe} isInCookbook={inCookbook} />
      {similar.length > 0 && (
        <div className="container-narrow mt-16 border-t border-border pb-16 pt-10">
          <SimilarRecipes recipes={similar} />
        </div>
      )}
    </FadeIn>
  )
}
