export default function Loading() {
  return (
    <div>
      <div className="mb-8 aspect-video w-full animate-pulse bg-muted" />
      <div className="container-narrow">
        <div className="mb-3 h-3 w-32 animate-pulse bg-muted" />
        <div className="mb-4 h-12 w-3/4 animate-pulse bg-muted" />
        <div className="mb-8 h-10 w-52 animate-pulse bg-muted" />
        <div className="grid gap-10 lg:grid-cols-[1fr_2fr]">
          <div className="space-y-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-5 w-full animate-pulse bg-muted" />
            ))}
          </div>
          <div className="space-y-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-5 w-full animate-pulse bg-muted" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
