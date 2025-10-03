import { Metadata } from 'next';
import PageContainer from '@/components/layout/page-container';
import { KYCManagementTable } from '@/components/tables/kyc-management-table/kyc-management-table';
import { Button } from '@/components/ui/button';
import { Download, Filter } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';

export const metadata: Metadata = {
  title: 'KYC Management | Digital Gold Admin',
  description: 'Review and manage KYC document verification requests.'
};

export default function KYCManagementPage() {
  return (
    <PageContainer>
      <div className="flex flex-1 flex-col space-y-4">
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">KYC Management</h1>
            <p className="text-muted-foreground">
              Review and verify user KYC documents
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
                <DropdownMenuItem>Pending Review</DropdownMenuItem>
                <DropdownMenuItem>Approved</DropdownMenuItem>
                <DropdownMenuItem>Rejected</DropdownMenuItem>
                <DropdownMenuItem>Requires Clarification</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Input
            placeholder="Search by user name or document number..."
            className="max-w-sm"
          />
        </div>

        <KYCManagementTable />
      </div>
    </PageContainer>
  );
}