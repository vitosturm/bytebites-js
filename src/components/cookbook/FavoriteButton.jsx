'use client'

import { useTransition } from 'react'
import { toggleFavorite } from '@/actions/cookbook'
import { Heart } from 'lucide-react'
import { cn } from '@/utils/cn'

export function FavoriteButton({ entryId, favorite }) {
  const [isPending, startTransition] = useTransition()

  function handleToggle() {
    startTransition(async () => {
      await toggleFavorite(entryId, !favorite)
    })
  }

  return (
    <button
      onClick={handleToggle}
      disabled={isPending}
      className={cn(
        'flex h-9 items-center gap-1.5 border px-3 font-mono text-[10px] uppercase tracking-widest transition-colors disabled:opacity-50',
        favorite
          ? 'border-accent text-accent hover:bg-accent hover:text-bg'
          : 'border-border text-muted-fg hover:border-accent hover:text-accent'
      )}
    >
      <Heart size={12} fill={favorite ? 'currentColor' : 'none'} />
      {favorite ? 'Favorited' : 'Favorite'}
    </button>
  )
}
