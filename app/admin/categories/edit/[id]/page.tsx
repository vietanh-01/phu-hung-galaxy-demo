import { CategoryForm } from '../../_components/CategoryForm';
import { notFound } from 'next/navigation';
import * as categoryService from '@/lib/services/category.service';
import { PageHeader } from '../../../_components/ui/PageHeader';
import { Card, CardContent } from '../../../_components/ui/Card';

export default async function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const category = await categoryService.getCategoryById(id);
  if (!category) return notFound();
  
  return (
    <>
      <PageHeader title="Edit Category"/>
      <Card>
        <CardContent className="pt-6">
          <CategoryForm category={category} />
        </CardContent>
      </Card>
    </>
  );
} 