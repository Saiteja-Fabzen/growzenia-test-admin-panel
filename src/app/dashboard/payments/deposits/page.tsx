'use client';

import { useState } from 'react';
import PageContainer from '@/components/layout/page-container';
import { DataTable } from '@/components/ui/table/data-table';
import { Button } from '@/components/ui/button';
import { Download, Filter, Maximize2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
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
import { format } from 'date-fns';

interface Deposit {
  id: string;
  userId: string;
  userName: string;
  amount: number;
  paymentMethod: string;
  transactionId: string;
  status: 'SUCCESS' | 'PENDING' | 'FAILED';
  createdAt: Date;
}

const depositData: Deposit[] = [
  {
    id: '1',
    userId: 'USR001',
    userName: 'Rajesh Kumar',
    amount: 5000,
    paymentMethod: 'UPI',
    transactionId: 'TXN123456789',
    status: 'SUCCESS',
    createdAt: new Date('2024-01-10')
  },
  {
    id: '2',
    userId: 'USR002',
    userName: 'Priya Sharma',
    amount: 3000,
    paymentMethod: 'Net Banking',
    transactionId: 'TXN123456790',
    status: 'SUCCESS',
    createdAt: new Date('2024-01-09')
  },
  {
    id: '3',
    userId: 'USR003',
    userName: 'Amit Singh',
    amount: 10000,
    paymentMethod: 'Card',
    transactionId: 'TXN123456791',
    status: 'PENDING',
    createdAt: new Date('2024-01-08')
  },
  {
    id: '4',
    userId: 'USR004',
    userName: 'Sneha Patel',
    amount: 2500,
    paymentMethod: 'UPI',
    transactionId: 'TXN123456792',
    status: 'FAILED',
    createdAt: new Date('2024-01-07')
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

const columns: ColumnDef<Deposit>[] = [
  {
    accessorKey: 'userName',
    header: 'User Name',
    cell: ({ row }) => <div className="font-medium">{row.getValue('userName')}</div>
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
    accessorKey: 'paymentMethod',
    header: 'Payment Method',
    cell: ({ row }) => <div>{row.getValue('paymentMethod')}</div>
  },
  {
    accessorKey: 'transactionId',
    header: 'Transaction ID',
    cell: ({ row }) => <div className="font-mono text-sm">{row.getValue('transactionId')}</div>
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => getStatusBadge(row.getValue('status'))
  },
  {
    accessorKey: 'createdAt',
    header: 'Date',
    cell: ({ row }) => {
      const date = row.getValue('createdAt') as Date;
      return <div className="text-sm" suppressHydrationWarning>{format(date, 'MMM dd, yyyy')}</div>;
    }
  }
];

export default function DepositsPage() {
  const [isMaximized, setIsMaximized] = useState(false);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10
  });

  const table = useReactTable({
    data: depositData,
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

  return (
    <PageContainer>
      <div className="flex flex-1 flex-col space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Deposits</h1>
            <p className="text-muted-foreground">
              View and manage all user deposits
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>All Deposits</DropdownMenuItem>
                <DropdownMenuItem>Success</DropdownMenuItem>
                <DropdownMenuItem>Pending</DropdownMenuItem>
                <DropdownMenuItem>Failed</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <DataTable
          table={table}
          isMaximized={isMaximized}
          onMaximizeChange={setIsMaximized}
        >
          <div className="flex items-center justify-between gap-2">
            <Input
              placeholder="Search by user name or transaction ID..."
              className="max-w-sm"
            />
            {!isMaximized && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsMaximized(true)}
              >
                <Maximize2 className="mr-2 h-4 w-4" />
                Maximize
              </Button>
            )}
          </div>
        </DataTable>
      </div>
    </PageContainer>
  );
}
