import ProductForm from '../_components/ProductForm';
import * as categoryService from '@/lib/services/category.service';
import { PageHeader } from '../../_components/ui/PageHeader';
import { Card, CardContent } from '../../_components/ui/Card';

export default async function NewProductPage() {
  const categories = await categoryService.getCategories();

  return (
    <>
      <PageHeader title="Add New Product" />
      <Card><CardContent className="pt-6">
        <ProductForm categories={categories} />
      </CardContent></Card>
    </>
  );
} 