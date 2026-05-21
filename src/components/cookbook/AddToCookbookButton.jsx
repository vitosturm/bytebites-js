'use client'

import { useTransition } from 'react'
import { addToCookbook } from '@/actions/cookbook'
import { useToast } from '@/hooks/useToast'
import { BookmarkPlus, BookmarkCheck } from 'lucide-react'

export function AddToCookbookButton({ recipeId, isInCookbook }) {
  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()

  function handleAdd() {
    if (isInCookbook) return
    startTransition(async () => {
      const result = await addToCookbook(recipeId)
      if (result.ok) {
        toast('Saved to cookbook')
      } else {
        toast(result.error ?? 'Failed to save', 'error')
      }
    })
  }

  return (
    <button
      onClick={handleAdd}
      disabled={isPending || isInCookbook}
      className="flex items-center gap-2 border border-fg px-6 py-2.5 font-mono text-[10px] uppercase tracking-widest text-fg transition-all hover:bg-fg hover:text-bg disabled:cursor-not-allowed disabled:opacity-60"
    >
      {isInCookbook ? <BookmarkCheck size={13} /> : <BookmarkPlus size={13} />}
      {isInCookbook
        ? 'In Cookbook'
        : isPending
          ? 'Saving…'
          : 'Add to Cookbook'}
    </button>
  )
}
