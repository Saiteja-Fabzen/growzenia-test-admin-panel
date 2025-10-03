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
import { KYCDocument } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { MoreHorizontal, Eye, CheckCircle, XCircle, FileText } from 'lucide-react';
import { format } from 'date-fns';

// Sample data - replace with actual API call
const kycData: (KYCDocument & { userName: string; userEmail: string })[] = [
  {
    id: '1',
    userId: '1',
    userName: 'Rajesh Kumar',
    userEmail: 'rajesh.kumar@email.com',
    documentType: 'AADHAAR',
    documentNumber: '1234-5678-9012',
    documentUrl: '/documents/kyc1.pdf',
    status: 'PENDING',
    reviewedBy: undefined,
    reviewedAt: undefined,
    remarks: undefined
  },
  {
    id: '2',
    userId: '2',
    userName: 'Priya Sharma',
    userEmail: 'priya.sharma@email.com',
    documentType: 'PAN',
    documentNumber: 'ABCDE1234F',
    documentUrl: '/documents/kyc2.pdf',
    status: 'APPROVED',
    reviewedBy: 'Admin User',
    reviewedAt: new Date('2024-01-08'),
    remarks: 'All documents verified successfully'
  },
  {
    id: '3',
    userId: '3',
    userName: 'Amit Singh',
    userEmail: 'amit.singh@email.com',
    documentType: 'AADHAAR',
    documentNumber: '9876-5432-1098',
    documentUrl: '/documents/kyc3.pdf',
    status: 'REJECTED',
    reviewedBy: 'Admin User',
    reviewedAt: new Date('2024-01-07'),
    remarks: 'Document image quality is poor, please resubmit'
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

const getDocumentTypeBadge = (type: string) => {
  const colors = {
    'AADHAAR': 'bg-blue-100 text-blue-800',
    'PAN': 'bg-purple-100 text-purple-800',
    'PASSPORT': 'bg-green-100 text-green-800',
    'DRIVING_LICENSE': 'bg-orange-100 text-orange-800'
  };
  
  return (
    <Badge className={colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800'}>
      {type.replace('_', ' ')}
    </Badge>
  );
};

const columns: ColumnDef<KYCDocument & { userName: string; userEmail: string }>[] = [
  {
    accessorKey: 'userName',
    header: 'User',
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src="" alt={data.userName} />
            <AvatarFallback>
              {data.userName.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{data.userName}</div>
            <div className="text-sm text-muted-foreground">{data.userEmail}</div>
          </div>
        </div>
      );
    }
  },
  {
    accessorKey: 'documentType',
    header: 'Document Type',
    cell: ({ row }) => getDocumentTypeBadge(row.getValue('documentType'))
  },
  {
    accessorKey: 'documentNumber',
    header: 'Document Number',
    cell: ({ row }) => {
      const number = row.getValue('documentNumber') as string;
      return <div className="font-mono text-sm">{number}</div>;
    }
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => getStatusBadge(row.getValue('status'))
  },
  {
    accessorKey: 'reviewedBy',
    header: 'Reviewed By',
    cell: ({ row }) => {
      const reviewedBy = row.getValue('reviewedBy') as string;
      return reviewedBy ? (
        <div className="text-sm">{reviewedBy}</div>
      ) : (
        <div className="text-sm text-muted-foreground">-</div>
      );
    }
  },
  {
    accessorKey: 'reviewedAt',
    header: 'Review Date',
    cell: ({ row }) => {
      const date = row.getValue('reviewedAt') as Date;
      return date ? (
        <div className="text-sm">{format(date, 'MMM dd, yyyy')}</div>
      ) : (
        <div className="text-sm text-muted-foreground">-</div>
      );
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const kyc = row.original;
      
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
              View Document
            </DropdownMenuItem>
            <DropdownMenuItem>
              <FileText className="mr-2 h-4 w-4" />
              User Profile
            </DropdownMenuItem>
            {kyc.status === 'PENDING' && (
              <>
                <DropdownMenuItem>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Approve
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <XCircle className="mr-2 h-4 w-4" />
                  Reject
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
  }
];

export function KYCManagementTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10
  });

  const table = useReactTable({
    data: kycData,
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