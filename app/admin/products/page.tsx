import * as productService from '@/lib/services/product.service';
import ProductsClient from './ProductsClient';
import { Prisma, Product, Category } from '@prisma/client';

// Type for product with category relation
type ProductWithCategory = Product & { category: Category };

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const pageSize = 10;
  const search = typeof params.search === 'string' ? params.search : undefined;
  const [sortField, sortDirection] =
    typeof params.sort === 'string' ? params.sort.split(':') : ['createdAt', 'desc'];

  const where: Prisma.ProductWhereInput = search
    ? { name: { contains: search, mode: 'insensitive' } }
    : {};

  const orderBy: Prisma.ProductOrderByWithRelationInput = { [sortField]: sortDirection };

  const products: ProductWithCategory[] = await productService.getProducts({
    where,
    orderBy,
    take: pageSize,
    skip: (page - 1) * pageSize,
    include: { category: true },
  }) as ProductWithCategory[];
  const totalCount = await productService.getProductsCount({ where });

  // Serialize Decimal fields to numbers for client component
  const serializedProducts = products.map(product => ({
    ...product,
    price: product.price.toNumber(),
  }));

  return <ProductsClient products={serializedProducts} totalCount={totalCount} pageSize={pageSize} />;
} 