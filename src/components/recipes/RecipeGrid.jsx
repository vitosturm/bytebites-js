import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer'
import { RecipeCard } from './RecipeCard'

export function RecipeGrid({ recipes }) {
  if (!recipes.length) {
    return (
      <p className="py-16 text-center font-mono text-[10px] uppercase tracking-widest text-muted-fg">
        No recipes found
      </p>
    )
  }

  return (
    <StaggerContainer>
      {recipes.map((recipe, i) => (
        <StaggerItem key={recipe.id}>
          <RecipeCard recipe={recipe} index={i + 1} />
        </StaggerItem>
      ))}
    </StaggerContainer>
  )
}
