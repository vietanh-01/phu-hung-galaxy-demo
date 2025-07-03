import { CategoryForm } from '../_components/CategoryForm';
import { PageHeader } from '../../_components/ui/PageHeader';
import { Card, CardContent } from '../../_components/ui/Card';

export default async function NewCategoryPage() {
  return (
    <>
      <PageHeader title="Add New Category" />
      <Card>
        <CardContent className="pt-6">
          <CategoryForm />
        </CardContent>
      </Card>
    </>
  );
} 