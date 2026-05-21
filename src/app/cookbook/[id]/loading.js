export default function Loading() {
  return (
    <div className="container-narrow py-12">
      <div className="mb-8 h-3 w-40 animate-pulse bg-muted" />
      <div className="mt-8 grid gap-10 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-4">
          <div className="h-3 w-24 animate-pulse bg-muted" />
          <div className="h-9 w-72 animate-pulse bg-muted" />
          <div className="h-36 w-full animate-pulse bg-muted" />
          <div className="h-10 w-40 animate-pulse bg-muted" />
        </div>
        <div className="space-y-0">
          <div className="aspect-4/3 w-full animate-pulse bg-muted" />
          <div className="h-20 w-full animate-pulse bg-muted" />
        </div>
      </div>
    </div>
  )
}
