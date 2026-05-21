'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'

export async function getFeatured(limit = 6) {
  return prisma.recipe.findMany({
    where: { featured: true, isPersonal: false },
    take: limit,
    orderBy: { createdAt: 'desc' },
  })
}

export async function getTrending(limit = 8) {
  return prisma.recipe.findMany({
    where: { featured: false, isPersonal: false },
    take: limit,
    orderBy: { createdAt: 'desc' },
  })
}

export async function searchRecipes(filters) {
  const { q, category, cuisine, sort, diet } = filters
  return prisma.recipe.findMany({
    where: {
      isPersonal: false,
      ...(q        ? { title:    { contains: q,        mode: 'insensitive' } } : {}),
      ...(category ? { category: { equals:   category, mode: 'insensitive' } } : {}),
      ...(cuisine  ? { cuisine:  { equals:   cuisine,  mode: 'insensitive' } } : {}),
      ...(diet === 'vegan'       ? { vegan:       true } : {}),
      ...(diet === 'vegetarian'  ? { vegetarian:  true } : {}),
      ...(diet === 'glutenFree'  ? { glutenFree:  true } : {}),
      ...(diet === 'dairyFree'   ? { dairyFree:   true } : {}),
    },
    orderBy:
      sort === 'quickest' ? { readyInMinutes: 'asc' }
      : sort === 'az'     ? { title: 'asc' }
      :                     { createdAt: 'desc' },
    take: 50,
  })
}

export async function getRecipeById(id) {
  return prisma.recipe.findUnique({ where: { id } })
}

export async function getSimilar(category, excludeId, limit = 4) {
  return prisma.recipe.findMany({
    where: {
      id: { not: excludeId },
      isPersonal: false,
      ...(category ? { category: { equals: category, mode: 'insensitive' } } : {}),
    },
    take: limit,
    orderBy: { createdAt: 'desc' },
  })
}

export async function getCategories() {
  const rows = await prisma.recipe.findMany({
    select: { category: true },
    distinct: ['category'],
    where: { category: { not: null }, isPersonal: false },
    orderBy: { category: 'asc' },
  })
  return rows.map(r => r.category).filter(Boolean)
}

export async function getCuisines() {
  const rows = await prisma.recipe.findMany({
    select: { cuisine: true },
    distinct: ['cuisine'],
    where: { cuisine: { not: null }, isPersonal: false },
    orderBy: { cuisine: 'asc' },
  })
  return rows.map(r => r.cuisine).filter(Boolean)
}

export async function createPersonalRecipe(formData) {
  const title = formData.get('title')?.trim()
  const image = formData.get('image')?.trim()
  if (!title) throw new Error('Title is required')
  if (!image) throw new Error('Image URL is required')

  const rawIngredients = formData.get('ingredients') || ''
  const ingredients = rawIngredients.trim()
    ? JSON.stringify(
        rawIngredients.split('\n').map(s => s.trim()).filter(Boolean)
      )
    : null

  await prisma.$transaction(async (tx) => {
    const recipe = await tx.recipe.create({
      data: {
        isPersonal: true,
        title,
        image,
        category:       formData.get('category')       || null,
        cuisine:        formData.get('cuisine')         || null,
        readyInMinutes: formData.get('readyInMinutes')  ? Number(formData.get('readyInMinutes')) : null,
        servings:       formData.get('servings')        ? Number(formData.get('servings'))       : null,
        ingredients,
        instructions:   formData.get('instructions')    || null,
        vegan:          formData.get('vegan')       === 'on',
        vegetarian:     formData.get('vegetarian')  === 'on',
        glutenFree:     formData.get('glutenFree')  === 'on',
        dairyFree:      formData.get('dairyFree')   === 'on',
      },
    })
    await tx.cookbookEntry.create({ data: { recipeId: recipe.id } })
  })

  revalidatePath('/cookbook')
  redirect('/cookbook')
}
