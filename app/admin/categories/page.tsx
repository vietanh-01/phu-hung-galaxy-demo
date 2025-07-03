import * as categoryService from '@/lib/services/category.service';
import CategoriesClient from './CategoriesClient';
import { Prisma } from '@prisma/client';

// Type for category with product count
type CategoryWithCount = Prisma.CategoryGetPayload<{
  include: {
    _count: {
      select: { products: true }
    }
  }
}>;

export default async function CategoriesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const pageSize = 10;
  const search = typeof params.search === 'string' ? params.search : undefined;
  const [sortField, sortDirection] =
    typeof params.sort === 'string' ? params.sort.split(':') : ['name', 'asc'];

  const where: Prisma.CategoryWhereInput = search
    ? { name: { contains: search, mode: 'insensitive' } }
    : {};

  const orderBy: Prisma.CategoryOrderByWithRelationInput = { [sortField]: sortDirection };

  const categories: CategoryWithCount[] = await categoryService.getCategories({
    where,
    orderBy,
    take: pageSize,
    skip: (page - 1) * pageSize,
    include: { _count: { select: { products: true } } },
  }) as CategoryWithCount[];
  const totalCount = await categoryService.getCategoriesCount({ where });

  return <CategoriesClient categories={categories} totalCount={totalCount} pageSize={pageSize} />;
} 