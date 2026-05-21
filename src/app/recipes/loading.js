export default function Loading() {
  return (
    <div className="container-narrow py-12">
      <div className="mb-10 space-y-3">
        <div className="h-3 w-20 animate-pulse bg-muted" />
        <div className="h-10 w-64 animate-pulse bg-muted" />
      </div>
      <div className="mb-8 space-y-4">
        <div className="h-11 w-full animate-pulse bg-muted" />
        <div className="flex gap-3">
          <div className="h-9 w-36 animate-pulse bg-muted" />
          <div className="h-9 w-36 animate-pulse bg-muted" />
        </div>
      </div>
      <div>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex items-center gap-5 border-b border-border py-5">
            <div className="h-6 w-8 animate-pulse bg-muted" />
            <div className="h-16 w-20 animate-pulse bg-muted" />
            <div className="flex-1 space-y-2">
              <div className="h-3 w-24 animate-pulse bg-muted" />
              <div className="h-5 w-56 animate-pulse bg-muted" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
