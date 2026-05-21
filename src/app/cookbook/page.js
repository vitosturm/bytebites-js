import Link from 'next/link'
import { getCookbookEntries } from '@/actions/cookbook'
import { CookbookGrid } from '@/components/cookbook/CookbookGrid'
import { FadeIn } from '@/components/animations/FadeIn'

export const dynamic = 'force-dynamic'

export default async function CookbookPage() {
  const entries = await getCookbookEntries()

  return (
    <div className="container-narrow py-12">
      <FadeIn>
        <div className="mb-10 flex items-start justify-between">
          <div>
            <p className="small-caps mb-3">
              {entries.length} saved recipe{entries.length !== 1 ? 's' : ''}
            </p>
            <h1 className="font-serif text-4xl font-light text-fg">
              My <em className="italic text-accent">Cookbook</em>
            </h1>
          </div>
          <Link
            href="/cookbook/new"
            className="mt-2 flex h-9 items-center border border-accent px-4 font-mono text-[10px] uppercase tracking-widest text-accent transition-colors hover:bg-accent hover:text-bg"
          >
            + Add
          </Link>
        </div>
        <CookbookGrid entries={entries} />
      </FadeIn>
    </div>
  )
}
