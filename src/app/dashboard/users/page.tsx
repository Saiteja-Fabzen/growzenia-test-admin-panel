'use client';

import { Metadata } from 'next';
import { useState } from 'react';
import { UserManagementTable } from '@/components/tables/user-management-table/user-management-table';
import PageContainer from '@/components/layout/page-container';
import { Button } from '@/components/ui/button';
import { Plus, Download, Filter, Maximize2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';

export default function UserManagementPage() {
  const [isMaximized, setIsMaximized] = useState(false);

  return (
    <PageContainer>
      <div className="flex flex-1 flex-col space-y-4">

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">User Management</h1>
            <p className="text-muted-foreground">
              Manage user accounts, KYC verification, and account status
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
                <DropdownMenuItem>Active Users</DropdownMenuItem>
                <DropdownMenuItem>Blocked Users</DropdownMenuItem>
                <DropdownMenuItem>KYC Pending</DropdownMenuItem>
                <DropdownMenuItem>KYC Approved</DropdownMenuItem>
                <DropdownMenuItem>KYC Rejected</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </div>
        </div>

        <UserManagementTable
          isMaximized={isMaximized}
          onMaximizeChange={setIsMaximized}
          searchBar={
            <div className="flex items-center justify-between gap-2">
              <Input
                placeholder="Search users by name, email, or phone..."
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
          }
        />
      </div>
    </PageContainer>
  );
}