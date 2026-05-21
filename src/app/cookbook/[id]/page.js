import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getCookbookEntry } from '@/actions/cookbook'
import { NoteEditor } from '@/components/cookbook/NoteEditor'
import { FavoriteButton } from '@/components/cookbook/FavoriteButton'
import { FadeIn } from '@/components/animations/FadeIn'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }) {
  const { id } = await params
  const entry = await getCookbookEntry(Number(id))
  if (!entry) return { title: 'Entry not found — ByteBites' }
  return { title: `Edit — ${entry.recipe.title} — ByteBites` }
}

export default async function EditCookbookEntryPage({ params }) {
  const { id } = await params
  const entryId = Number(id)
  if (isNaN(entryId)) notFound()

  const entry = await getCookbookEntry(entryId)
  if (!entry) notFound()

  return (
    <FadeIn>
      <div className="container-narrow py-12">
        <Link
          href="/cookbook"
          className="mb-8 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted-fg transition-colors hover:text-fg"
        >
          ← Back to Cookbook
        </Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-[2fr_1fr]">
          <div>
            <p className="small-caps mb-3">Edit notes</p>
            <h1 className="mb-8 font-serif text-3xl font-light leading-tight text-fg">
              {entry.recipe.title}
            </h1>
            <NoteEditor entryId={entry.id} initialNotes={entry.notes} />
          </div>

          <div>
            <div className="overflow-hidden border border-border bg-card">
              <div className="relative aspect-4/3">
                <Image
                  src={entry.recipe.image}
                  alt={entry.recipe.title}
                  fill
                  sizes="320px"
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                {entry.recipe.category && (
                  <p className="small-caps mb-2">{entry.recipe.category}</p>
                )}
                <h3 className="mb-4 font-serif text-lg font-light text-fg">
                  {entry.recipe.title}
                </h3>
                <div className="flex items-center justify-between">
                  <Link
                    href={`/recipes/${entry.recipe.id}`}
                    className="font-mono text-[10px] uppercase tracking-widest text-muted-fg transition-colors hover:text-fg"
                  >
                    View recipe →
                  </Link>
                  <FavoriteButton entryId={entry.id} favorite={entry.favorite} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </FadeIn>
  )
}
