'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useTransition } from 'react'
import { motion } from 'motion/react'
import { removeFromCookbook } from '@/actions/cookbook'
import { FavoriteButton } from './FavoriteButton'
import { EmptyCookbookState } from './EmptyCookbookState'
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer'
import { useToast } from '@/hooks/useToast'

export function CookbookGrid({ entries }) {
  const { toast } = useToast()
  const [isPending, startTransition] = useTransition()

  if (!entries.length) return <EmptyCookbookState />

  function handleRemove(id, title) {
    startTransition(async () => {
      await removeFromCookbook(id)
      toast(`"${title}" removed`)
    })
  }

  return (
    <StaggerContainer>
      {entries.map((entry, i) => (
        <StaggerItem key={entry.id}>
          <motion.div
            whileHover={{ x: 3 }}
            transition={{ duration: 0.15 }}
            className="group flex items-center gap-5 border-b border-border py-5 last:border-0"
          >
            <span className="w-8 shrink-0 font-mono text-xl font-light text-border">
              {String(i + 1).padStart(2, '0')}
            </span>

            <Link href={`/recipes/${entry.recipe.id}`} className="shrink-0">
              <div className="relative h-16 w-20 overflow-hidden bg-muted">
                <Image
                  src={entry.recipe.image}
                  alt={entry.recipe.title}
                  fill
                  sizes="80px"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                />
              </div>
            </Link>

            <div className="min-w-0 flex-1">
              <div className="flex items-baseline gap-2">
                <Link href={`/recipes/${entry.recipe.id}`}>
                  <h3 className="font-serif text-lg font-light text-fg transition-colors hover:text-accent">
                    {entry.recipe.title}
                  </h3>
                </Link>
                {entry.recipe.isPersonal && (
                  <span className="font-mono text-[9px] uppercase tracking-widest text-muted-fg/60">
                    Personal
                  </span>
                )}
              </div>
              <p className="mt-0.5 truncate font-sans text-sm italic text-muted-fg">
                {entry.notes ?? 'No notes yet'}
              </p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-wide text-muted-fg/50">
                {[
                  entry.recipe.category,
                  entry.recipe.readyInMinutes ? `${entry.recipe.readyInMinutes} min` : null,
                ].filter(Boolean).join(' · ')}
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-1.5 opacity-0 transition-opacity group-hover:opacity-100">
              <FavoriteButton entryId={entry.id} favorite={entry.favorite} />
              <Link
                href={`/cookbook/${entry.id}`}
                className="flex h-9 items-center border border-border px-3 font-mono text-[10px] uppercase tracking-widest text-muted-fg transition-colors hover:border-fg hover:text-fg"
              >
                Edit
              </Link>
              <button
                onClick={() => handleRemove(entry.id, entry.recipe.title)}
                disabled={isPending}
                className="flex h-9 items-center border border-border px-3 font-mono text-[10px] uppercase tracking-widest text-muted-fg transition-colors hover:border-red-400 hover:text-red-400 disabled:opacity-50"
              >
                Remove
              </button>
            </div>
          </motion.div>
        </StaggerItem>
      ))}
    </StaggerContainer>
  )
}
