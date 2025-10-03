import { Metadata } from 'next';
import PageContainer from '@/components/layout/page-container';
import { SIPManagementTable } from '@/components/tables/sip-management-table/sip-management-table';
import { Button } from '@/components/ui/button';
import { Download, Filter } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardAction, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { IconTrendingUp } from '@tabler/icons-react';

export const metadata: Metadata = {
  title: 'SIP Management | Digital Gold Admin',
  description: 'Monitor and manage Systematic Investment Plans (SIPs).'
};

export default function SIPManagementPage() {
  return (
    <PageContainer>
      <div className="flex flex-1 flex-col space-y-4">
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">SIP Management</h1>
            <p className="text-muted-foreground">
              Monitor daily SIPs, auto-debit status, and performance tracking
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
                <DropdownMenuItem>Active SIPs</DropdownMenuItem>
                <DropdownMenuItem>Paused SIPs</DropdownMenuItem>
                <DropdownMenuItem>Cancelled SIPs</DropdownMenuItem>
                <DropdownMenuItem>Auto-debit Failed</DropdownMenuItem>
                <DropdownMenuItem>High Performers</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs md:grid-cols-2 lg:grid-cols-4">
          <Card className="@container/card">
            <CardHeader>
              <CardDescription>Active SIPs</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                3,456
              </CardTitle>
              <CardAction>
                <Badge variant="outline">
                  <IconTrendingUp />
                  +12.5%
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                Growing adoption <IconTrendingUp className="size-4" />
              </div>
              <div className="text-muted-foreground">
                +12.5% from last month
              </div>
            </CardFooter>
          </Card>

          <Card className="@container/card">
            <CardHeader>
              <CardDescription>Daily Collection</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                ₹8.7L
              </CardTitle>
              <CardAction>
                <Badge variant="outline">
                  <IconTrendingUp />
                  Today
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                Strong collections <IconTrendingUp className="size-4" />
              </div>
              <div className="text-muted-foreground">
                Today&apos;s auto-debit
              </div>
            </CardFooter>
          </Card>

          <Card className="@container/card">
            <CardHeader>
              <CardDescription>Success Rate</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                96.8%
              </CardTitle>
              <CardAction>
                <Badge variant="outline">
                  <IconTrendingUp />
                  Excellent
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                High reliability <IconTrendingUp className="size-4" />
              </div>
              <div className="text-muted-foreground">
                Auto-debit success
              </div>
            </CardFooter>
          </Card>

          <Card className="@container/card">
            <CardHeader>
              <CardDescription>Total Rewards</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                ₹2.1L
              </CardTitle>
              <CardAction>
                <Badge variant="outline">
                  <IconTrendingUp />
                  +18%
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                Incentives paid <IconTrendingUp className="size-4" />
              </div>
              <div className="text-muted-foreground">
                Distributed this month
              </div>
            </CardFooter>
          </Card>
        </div>

        <div className="flex items-center space-x-2">
          <Input
            placeholder="Search by user name or SIP amount..."
            className="max-w-sm"
          />
        </div>

        <SIPManagementTable />
      </div>
    </PageContainer>
  );
}