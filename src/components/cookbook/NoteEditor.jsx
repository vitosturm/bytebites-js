'use client'

import { useState, useTransition } from 'react'
import { updateEntry } from '@/actions/cookbook'
import { useToast } from '@/hooks/useToast'

export function NoteEditor({ entryId, initialNotes }) {
  const [notes, setNotes] = useState(initialNotes ?? '')
  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()

  function handleSave() {
    startTransition(async () => {
      await updateEntry(entryId, { notes })
      toast('Notes saved')
    })
  }

  return (
    <div className="space-y-4">
      <label className="small-caps block" htmlFor="notes">
        Your Notes
      </label>
      <textarea
        id="notes"
        value={notes}
        onChange={e => setNotes(e.target.value)}
        rows={6}
        placeholder="What do you think? What would you change next time?"
        className="w-full border border-border bg-transparent px-4 py-3 font-sans text-base leading-relaxed text-fg placeholder:text-muted-fg/50 transition-all focus:border-fg focus:outline-none"
      />
      <button
        onClick={handleSave}
        disabled={isPending}
        className="border border-fg px-6 py-2.5 font-mono text-[11px] uppercase tracking-widest text-fg transition-all hover:bg-fg hover:text-bg disabled:opacity-50"
      >
        {isPending ? 'Saving…' : 'Save Notes'}
      </button>
    </div>
  )
}
