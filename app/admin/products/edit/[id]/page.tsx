import ProductForm from '../../../products/_components/ProductForm';
import { notFound } from 'next/navigation';
import * as productService from '@/lib/services/product.service';
import * as categoryService from '@/lib/services/category.service';
import { PageHeader } from '../../../_components/ui/PageHeader';
import { Card, CardContent } from '../../../_components/ui/Card';
import { Product } from '@prisma/client';

// Serialized product type where Decimal fields are converted to numbers
type SerializedProduct = Omit<Product, 'price'> & {
  price: number;
};

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await productService.getProductById(id);
  if (!product) return notFound();
  
  const categories = await categoryService.getCategories();

  // Serialize Decimal fields for client component
  const serializedProduct: SerializedProduct = {
    ...product,
    price: product.price.toNumber(),
  };

  return (
    <>
      <PageHeader title="Edit Product"/>
      <Card>
        <CardContent>
          <ProductForm product={serializedProduct} categories={categories} />
        </CardContent>
      </Card>
    </>
  );
} 