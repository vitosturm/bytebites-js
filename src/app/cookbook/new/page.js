import Link from 'next/link'
import { createPersonalRecipe } from '@/actions/recipe'

export const metadata = {
  title: 'Add Recipe — ByteBites',
}

const inputClass =
  'h-11 w-full border border-border bg-transparent px-4 font-sans text-sm text-fg placeholder:text-muted-fg/50 transition-colors focus:border-fg focus:outline-none'

const labelClass = 'block font-mono text-[10px] uppercase tracking-widest text-muted-fg mb-1.5'

export default function NewRecipePage() {
  return (
    <div className="container-narrow py-12">
      <Link
        href="/cookbook"
        className="mb-8 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted-fg transition-colors hover:text-fg"
      >
        ← Back to Cookbook
      </Link>

      <div className="mt-8">
        <p className="small-caps mb-3">Personal Recipe</p>
        <h1 className="mb-10 font-serif text-3xl font-light text-fg">
          Add a <em className="italic text-accent">Recipe</em>
        </h1>

        <form action={createPersonalRecipe} className="max-w-xl space-y-6">
          <div>
            <label htmlFor="title" className={labelClass}>Title *</label>
            <input id="title" name="title" required placeholder="e.g. Grandma's Apple Cake" className={inputClass} />
          </div>

          <div>
            <label htmlFor="image" className={labelClass}>Image URL *</label>
            <input id="image" name="image" required type="url" placeholder="https://…" className={inputClass} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="category" className={labelClass}>Category</label>
              <input id="category" name="category" placeholder="e.g. Dessert" className={inputClass} />
            </div>
            <div>
              <label htmlFor="cuisine" className={labelClass}>Cuisine</label>
              <input id="cuisine" name="cuisine" placeholder="e.g. Italian" className={inputClass} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="readyInMinutes" className={labelClass}>Ready in (minutes)</label>
              <input id="readyInMinutes" name="readyInMinutes" type="number" min="1" placeholder="30" className={inputClass} />
            </div>
            <div>
              <label htmlFor="servings" className={labelClass}>Servings</label>
              <input id="servings" name="servings" type="number" min="1" placeholder="4" className={inputClass} />
            </div>
          </div>

          <div>
            <label htmlFor="ingredients" className={labelClass}>Ingredients (one per line)</label>
            <textarea
              id="ingredients"
              name="ingredients"
              rows={5}
              placeholder="200g flour&#10;3 eggs&#10;150ml milk"
              className="w-full border border-border bg-transparent px-4 py-3 font-sans text-sm text-fg placeholder:text-muted-fg/50 transition-colors focus:border-fg focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="instructions" className={labelClass}>Instructions</label>
            <textarea
              id="instructions"
              name="instructions"
              rows={6}
              placeholder="Describe the steps…"
              className="w-full border border-border bg-transparent px-4 py-3 font-sans text-sm text-fg placeholder:text-muted-fg/50 transition-colors focus:border-fg focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap gap-6">
            {[
              { name: 'vegan',       label: 'Vegan' },
              { name: 'vegetarian',  label: 'Vegetarian' },
              { name: 'glutenFree',  label: 'Gluten-free' },
              { name: 'dairyFree',   label: 'Dairy-free' },
            ].map(({ name, label }) => (
              <label key={name} className="flex cursor-pointer items-center gap-2">
                <input type="checkbox" name={name} className="h-4 w-4 border border-border accent-accent" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-fg">{label}</span>
              </label>
            ))}
          </div>

          <button
            type="submit"
            className="border border-fg bg-fg px-8 py-3 font-mono text-[11px] uppercase tracking-widest text-bg transition-all hover:border-accent hover:bg-accent"
          >
            Save Recipe
          </button>
        </form>
      </div>
    </div>
  )
}
