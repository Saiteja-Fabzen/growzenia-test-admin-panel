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
import { WithdrawalRequest } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Eye, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';

// Sample data - replace with actual API call
const withdrawalData: WithdrawalRequest[] = [
  {
    id: '1',
    userId: '1',
    userName: 'Rajesh Kumar',
    amount: 5000,
    bankAccount: '****1234',
    ifscCode: 'HDFC0001234',
    status: 'PENDING',
    requestedAt: new Date('2024-01-10T09:30:00'),
    processedAt: undefined,
    processedBy: undefined,
    remarks: undefined,
    utrNumber: undefined
  },
  {
    id: '2',
    userId: '2',
    userName: 'Priya Sharma',
    amount: 12000,
    bankAccount: '****5678',
    ifscCode: 'ICIC0005678',
    status: 'APPROVED',
    requestedAt: new Date('2024-01-09T14:15:00'),
    processedAt: new Date('2024-01-10T10:30:00'),
    processedBy: 'Finance Admin',
    remarks: 'Approved for processing',
    utrNumber: undefined
  },
  {
    id: '3',
    userId: '3',
    userName: 'Amit Singh',
    amount: 75000,
    bankAccount: '****9012',
    ifscCode: 'SBI0009012',
    status: 'REJECTED',
    requestedAt: new Date('2024-01-08T16:45:00'),
    processedAt: new Date('2024-01-09T11:20:00'),
    processedBy: 'Finance Admin',
    remarks: 'Amount exceeds monthly limit',
    utrNumber: undefined
  },
  {
    id: '4',
    userId: '4',
    userName: 'Sneha Patel',
    amount: 8500,
    bankAccount: '****3456',
    ifscCode: 'AXIS0003456',
    status: 'PAID',
    requestedAt: new Date('2024-01-07T11:00:00'),
    processedAt: new Date('2024-01-08T09:15:00'),
    processedBy: 'Finance Admin',
    remarks: 'Payment completed successfully',
    utrNumber: 'UTR123456789'
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'PENDING':
      return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
    case 'APPROVED':
      return <Badge className="bg-blue-100 text-blue-800">Approved</Badge>;
    case 'PAID':
      return <Badge className="bg-green-100 text-green-800">Paid</Badge>;
    case 'REJECTED':
      return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
    case 'FAILED':
      return <Badge className="bg-red-100 text-red-800">Failed</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

const columns: ColumnDef<WithdrawalRequest>[] = [
  {
    accessorKey: 'id',
    header: 'Request ID',
    cell: ({ row }) => {
      const id = row.getValue('id') as string;
      return <div className="font-mono text-sm">WR-{id.padStart(6, '0')}</div>;
    }
  },
  {
    accessorKey: 'userName',
    header: 'User',
    cell: ({ row }) => {
      const request = row.original;
      return (
        <div>
          <div className="font-medium">{request.userName}</div>
          <div className="text-sm text-muted-foreground">ID: {request.userId}</div>
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
    accessorKey: 'bankAccount',
    header: 'Bank Account',
    cell: ({ row }) => {
      const account = row.getValue('bankAccount') as string;
      const ifsc = row.original.ifscCode;
      return (
        <div>
          <div className="font-mono text-sm">{account}</div>
          <div className="text-xs text-muted-foreground">{ifsc}</div>
        </div>
      );
    }
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => getStatusBadge(row.getValue('status'))
  },
  {
    accessorKey: 'requestedAt',
    header: 'Requested',
    cell: ({ row }) => {
      const date = row.getValue('requestedAt') as Date;
      return (
        <div className="text-sm">
          <div>{format(date, 'MMM dd, yyyy')}</div>
          <div className="text-muted-foreground">{format(date, 'HH:mm')}</div>
        </div>
      );
    }
  },
  {
    accessorKey: 'processedBy',
    header: 'Processed By',
    cell: ({ row }) => {
      const processedBy = row.getValue('processedBy') as string;
      const processedAt = row.original.processedAt;
      
      return processedBy ? (
        <div>
          <div className="text-sm font-medium">{processedBy}</div>
          {processedAt && (
            <div className="text-xs text-muted-foreground">
              {format(processedAt, 'MMM dd, HH:mm')}
            </div>
          )}
        </div>
      ) : (
        <div className="text-sm text-muted-foreground">-</div>
      );
    }
  },
  {
    accessorKey: 'utrNumber',
    header: 'UTR Number',
    cell: ({ row }) => {
      const utr = row.getValue('utrNumber') as string;
      return utr ? (
        <div className="font-mono text-sm">{utr}</div>
      ) : (
        <div className="text-sm text-muted-foreground">-</div>
      );
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const withdrawal = row.original;
      
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
            {withdrawal.status === 'PENDING' && (
              <>
                <DropdownMenuItem>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Approve Request
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <XCircle className="mr-2 h-4 w-4" />
                  Reject Request
                </DropdownMenuItem>
              </>
            )}
            {withdrawal.status === 'APPROVED' && (
              <DropdownMenuItem>
                <CheckCircle className="mr-2 h-4 w-4" />
                Mark as Paid
              </DropdownMenuItem>
            )}
            {withdrawal.status === 'FAILED' && (
              <DropdownMenuItem>
                <AlertCircle className="mr-2 h-4 w-4" />
                Retry Payment
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
  }
];

export function WithdrawalTable() {
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

  return <DataTable table={table} />;
}