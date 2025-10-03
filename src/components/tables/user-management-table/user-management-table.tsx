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
import { User } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { MoreHorizontal, Eye, Ban, CheckCircle, XCircle } from 'lucide-react';
import { format } from 'date-fns';

// Sample data - replace with actual API call
const userData: User[] = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@email.com',
    mobile: '+91 9876543210',
    isActive: true,
    isBlocked: false,
    kycStatus: 'APPROVED',
    goldBalance: 12.5,
    cashBalance: 2500.0,
    totalInvested: 45000.0,
    joinDate: new Date('2023-01-15'),
    lastActivity: new Date('2024-01-10')
  },
  {
    id: '2',
    name: 'Priya Sharma',
    email: 'priya.sharma@email.com',
    mobile: '+91 8765432109',
    isActive: true,
    isBlocked: false,
    kycStatus: 'PENDING',
    goldBalance: 8.2,
    cashBalance: 1800.0,
    totalInvested: 32000.0,
    joinDate: new Date('2023-03-20'),
    lastActivity: new Date('2024-01-09')
  },
  {
    id: '3',
    name: 'Amit Singh',
    email: 'amit.singh@email.com',
    mobile: '+91 7654321098',
    isActive: false,
    isBlocked: true,
    kycStatus: 'REJECTED',
    goldBalance: 0,
    cashBalance: 500.0,
    totalInvested: 8000.0,
    joinDate: new Date('2023-06-10'),
    lastActivity: new Date('2023-12-15')
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'APPROVED':
      return <Badge className="bg-green-100 text-green-800">Approved</Badge>;
    case 'PENDING':
      return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
    case 'REJECTED':
      return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: 'User',
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src="" alt={user.name} />
            <AvatarFallback>
              {user.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="font-medium">{user.name}</div>
        </div>
      );
    }
  },
  {
    accessorKey: 'mobile',
    header: 'Mobile',
    cell: ({ row }) => {
      return <div className="text-sm">{row.getValue('mobile')}</div>;
    }
  },
  {
    accessorKey: 'kycStatus',
    header: 'KYC Status',
    cell: ({ row }) => getStatusBadge(row.getValue('kycStatus'))
  },
  {
    accessorKey: 'goldBalance',
    header: 'Gold Balance',
    cell: ({ row }) => {
      const balance = row.getValue('goldBalance') as number;
      return <div className="font-medium">{balance.toFixed(2)}g</div>;
    }
  },
  {
    accessorKey: 'cashBalance',
    header: 'Cash Balance',
    cell: ({ row }) => {
      const balance = row.getValue('cashBalance') as number;
      return <div className="font-medium">₹{balance.toLocaleString()}</div>;
    }
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
    accessorKey: 'isActive',
    header: 'Status',
    cell: ({ row }) => {
      const isActive = row.getValue('isActive') as boolean;
      const isBlocked = row.original.isBlocked;
      
      if (isBlocked) {
        return <Badge variant="destructive">Blocked</Badge>;
      }
      return isActive ? (
        <Badge className="bg-green-100 text-green-800">Active</Badge>
      ) : (
        <Badge variant="secondary">Inactive</Badge>
      );
    }
  },
  {
    accessorKey: 'lastActivity',
    header: 'Last Activity',
    cell: ({ row }) => {
      const date = row.getValue('lastActivity') as Date;
      return <div className="text-sm" suppressHydrationWarning>{format(date, 'MMM dd, yyyy')}</div>;
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const user = row.original;
      
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
            {user.kycStatus === 'PENDING' && (
              <>
                <DropdownMenuItem>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Approve KYC
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <XCircle className="mr-2 h-4 w-4" />
                  Reject KYC
                </DropdownMenuItem>
              </>
            )}
            <DropdownMenuItem>
              <Ban className="mr-2 h-4 w-4" />
              {user.isBlocked ? 'Unblock User' : 'Block User'}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
  }
];

interface UserManagementTableProps {
  isMaximized?: boolean;
  onMaximizeChange?: (isMaximized: boolean) => void;
  searchBar?: React.ReactNode;
}

export function UserManagementTable({ isMaximized, onMaximizeChange, searchBar }: UserManagementTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10
  });

  const table = useReactTable({
    data: userData,
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

  console.log('Table rows:', table.getRowModel().rows.length);
  console.log('User data:', userData);

  return (
    <DataTable table={table} isMaximized={isMaximized} onMaximizeChange={onMaximizeChange}>
      {searchBar}
    </DataTable>
  );
}