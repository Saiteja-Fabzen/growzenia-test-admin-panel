import { Metadata } from 'next';
import PageContainer from '@/components/layout/page-container';
import { LuckyDrawTable } from '@/components/tables/lucky-draw-table/lucky-draw-table';
import { Button } from '@/components/ui/button';
import { Plus, Download, Filter } from 'lucide-react';
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
  title: 'Lucky Draw Management | Digital Gold Admin',
  description: 'Manage lucky draws, entries, and winner selections.'
};

export default function LuckyDrawManagementPage() {
  return (
    <PageContainer>
      <div className="flex flex-1 flex-col space-y-4">
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Lucky Draw Management</h1>
            <p className="text-muted-foreground">
              Create and manage lucky draws across different categories
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
                <DropdownMenuItem>Active Draws</DropdownMenuItem>
                <DropdownMenuItem>Scheduled Draws</DropdownMenuItem>
                <DropdownMenuItem>Completed Draws</DropdownMenuItem>
                <DropdownMenuItem>Bronze Category</DropdownMenuItem>
                <DropdownMenuItem>Silver Category</DropdownMenuItem>
                <DropdownMenuItem>Gold Category</DropdownMenuItem>
                <DropdownMenuItem>Diamond Category</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Create Draw
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs md:grid-cols-2 lg:grid-cols-4">
          <Card className="@container/card">
            <CardHeader>
              <CardDescription>Active Draws</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                12
              </CardTitle>
              <CardAction>
                <Badge variant="outline">
                  <IconTrendingUp />
                  Live
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                Multiple categories
              </div>
              <div className="text-muted-foreground">
                Across all categories
              </div>
            </CardFooter>
          </Card>

          <Card className="@container/card">
            <CardHeader>
              <CardDescription>This Month Payouts</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                ₹2.4L
              </CardTitle>
              <CardAction>
                <Badge variant="outline">
                  <IconTrendingUp />
                  +25%
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                Strong growth <IconTrendingUp className="size-4" />
              </div>
              <div className="text-muted-foreground">
                Total distributed
              </div>
            </CardFooter>
          </Card>
        </div>

        <div className="flex items-center space-x-2">
          <Input
            placeholder="Search draws by title or category..."
            className="max-w-sm"
          />
        </div>

        <LuckyDrawTable />
      </div>
    </PageContainer>
  );
}