import prisma from '@/lib/db';
import { slugify } from '@/lib/utils';
import { Prisma } from '@prisma/client';

export async function getCategories(args: Prisma.CategoryFindManyArgs = {}) {
  return prisma.category.findMany({
    orderBy: { name: 'asc' },
    include: { _count: { select: { products: true } } },
    ...args,
  });
}

export async function getCategoriesCount(args: Prisma.CategoryCountArgs = {}) {
    return prisma.category.count({ ...args });
}

export async function getCategoryById(id: string) {
  return prisma.category.findUnique({
    where: { id },
  });
}

export async function createCategory(data: { name: string }) {
  return prisma.category.create({
    data: {
      name: data.name,
      slug: slugify(data.name),
    },
  });
}

export async function updateCategoryById(id: string, data: { name: string }) {
  return prisma.category.update({
    where: { id },
    data: {
      name: data.name,
      slug: slugify(data.name),
    },
  });
}

export async function deleteCategoryById(id: string) {
  // Note: In a real app, you should check if products are using this category first.
  return prisma.category.delete({ where: { id } });
} 