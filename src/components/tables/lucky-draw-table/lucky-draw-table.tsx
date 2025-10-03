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
import { LuckyDraw } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Eye, Users, Trophy, Play, Square, Edit } from 'lucide-react';
import { format } from 'date-fns';

// Sample data - replace with actual API call
const luckyDrawData: LuckyDraw[] = [
  {
    id: '1',
    title: 'Bronze Weekly Draw',
    category: 'BRONZE',
    prizeAmount: 1000,
    maxEntries: 1000,
    currentEntries: 847,
    startDate: new Date('2024-01-08'),
    endDate: new Date('2024-01-14'),
    status: 'ACTIVE',
    winnerId: undefined,
    winnerName: undefined,
    isPayoutCompleted: false
  },
  {
    id: '2',
    title: 'Silver Monthly Bonanza',
    category: 'SILVER',
    prizeAmount: 5000,
    maxEntries: 2000,
    currentEntries: 1456,
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-01-31'),
    status: 'ACTIVE',
    winnerId: undefined,
    winnerName: undefined,
    isPayoutCompleted: false
  },
  {
    id: '3',
    title: 'Gold Special Draw',
    category: 'GOLD',
    prizeAmount: 10000,
    maxEntries: 500,
    currentEntries: 500,
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-01-07'),
    status: 'COMPLETED',
    winnerId: '123',
    winnerName: 'Rajesh Kumar',
    isPayoutCompleted: true
  },
  {
    id: '4',
    title: 'Diamond Premium Draw',
    category: 'DIAMOND',
    prizeAmount: 25000,
    maxEntries: 200,
    currentEntries: 156,
    startDate: new Date('2024-01-15'),
    endDate: new Date('2024-01-31'),
    status: 'SCHEDULED',
    winnerId: undefined,
    winnerName: undefined,
    isPayoutCompleted: false
  }
];

const getCategoryBadge = (category: string) => {
  const colors = {
    'BRONZE': 'bg-orange-100 text-orange-800',
    'SILVER': 'bg-gray-100 text-gray-800',
    'GOLD': 'bg-yellow-100 text-yellow-800',
    'DIAMOND': 'bg-blue-100 text-blue-800',
    'DAILY_SIP': 'bg-purple-100 text-purple-800'
  };
  
  return (
    <Badge className={colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800'}>
      {category}
    </Badge>
  );
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'ACTIVE':
      return <Badge className="bg-green-100 text-green-800">Active</Badge>;
    case 'SCHEDULED':
      return <Badge className="bg-blue-100 text-blue-800">Scheduled</Badge>;
    case 'CLOSED':
      return <Badge className="bg-yellow-100 text-yellow-800">Closed</Badge>;
    case 'COMPLETED':
      return <Badge className="bg-gray-100 text-gray-800">Completed</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

const columns: ColumnDef<LuckyDraw>[] = [
  {
    accessorKey: 'title',
    header: 'Draw Title',
    cell: ({ row }) => {
      const draw = row.original;
      return (
        <div>
          <div className="font-medium">{draw.title}</div>
          <div className="text-sm text-muted-foreground">ID: {draw.id}</div>
        </div>
      );
    }
  },
  {
    accessorKey: 'category',
    header: 'Category',
    cell: ({ row }) => getCategoryBadge(row.getValue('category'))
  },
  {
    accessorKey: 'prizeAmount',
    header: 'Prize Amount',
    cell: ({ row }) => {
      const amount = row.getValue('prizeAmount') as number;
      return <div className="font-medium">₹{amount.toLocaleString()}</div>;
    }
  },
  {
    accessorKey: 'currentEntries',
    header: 'Entries',
    cell: ({ row }) => {
      const current = row.getValue('currentEntries') as number;
      const max = row.original.maxEntries;
      const percentage = (current / max) * 100;
      
      return (
        <div>
          <div className="font-medium">{current.toLocaleString()} / {max.toLocaleString()}</div>
          <div className="text-sm text-muted-foreground">{percentage.toFixed(1)}% filled</div>
        </div>
      );
    }
  },
  {
    accessorKey: 'endDate',
    header: 'End Date',
    cell: ({ row }) => {
      const date = row.getValue('endDate') as Date;
      return (
        <div className="text-sm">
          <div>{format(date, 'MMM dd, yyyy')}</div>
          <div className="text-muted-foreground">{format(date, 'HH:mm')}</div>
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
    accessorKey: 'winnerName',
    header: 'Winner',
    cell: ({ row }) => {
      const winnerName = row.getValue('winnerName') as string;
      const isPayoutCompleted = row.original.isPayoutCompleted;
      
      return winnerName ? (
        <div>
          <div className="font-medium text-sm">{winnerName}</div>
          <div className="text-xs text-muted-foreground">
            {isPayoutCompleted ? '✅ Paid' : '⏳ Pending'}
          </div>
        </div>
      ) : (
        <div className="text-sm text-muted-foreground">-</div>
      );
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const draw = row.original;
      
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
            <DropdownMenuItem>
              <Users className="mr-2 h-4 w-4" />
              View Entries
            </DropdownMenuItem>
            {draw.status === 'SCHEDULED' && (
              <DropdownMenuItem>
                <Play className="mr-2 h-4 w-4" />
                Start Draw
              </DropdownMenuItem>
            )}
            {draw.status === 'ACTIVE' && (
              <DropdownMenuItem>
                <Square className="mr-2 h-4 w-4" />
                Close Draw
              </DropdownMenuItem>
            )}
            {draw.status === 'CLOSED' && !draw.winnerId && (
              <DropdownMenuItem>
                <Trophy className="mr-2 h-4 w-4" />
                Select Winner
              </DropdownMenuItem>
            )}
            {draw.winnerId && !draw.isPayoutCompleted && (
              <DropdownMenuItem>
                <Trophy className="mr-2 h-4 w-4" />
                Complete Payout
              </DropdownMenuItem>
            )}
            <DropdownMenuItem>
              <Edit className="mr-2 h-4 w-4" />
              Edit Draw
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
  }
];

export function LuckyDrawTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10
  });

  const table = useReactTable({
    data: luckyDrawData,
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