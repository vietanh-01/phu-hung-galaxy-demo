'use client';

import * as React from 'react';
import Link from 'next/link';
import { optimizeCloudinaryImage } from '@/lib/utils';
import { Product, Category } from '@prisma/client';
import { PageHeader } from '../_components/ui/PageHeader';
import { Button } from '../_components/ui/Button';
import { DataTable, DataTableColumn } from '../_components/DataTable';
import { ConfirmationModal } from '../_components/ConfirmationModal';
import { useTransition } from 'react';
import { deleteProduct } from '@/lib/actions/productActions';
import toast from 'react-hot-toast';

// Serialized product type where Decimal fields are converted to numbers
type SerializedProduct = Omit<Product, 'price'> & {
  price: number;
  category: Category;
};

interface ProductsClientProps {
  products: SerializedProduct[];
  totalCount: number;
  pageSize: number;
}

export default function ProductsClient({ products, totalCount, pageSize }: ProductsClientProps) {
  const [isPending, startTransition] = useTransition();
  const [productToDelete, setProductToDelete] = React.useState<SerializedProduct | null>(null);

  const pageCount = Math.ceil(totalCount / pageSize);

  const columns: DataTableColumn<SerializedProduct>[] = [
    {
      accessorKey: 'imageUrl',
      header: 'Image',
      cell: (row) => (
        <img
          src={optimizeCloudinaryImage(row.imageUrl, 'w_48,h_48,c_fill,q_auto,f_auto')}
          alt={row.name}
          className="h-12 w-12 object-cover rounded-md"
        />
      ),
    },
    {
      accessorKey: 'name',
      header: 'Name',
      cell: (row) => <span className="font-medium text-gray-900">{row.name}</span>,
      enableSorting: true,
    },
    {
      accessorKey: 'category.name',
      header: 'Category',
      cell: (row) => <span className="text-gray-500">{row.category.name}</span>,
    },
    {
      accessorKey: 'price',
      header: 'Price',
      cell: (row) => (
        <span className="text-gray-500">
          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(row.price)}
        </span>
      ),
      enableSorting: true,
    },
    {
      accessorKey: 'actions',
      header: 'Actions',
      cell: (row) => (
        <div className="space-x-2">
          <Button asChild variant="outline" size="sm">
            <Link href={`/admin/products/edit/${row.id}`}>Edit</Link>
          </Button>
          <Button variant="destructive" size="sm" onClick={() => setProductToDelete(row)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader title="Manage Products">
        <Button asChild>
          <Link href="/admin/products/new">Add New Product</Link>
        </Button>
      </PageHeader>

      <DataTable columns={columns} data={products} totalCount={totalCount} pageCount={pageCount} pageSize={pageSize} />

      {productToDelete && (
        <ConfirmationModal
          isOpen={!!productToDelete}
          onClose={() => setProductToDelete(null)}
          onConfirm={() => {
            startTransition(async () => {
              const result = await deleteProduct(productToDelete.id);
              if (result.success) {
                toast.success(result.message);
                setProductToDelete(null);
              } else {
                toast.error(result.message);
              }
            });
          }}
          title="Confirm Deletion"
          message={`Are you sure you want to delete the product "${productToDelete.name}"? This action cannot be undone.`}
          isConfirming={isPending}
        />
      )}
    </div>
  );
} 