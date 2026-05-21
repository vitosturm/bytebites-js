'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Clock, Users } from 'lucide-react'
import { sanitize, stripHtml, truncate } from '@/utils/html'
import { AddToCookbookButton } from '@/components/cookbook/AddToCookbookButton'

export function RecipeDetails({ recipe, isInCookbook }) {
  const summaryText = recipe.summary
    ? truncate(stripHtml(recipe.summary), 300)
    : null

  // sanitize() uses sanitize-html with a strict tag whitelist — safe to render
  const safeInstructions = recipe.instructions ? sanitize(recipe.instructions) : null

  let safeIngredients = null
  if (recipe.ingredients) {
    try { safeIngredients = JSON.parse(recipe.ingredients) } catch { /* non-JSON ingredients — skip */ }
  }

  return (
    <article>
      <div className="container-narrow">
        {/* Hero image constrained to container — Spoonacular images max ~556px wide */}
        <div className="relative mb-8 aspect-video w-full overflow-hidden">
          <Image
            src={recipe.image}
            alt={recipe.title}
            fill
            priority
            sizes="(max-width: 896px) 100vw, 896px"
            className="object-cover"
          />
        </div>
      </div>

      <div className="container-narrow">
        <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-muted-fg">
          {[recipe.category, recipe.cuisine].filter(Boolean).join(' · ')}
        </p>

        <h1 className="mb-4 font-serif text-4xl font-light leading-tight text-fg md:text-5xl">
          {recipe.title}
        </h1>

        <div className="mb-5 flex items-center gap-6">
          {recipe.readyInMinutes && (
            <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wide text-muted-fg">
              <Clock size={12} />
              {recipe.readyInMinutes} min
            </span>
          )}
          {recipe.servings && (
            <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wide text-muted-fg">
              <Users size={12} />
              {recipe.servings} servings
            </span>
          )}
        </div>

        {(recipe.vegan || recipe.vegetarian || recipe.glutenFree || recipe.dairyFree) && (
          <div className="mb-6 flex flex-wrap gap-1.5">
            {recipe.vegan      && <span className="diet-badge">Vegan</span>}
            {recipe.vegetarian && <span className="diet-badge">Vegetarian</span>}
            {recipe.glutenFree && <span className="diet-badge">Gluten-free</span>}
            {recipe.dairyFree  && <span className="diet-badge">Dairy-free</span>}
          </div>
        )}

        <div className="mb-8">
          <AddToCookbookButton recipeId={recipe.id} isInCookbook={isInCookbook} />
        </div>

        {summaryText && (
          <p className="mb-10 max-w-2xl font-sans text-base leading-relaxed text-muted-fg">
            {summaryText}
          </p>
        )}

        <div className="grid gap-10 lg:grid-cols-[1fr_2fr]">
          {safeIngredients && safeIngredients.length > 0 && (
            <div>
              <h2 className="mb-5 font-serif text-xl font-light text-fg">Ingredients</h2>
              <ul className="space-y-2">
                {safeIngredients.map((ing, i) => (
                  <IngredientItem key={i} ingredient={ing} />
                ))}
              </ul>
            </div>
          )}

          {safeInstructions && (
            <div>
              <h2 className="mb-5 font-serif text-xl font-light text-fg">Instructions</h2>
              {/* safeInstructions is whitelist-sanitized via sanitize-html — no scripts or attributes */}
              <div
                className="font-sans text-base leading-relaxed text-fg [&_li]:mb-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-5"
                dangerouslySetInnerHTML={{ __html: safeInstructions }}
              />
            </div>
          )}
        </div>
      </div>
    </article>
  )
}

function IngredientItem({ ingredient }) {
  const [checked, setChecked] = useState(false)

  return (
    <li className="flex items-start gap-3">
      <button
        onClick={() => setChecked(v => !v)}
        aria-label={checked ? 'Uncheck ingredient' : 'Check ingredient'}
        className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center border transition-colors ${
          checked
            ? 'border-accent bg-accent text-bg'
            : 'border-border bg-transparent hover:border-accent'
        }`}
      >
        {checked && <span className="text-[8px] font-bold leading-none">✓</span>}
      </button>
      <span className={`font-sans text-sm leading-relaxed ${checked ? 'text-muted-fg line-through' : 'text-fg'}`}>
        {ingredient}
      </span>
    </li>
  )
}
