'use client'

export default function Error({ error, reset }) {
  return (
    <div className="container-narrow flex flex-col items-center py-32 text-center">
      <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-accent">Error</p>
      <h2 className="mb-4 font-serif text-3xl font-light text-fg">Something went wrong</h2>
      <p className="mb-8 font-sans text-muted-fg">{error.message}</p>
      <button
        onClick={reset}
        className="border border-fg px-6 py-2.5 font-mono text-[11px] uppercase tracking-widest text-fg transition-all hover:bg-fg hover:text-bg"
      >
        Try again
      </button>
    </div>
  )
}
