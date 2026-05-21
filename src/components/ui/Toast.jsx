'use client'

import { AnimatePresence, motion } from 'motion/react'
import { useToast } from '@/hooks/useToast'

export function Toast() {
  const { toasts, dismiss } = useToast()

  return (
    <div aria-live="polite" className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
      <AnimatePresence>
        {toasts.map(t => (
          <motion.div
            key={t.id}
            role="status"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={() => dismiss(t.id)}
            className="flex cursor-pointer items-center gap-3 bg-fg px-4 py-3 font-mono text-[11px] uppercase tracking-widest text-bg shadow-lg"
          >
            <span className="text-accent">{t.type === 'success' ? '✓' : '✕'}</span>
            <span>{t.message}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
