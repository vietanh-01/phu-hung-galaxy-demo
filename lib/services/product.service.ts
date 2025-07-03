import prisma from '@/lib/db';
import { slugify } from '../utils';
import { Prisma } from '@prisma/client';

export async function getProducts(args: Prisma.ProductFindManyArgs = {}) {
  return prisma.product.findMany({
    ...args,
    orderBy: args.orderBy || { createdAt: 'desc' },
    include: args.include || { category: true },
  });
}

export async function getProductsCount(args: Prisma.ProductCountArgs = {}) {
  return prisma.product.count({
    ...args,
  });
}

export async function getProductById(id: string) {
  return prisma.product.findUnique({
    where: { id },
  });
}

export async function deleteProductById(id: string) {
  return prisma.product.delete({ where: { id } });
}

type ProductData = {
    name: string;
    description?: string | null;
    price: number;
    imageUrl: string;
    categoryId: string;
    batchCode?: string | null;
    rating?: number | null;
    reviewCount?: number | null;
    statusTag?: string | null;
}

export async function createProduct(data: ProductData) {
    return prisma.product.create({
        data: { ...data, slug: slugify(data.name) },
    });
}

export async function updateProductById(id: string, data: Partial<ProductData>) {
    const updateData: any = { ...data };
    if (data.name) {
        updateData.slug = slugify(data.name);
    }
    return prisma.product.update({ where: { id }, data: updateData });
} 