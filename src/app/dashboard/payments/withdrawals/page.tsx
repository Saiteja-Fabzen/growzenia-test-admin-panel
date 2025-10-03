'use client';

import { useState } from 'react';
import PageContainer from '@/components/layout/page-container';
import { DataTable } from '@/components/ui/table/data-table';
import { Button } from '@/components/ui/button';
import { Download, Filter, Maximize2, CheckCircle, XCircle } from 'lucide-react';
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

interface Withdrawal {
  id: string;
  userId: string;
  userName: string;
  amount: number;
  bankAccount: string;
  ifscCode: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'PAID' | 'FAILED';
  requestedAt: Date;
  processedAt?: Date;
}

const withdrawalData: Withdrawal[] = [
  {
    id: '1',
    userId: 'USR001',
    userName: 'Rajesh Kumar',
    amount: 15000,
    bankAccount: 'XXXX1234',
    ifscCode: 'SBIN0001234',
    status: 'PAID',
    requestedAt: new Date('2024-01-08'),
    processedAt: new Date('2024-01-09')
  },
  {
    id: '2',
    userId: 'USR002',
    userName: 'Priya Sharma',
    amount: 8000,
    bankAccount: 'XXXX5678',
    ifscCode: 'HDFC0002345',
    status: 'APPROVED',
    requestedAt: new Date('2024-01-09')
  },
  {
    id: '3',
    userId: 'USR003',
    userName: 'Amit Singh',
    amount: 25000,
    bankAccount: 'XXXX9012',
    ifscCode: 'ICIC0003456',
    status: 'PENDING',
    requestedAt: new Date('2024-01-10')
  },
  {
    id: '4',
    userId: 'USR004',
    userName: 'Sneha Patel',
    amount: 5000,
    bankAccount: 'XXXX3456',
    ifscCode: 'AXIS0004567',
    status: 'REJECTED',
    requestedAt: new Date('2024-01-07')
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'PAID':
      return <Badge className="bg-green-100 text-green-800">Paid</Badge>;
    case 'APPROVED':
      return <Badge className="bg-blue-100 text-blue-800">Approved</Badge>;
    case 'PENDING':
      return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
    case 'REJECTED':
      return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
    case 'FAILED':
      return <Badge variant="destructive">Failed</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

const columns: ColumnDef<Withdrawal>[] = [
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
    accessorKey: 'bankAccount',
    header: 'Bank Account',
    cell: ({ row }) => <div className="font-mono text-sm">{row.getValue('bankAccount')}</div>
  },
  {
    accessorKey: 'ifscCode',
    header: 'IFSC Code',
    cell: ({ row }) => <div className="font-mono text-sm">{row.getValue('ifscCode')}</div>
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => getStatusBadge(row.getValue('status'))
  },
  {
    accessorKey: 'requestedAt',
    header: 'Requested Date',
    cell: ({ row }) => {
      const date = row.getValue('requestedAt') as Date;
      return <div className="text-sm" suppressHydrationWarning>{format(date, 'MMM dd, yyyy')}</div>;
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const withdrawal = row.original;

      if (withdrawal.status === 'PENDING') {
        return (
          <div className="flex gap-2">
            <Button variant="ghost" size="sm">
              <CheckCircle className="h-4 w-4 text-green-600" />
            </Button>
            <Button variant="ghost" size="sm">
              <XCircle className="h-4 w-4 text-red-600" />
            </Button>
          </div>
        );
      }
      return null;
    }
  }
];

export default function WithdrawalsPage() {
  const [isMaximized, setIsMaximized] = useState(false);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10
  });

  const table = useReactTable({
    data: withdrawalData,
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
            <h1 className="text-2xl font-bold tracking-tight">Withdrawals</h1>
            <p className="text-muted-foreground">
              View and manage all withdrawal requests
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
                <DropdownMenuItem>All Withdrawals</DropdownMenuItem>
                <DropdownMenuItem>Pending</DropdownMenuItem>
                <DropdownMenuItem>Approved</DropdownMenuItem>
                <DropdownMenuItem>Paid</DropdownMenuItem>
                <DropdownMenuItem>Rejected</DropdownMenuItem>
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
              placeholder="Search by user name or bank account..."
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
