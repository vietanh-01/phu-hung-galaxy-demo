'use client';

import * as React from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/Table';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';

export interface DataTableColumn<TData> {
  accessorKey: keyof TData | string;
  header: React.ReactNode;
  cell: (row: TData) => React.ReactNode;
  enableSorting?: boolean;
}

interface DataTableProps<TData> {
  columns: DataTableColumn<TData>[];
  data: TData[];
  totalCount: number;
  pageCount: number;
  pageSize?: number;
}

export function DataTable<TData>({
  columns,
  data,
  totalCount,
  pageCount,
  pageSize = 10,
}: DataTableProps<TData>) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get('page')) || 1;
  const search = searchParams.get('search') || '';
  const sort = searchParams.get('sort') || '';
  const [sortField, sortDirection] = sort.split(':');

  const createQueryString = React.useCallback(
    (params: Record<string, string | number | null>) => {
      const newSearchParams = new URLSearchParams(searchParams.toString());
      for (const [key, value] of Object.entries(params)) {
        if (value === null) {
          newSearchParams.delete(key);
        } else {
          newSearchParams.set(key, String(value));
        }
      }
      return newSearchParams.toString();
    },
    [searchParams]
  );

  const handleSort = (accessorKey: keyof TData | string) => {
    const newDirection = sortField === accessorKey && sortDirection === 'asc' ? 'desc' : 'asc';
    router.push(`${pathname}?${createQueryString({ sort: `${String(accessorKey)}:${newDirection}` })}`);
  };

  const renderSortIcon = (accessorKey: keyof TData | string) => {
    if (sortField !== accessorKey) {
      return <FontAwesomeIcon icon={faSort} className="ml-2 h-4 w-4 text-gray-400" />;
    }
    if (sortDirection === 'asc') {
      return <FontAwesomeIcon icon={faSortUp} className="ml-2 h-4 w-4" />;
    }
    return <FontAwesomeIcon icon={faSortDown} className="ml-2 h-4 w-4" />;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <Input
          placeholder="Search..."
          defaultValue={search}
          onChange={(e) => {
            const { value } = e.target;
            // Debounce could be added here
            router.push(`${pathname}?${createQueryString({ search: value || null, page: 1 })}`);
          }}
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={String(column.accessorKey)}>
                  {column.enableSorting ? (
                    <Button variant="link" className="p-0 h-auto font-medium text-gray-500 hover:text-gray-800" onClick={() => handleSort(column.accessorKey)}>
                      {column.header}
                      {renderSortIcon(column.accessorKey)}
                    </Button>
                  ) : (
                    column.header
                  )}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length ? (
              data.map((row, index) => (
                <TableRow key={index}>
                  {columns.map((column) => (
                    <TableCell key={String(column.accessorKey)}>
                      {column.cell(row)}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">
          Showing {Math.min((page - 1) * pageSize + 1, totalCount)} to {Math.min(page * pageSize, totalCount)} of {totalCount} results
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push(`${pathname}?${createQueryString({ page: page - 1 })}`)}
            disabled={page <= 1}
          >
            Previous
          </Button>
          <span className="text-sm">
            Page {page} of {pageCount}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push(`${pathname}?${createQueryString({ page: page + 1 })}`)}
            disabled={page >= pageCount}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
} 