'use server'

import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function getCookbookEntries() {
  return prisma.cookbookEntry.findMany({
    include: { recipe: true },
    orderBy: { createdAt: 'desc' },
  })
}

export async function getCookbookEntry(id) {
  return prisma.cookbookEntry.findUnique({
    where: { id },
    include: { recipe: true },
  })
}

export async function addToCookbook(recipeId) {
  try {
    await prisma.cookbookEntry.create({ data: { recipeId } })
    revalidatePath('/cookbook')
    return { ok: true }
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
      return { ok: false, error: 'Recipe is already in the cookbook.' }
    }
    console.error('addToCookbook error:', e)
    return { ok: false, error: 'Could not be saved.' }
  }
}

export async function updateEntry(id, data) {
  const entry = await prisma.cookbookEntry.update({
    where: { id },
    data,
    include: { recipe: true },
  })
  revalidatePath('/cookbook')
  revalidatePath(`/cookbook/${id}`)
  return entry
}

export async function toggleFavorite(id, favorite) {
  await prisma.cookbookEntry.update({ where: { id }, data: { favorite } })
  revalidatePath('/cookbook')
  revalidatePath(`/cookbook/${id}`)
}

export async function removeFromCookbook(id) {
  await prisma.cookbookEntry.delete({ where: { id } })
  revalidatePath('/cookbook')
}

export async function isInCookbook(recipeId) {
  const entry = await prisma.cookbookEntry.findUnique({
    where: { recipeId },
    select: { id: true },
  })
  return entry !== null
}
