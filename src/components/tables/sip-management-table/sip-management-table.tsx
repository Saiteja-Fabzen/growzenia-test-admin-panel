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
import { SIPRecord } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Eye, Play, Pause, Square, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';

// Sample data - replace with actual API call
const sipData: SIPRecord[] = [
  {
    id: '1',
    userId: '1',
    userName: 'Rajesh Kumar',
    dailyAmount: 100,
    status: 'ACTIVE',
    totalInvested: 8500,
    totalRewards: 850,
    startDate: new Date('2023-09-01'),
    lastDebitDate: new Date('2024-01-09'),
    nextDebitDate: new Date('2024-01-10'),
    autoDebitStatus: 'SUCCESS'
  },
  {
    id: '2',
    userId: '2',
    userName: 'Priya Sharma',
    dailyAmount: 200,
    status: 'ACTIVE',
    totalInvested: 15400,
    totalRewards: 1540,
    startDate: new Date('2023-08-15'),
    lastDebitDate: new Date('2024-01-09'),
    nextDebitDate: new Date('2024-01-10'),
    autoDebitStatus: 'SUCCESS'
  },
  {
    id: '3',
    userId: '3',
    userName: 'Amit Singh',
    dailyAmount: 50,
    status: 'PAUSED',
    totalInvested: 2250,
    totalRewards: 225,
    startDate: new Date('2023-11-01'),
    lastDebitDate: new Date('2023-12-15'),
    nextDebitDate: new Date('2024-01-10'),
    autoDebitStatus: 'FAILED'
  },
  {
    id: '4',
    userId: '4',
    userName: 'Sneha Patel',
    dailyAmount: 300,
    status: 'ACTIVE',
    totalInvested: 12600,
    totalRewards: 1260,
    startDate: new Date('2023-10-01'),
    lastDebitDate: new Date('2024-01-09'),
    nextDebitDate: new Date('2024-01-10'),
    autoDebitStatus: 'SUCCESS'
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'ACTIVE':
      return <Badge className="bg-green-100 text-green-800">Active</Badge>;
    case 'PAUSED':
      return <Badge className="bg-yellow-100 text-yellow-800">Paused</Badge>;
    case 'CANCELLED':
      return <Badge className="bg-red-100 text-red-800">Cancelled</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

const getAutoDebitBadge = (status: string) => {
  switch (status) {
    case 'SUCCESS':
      return <Badge className="bg-green-100 text-green-800">Success</Badge>;
    case 'FAILED':
      return <Badge className="bg-red-100 text-red-800">Failed</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

const columns: ColumnDef<SIPRecord>[] = [
  {
    accessorKey: 'userName',
    header: 'User',
    cell: ({ row }) => {
      const sip = row.original;
      return (
        <div>
          <div className="font-medium">{sip.userName}</div>
          <div className="text-sm text-muted-foreground">ID: {sip.userId}</div>
        </div>
      );
    }
  },
  {
    accessorKey: 'dailyAmount',
    header: 'Daily Amount',
    cell: ({ row }) => {
      const amount = row.getValue('dailyAmount') as number;
      return <div className="font-medium">₹{amount.toLocaleString()}</div>;
    }
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => getStatusBadge(row.getValue('status'))
  },
  {
    accessorKey: 'totalInvested',
    header: 'Total Invested',
    cell: ({ row }) => {
      const invested = row.getValue('totalInvested') as number;
      return <div className="font-medium">₹{invested.toLocaleString()}</div>;
    }
  },
  {
    accessorKey: 'totalRewards',
    header: 'Rewards Earned',
    cell: ({ row }) => {
      const rewards = row.getValue('totalRewards') as number;
      return <div className="font-medium text-green-600">₹{rewards.toLocaleString()}</div>;
    }
  },
  {
    accessorKey: 'autoDebitStatus',
    header: 'Last Debit',
    cell: ({ row }) => {
      const status = row.getValue('autoDebitStatus') as string;
      const lastDate = row.original.lastDebitDate;
      
      return (
        <div>
          {getAutoDebitBadge(status)}
          <div className="text-xs text-muted-foreground mt-1">
            {format(lastDate, 'MMM dd')}
          </div>
        </div>
      );
    }
  },
  {
    accessorKey: 'nextDebitDate',
    header: 'Next Debit',
    cell: ({ row }) => {
      const date = row.getValue('nextDebitDate') as Date;
      const status = row.original.status;
      
      return (
        <div className="text-sm">
          {status === 'ACTIVE' ? (
            <div>{format(date, 'MMM dd, yyyy')}</div>
          ) : (
            <div className="text-muted-foreground">-</div>
          )}
        </div>
      );
    }
  },
  {
    accessorKey: 'startDate',
    header: 'Start Date',
    cell: ({ row }) => {
      const date = row.getValue('startDate') as Date;
      return <div className="text-sm">{format(date, 'MMM dd, yyyy')}</div>;
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const sip = row.original;
      
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
            {sip.status === 'ACTIVE' && (
              <DropdownMenuItem>
                <Pause className="mr-2 h-4 w-4" />
                Pause SIP
              </DropdownMenuItem>
            )}
            {sip.status === 'PAUSED' && (
              <DropdownMenuItem>
                <Play className="mr-2 h-4 w-4" />
                Resume SIP
              </DropdownMenuItem>
            )}
            {sip.autoDebitStatus === 'FAILED' && (
              <DropdownMenuItem>
                <AlertCircle className="mr-2 h-4 w-4" />
                Retry Payment
              </DropdownMenuItem>
            )}
            <DropdownMenuItem className="text-red-600">
              <Square className="mr-2 h-4 w-4" />
              Cancel SIP
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
  }
];

export function SIPManagementTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10
  });

  const table = useReactTable({
    data: sipData,
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