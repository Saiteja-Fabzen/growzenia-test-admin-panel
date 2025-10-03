'use client';

import { useState } from 'react';
import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  SortingState,
  ColumnFiltersState,
  PaginationState
} from '@tanstack/react-table';
import { DataTable } from '@/components/ui/table/data-table';
import { GoldPurchase } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Eye, RefreshCw, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';

// Sample data - replace with actual API call
const goldPurchaseData: GoldPurchase[] = [
  {
    id: '1',
    userId: '1',
    userName: 'Rajesh Kumar',
    amount: 5000,
    goldWeight: 0.92,
    pricePerGram: 5420,
    transactionId: 'TXN001234567',
    status: 'SUCCESS',
    createdAt: new Date('2024-01-10T09:30:00'),
    providerId: 'MMTC-PAMP-001'
  },
  {
    id: '2',
    userId: '2',
    userName: 'Priya Sharma',
    amount: 2500,
    goldWeight: 0.46,
    pricePerGram: 5420,
    transactionId: 'TXN001234568',
    status: 'SUCCESS',
    createdAt: new Date('2024-01-10T10:15:00'),
    providerId: 'MMTC-PAMP-002'
  },
  {
    id: '3',
    userId: '3',
    userName: 'Amit Singh',
    amount: 1000,
    goldWeight: 0.18,
    pricePerGram: 5420,
    transactionId: 'TXN001234569',
    status: 'FAILED',
    createdAt: new Date('2024-01-10T11:00:00'),
    providerId: 'MMTC-PAMP-003'
  },
  {
    id: '4',
    userId: '4',
    userName: 'Sneha Patel',
    amount: 10000,
    goldWeight: 1.85,
    pricePerGram: 5420,
    transactionId: 'TXN001234570',
    status: 'PENDING',
    createdAt: new Date('2024-01-10T12:30:00'),
    providerId: 'MMTC-PAMP-004'
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'SUCCESS':
      return <Badge className="bg-green-100 text-green-800">Success</Badge>;
    case 'PENDING':
      return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
    case 'FAILED':
      return <Badge className="bg-red-100 text-red-800">Failed</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

const columns: ColumnDef<GoldPurchase>[] = [
  {
    accessorKey: 'transactionId',
    header: 'Transaction ID',
    cell: ({ row }) => {
      const id = row.getValue('transactionId') as string;
      return <div className="font-mono text-sm">{id}</div>;
    }
  },
  {
    accessorKey: 'userName',
    header: 'User',
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div>
          <div className="font-medium">{user.userName}</div>
          <div className="text-sm text-muted-foreground">ID: {user.userId}</div>
        </div>
      );
    }
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell: ({ row }) => {
      const amount = row.getValue('amount') as number;
      return <div className="font-medium">₹{amount.toLocaleString()}</div>;
    }
  },
  {
    accessorKey: 'goldWeight',
    header: 'Gold Weight',
    cell: ({ row }) => {
      const weight = row.getValue('goldWeight') as number;
      return <div className="font-medium">{weight.toFixed(3)}g</div>;
    }
  },
  {
    accessorKey: 'pricePerGram',
    header: 'Price/Gram',
    cell: ({ row }) => {
      const price = row.getValue('pricePerGram') as number;
      return <div>₹{price.toLocaleString()}</div>;
    }
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => getStatusBadge(row.getValue('status'))
  },
  {
    accessorKey: 'createdAt',
    header: 'Date & Time',
    cell: ({ row }) => {
      const date = row.getValue('createdAt') as Date;
      return (
        <div className="text-sm">
          <div>{format(date, 'MMM dd, yyyy')}</div>
          <div className="text-muted-foreground">{format(date, 'HH:mm:ss')}</div>
        </div>
      );
    }
  },
  {
    accessorKey: 'providerId',
    header: 'Provider',
    cell: ({ row }) => {
      const providerId = row.getValue('providerId') as string;
      return <div className="text-sm">{providerId}</div>;
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const purchase = row.original;
      
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </DropdownMenuItem>
            {purchase.status === 'PENDING' && (
              <DropdownMenuItem>
                <RefreshCw className="mr-2 h-4 w-4" />
                Check Status
              </DropdownMenuItem>
            )}
            {purchase.status === 'FAILED' && (
              <DropdownMenuItem>
                <AlertCircle className="mr-2 h-4 w-4" />
                View Error
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
  }
];

export function GoldPurchaseTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10
  });

  const table = useReactTable({
    data: goldPurchaseData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    state: {
      sorting,
      columnFilters,
      pagination
    }
  });

  return <DataTable table={table} />;
}