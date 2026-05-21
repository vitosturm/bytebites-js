'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'motion/react'

export function RecipeCard({ recipe, index }) {
  const hasDiet = recipe.vegan || recipe.vegetarian || recipe.glutenFree || recipe.dairyFree

  return (
    <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.15, ease: 'easeOut' }}>
      <Link
        href={`/recipes/${recipe.id}`}
        className="group flex items-center gap-5 border-b border-border py-5 last:border-0"
      >
        {/* Index number */}
        <span className="w-8 shrink-0 font-mono text-xl font-light text-border transition-colors duration-200 group-hover:text-muted-fg">
          {String(index).padStart(2, '0')}
        </span>

        {/* Thumbnail */}
        <div className="relative h-16 w-20 shrink-0 overflow-hidden bg-muted">
          <Image
            src={recipe.image}
            alt={recipe.title}
            fill
            sizes="80px"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
          />
        </div>

        {/* Info */}
        <div className="min-w-0 flex-1">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-fg">
            {[recipe.category, recipe.cuisine].filter(Boolean).join(' · ')}
          </p>
          <h3 className="mt-0.5 font-serif text-lg font-light leading-snug text-fg transition-colors duration-200 group-hover:text-accent">
            {recipe.title}
          </h3>
          {hasDiet && (
            <div className="mt-1.5 flex flex-wrap gap-1">
              {recipe.vegan      && <span className="diet-badge">Vegan</span>}
              {recipe.vegetarian && <span className="diet-badge">Vegetarian</span>}
              {recipe.glutenFree && <span className="diet-badge">Gluten-free</span>}
              {recipe.dairyFree  && <span className="diet-badge">Dairy-free</span>}
            </div>
          )}
        </div>

        {/* Time */}
        {recipe.readyInMinutes && (
          <span className="shrink-0 font-mono text-[10px] uppercase tracking-wide text-muted-fg">
            {recipe.readyInMinutes} min
          </span>
        )}
      </Link>
    </motion.div>
  )
}
