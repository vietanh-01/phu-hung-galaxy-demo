'use client';

import * as React from 'react';
import Link from 'next/link';
import { optimizeCloudinaryImage } from '@/lib/utils';
import { Partner } from '@prisma/client';
import { PageHeader } from '../_components/ui/PageHeader';
import { Button } from '../_components/ui/Button';
import { DataTable, DataTableColumn } from '../_components/DataTable';
import { ConfirmationModal } from '../_components/ConfirmationModal';
import { useTransition } from 'react';
import { deletePartner } from '@/lib/actions/partner.actions';
import toast from 'react-hot-toast';

interface PartnersClientProps {
  partners: Partner[];
  totalCount: number;
  pageSize: number;
}

export default function PartnersClient({ partners, totalCount, pageSize }: PartnersClientProps) {
  const [isPending, startTransition] = useTransition();
  const [partnerToDelete, setPartnerToDelete] = React.useState<Partner | null>(null);

  const pageCount = Math.ceil(totalCount / pageSize);

  const columns: DataTableColumn<Partner>[] = [
    {
      accessorKey: 'logoUrl',
      header: 'Logo',
      cell: (row) => (
        <img
          src={optimizeCloudinaryImage(row.logoUrl, 'w_48,h_48,c_fill,q_auto,f_auto')}
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
      accessorKey: 'actions',
      header: 'Actions',
      cell: (row) => (
        <div className="space-x-2">
          <Button asChild variant="outline" size="sm">
            <Link href={`/admin/partners/edit/${row.id}`}>Edit</Link>
          </Button>
          <Button variant="destructive" size="sm" onClick={() => setPartnerToDelete(row)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader title="Manage Partners">
        <Button asChild>
          <Link href="/admin/partners/new">Add New Partner</Link>
        </Button>
      </PageHeader>

      <DataTable columns={columns} data={partners} totalCount={totalCount} pageCount={pageCount} pageSize={pageSize} />

      {partnerToDelete && (
        <ConfirmationModal
          isOpen={!!partnerToDelete}
          onClose={() => setPartnerToDelete(null)}
          onConfirm={() => {
            startTransition(async () => {
              const result = await deletePartner(partnerToDelete.id);
              if (result.success) {
                toast.success(result.message || 'Partner deleted successfully!');
                setPartnerToDelete(null);
              } else {
                toast.error(result.message || 'Failed to delete partner.');
              }
            });
          }}
          title="Confirm Deletion"
          message={`Are you sure you want to delete the partner "${partnerToDelete.name}"? This action cannot be undone.`}
          isConfirming={isPending}
        />
      )}
    </div>
  );
} 