'use client';

import * as React from 'react';
import Link from 'next/link';
import { PageHeader } from '../_components/ui/PageHeader';
import { Button } from '../_components/ui/Button';
import { DataTable, DataTableColumn } from '../_components/DataTable';
import { ConfirmationModal } from '../_components/ConfirmationModal';
import { useTransition } from 'react';
import { deleteCategory } from '@/lib/actions/category.actions';
import toast from 'react-hot-toast';
import { Prisma } from '@prisma/client';

type CategoryWithCount = Prisma.CategoryGetPayload<{
  include: {
    _count: {
      select: { products: true }
    }
  }
}>;

interface CategoriesClientProps {
  categories: CategoryWithCount[];
  totalCount: number;
  pageSize: number;
}

export default function CategoriesClient({ categories, totalCount, pageSize }: CategoriesClientProps) {
  const [isPending, startTransition] = useTransition();
  const [categoryToDelete, setCategoryToDelete] = React.useState<CategoryWithCount | null>(null);

  const pageCount = Math.ceil(totalCount / pageSize);

  const columns: DataTableColumn<CategoryWithCount>[] = [
    {
      accessorKey: 'name',
      header: 'Name',
      cell: (row) => <span className="font-medium text-gray-900">{row.name}</span>,
      enableSorting: true,
    },
    {
      accessorKey: 'products',
      header: 'Products',
      cell: (row) => <span className="text-gray-500">{row._count.products}</span>,
    },
    {
      accessorKey: 'actions',
      header: 'Actions',
      cell: (row) => (
        <div className="space-x-2">
          <Button asChild variant="outline" size="sm">
            <Link href={`/admin/categories/edit/${row.id}`}>Edit</Link>
          </Button>
          <Button variant="destructive" size="sm" onClick={() => setCategoryToDelete(row)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader title="Manage Categories">
        <Button asChild>
          <Link href="/admin/categories/new">Add New Category</Link>
        </Button>
      </PageHeader>

      <DataTable columns={columns} data={categories} totalCount={totalCount} pageCount={pageCount} pageSize={pageSize} />

      {categoryToDelete && (
        <ConfirmationModal
          isOpen={!!categoryToDelete}
          onClose={() => setCategoryToDelete(null)}
          onConfirm={() => {
            startTransition(async () => {
              const result = await deleteCategory(categoryToDelete.id);
              if (result.success) {
                toast.success(result.message || 'Category deleted successfully!');
                setCategoryToDelete(null);
              } else {
                toast.error(result.message || 'Failed to delete category.');
              }
            });
          }}
          title="Confirm Deletion"
          message={`Are you sure you want to delete the category "${categoryToDelete.name}"? This action cannot be undone.`}
          isConfirming={isPending}
        />
      )}
    </div>
  );
} 