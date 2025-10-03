import { Metadata } from 'next';
import PageContainer from '@/components/layout/page-container';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardAction, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, BarChart3 } from 'lucide-react';
import { DatePickerWithRange } from '@/components/ui/date-range-picker';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { IconTrendingUp, IconTrendingDown } from '@tabler/icons-react';

export const metadata: Metadata = {
  title: 'Gold Reports | Digital Gold Admin',
  description: 'Comprehensive gold purchase and sales analytics.'
};

export default function GoldReportsPage() {
  return (
    <PageContainer>
      <div className="flex flex-1 flex-col space-y-6">
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Gold Purchase Reports</h1>
            <p className="text-muted-foreground">
              Analyze gold purchase trends, user behavior, and revenue metrics
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <DatePickerWithRange />
            <Select defaultValue="daily">
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs md:grid-cols-2 lg:grid-cols-4">
          <Card className="@container/card">
            <CardHeader>
              <CardDescription>Total Revenue</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                ₹45.6L
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
                Strong revenue growth <IconTrendingUp className="size-4" />
              </div>
              <div className="text-muted-foreground">
                +12.5% from last month
              </div>
            </CardFooter>
          </Card>

          <Card className="@container/card">
            <CardHeader>
              <CardDescription>Gold Sold</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                842.3g
              </CardTitle>
              <CardAction>
                <Badge variant="outline">
                  <IconTrendingUp />
                  +8.2%
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                Increasing volume <IconTrendingUp className="size-4" />
              </div>
              <div className="text-muted-foreground">
                +8.2% from last month
              </div>
            </CardFooter>
          </Card>

          <Card className="@container/card">
            <CardHeader>
              <CardDescription>Avg. Purchase</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                ₹3,250
              </CardTitle>
              <CardAction>
                <Badge variant="outline">
                  <IconTrendingDown />
                  -2.1%
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                Slight decrease <IconTrendingDown className="size-4" />
              </div>
              <div className="text-muted-foreground">
                -2.1% from last month
              </div>
            </CardFooter>
          </Card>

          <Card className="@container/card">
            <CardHeader>
              <CardDescription>Transactions</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                1,406
              </CardTitle>
              <CardAction>
                <Badge variant="outline">
                  <IconTrendingUp />
                  +15.3%
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                High transaction volume <IconTrendingUp className="size-4" />
              </div>
              <div className="text-muted-foreground">
                +15.3% from last month
              </div>
            </CardFooter>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Daily Gold Sales</CardTitle>
              <CardDescription>Gold purchase volume over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center bg-muted/20 rounded-lg">
                <div className="text-center text-muted-foreground">
                  <BarChart3 className="h-12 w-12 mx-auto mb-4" />
                  <p>Chart visualization would go here</p>
                  <p className="text-sm">Integration with Recharts or similar library</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Revenue Breakdown</CardTitle>
              <CardDescription>Revenue distribution by source</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center bg-muted/20 rounded-lg">
                <div className="text-center text-muted-foreground">
                  <BarChart3 className="h-12 w-12 mx-auto mb-4" />
                  <p>Pie chart visualization would go here</p>
                  <p className="text-sm">Integration with Recharts or similar library</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Performers */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Top Purchasing Users</CardTitle>
              <CardDescription>Users with highest gold purchases this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Rajesh Kumar", amount: "₹45,000", weight: "8.3g", rank: 1 },
                  { name: "Priya Sharma", amount: "₹38,500", weight: "7.1g", rank: 2 },
                  { name: "Amit Singh", amount: "₹32,000", weight: "5.9g", rank: 3 },
                  { name: "Sneha Patel", amount: "₹28,750", weight: "5.3g", rank: 4 },
                  { name: "Vikram Shah", amount: "₹25,600", weight: "4.7g", rank: 5 }
                ].map((user, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Badge variant={user.rank <= 3 ? "default" : "secondary"}>
                        #{user.rank}
                      </Badge>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">{user.weight}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{user.amount}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Daily Performance</CardTitle>
              <CardDescription>Gold sales performance by day</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { day: "Monday", transactions: 156, amount: "₹8.4L", growth: "+12%" },
                  { day: "Tuesday", transactions: 189, amount: "₹10.2L", growth: "+18%" },
                  { day: "Wednesday", transactions: 134, amount: "₹7.1L", growth: "-8%" },
                  { day: "Thursday", transactions: 201, amount: "₹11.8L", growth: "+25%" },
                  { day: "Friday", transactions: 167, amount: "₹9.3L", growth: "+6%" }
                ].map((day, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">{day.day}</div>
                      <div className="text-sm text-muted-foreground">
                        {day.transactions} transactions
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{day.amount}</div>
                      <div className={`text-sm ${
                        day.growth.startsWith('+') ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {day.growth}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Market Insights */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Market Insights</CardTitle>
            <CardDescription>Gold market trends and user behavior analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="p-4 border rounded-lg">
                <div className="text-2xl font-bold text-green-600">Peak Hours</div>
                <div className="text-sm text-muted-foreground mt-1">
                  10 AM - 12 PM shows highest purchase activity
                </div>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="text-2xl font-bold text-blue-600">Avg. Holding</div>
                <div className="text-sm text-muted-foreground mt-1">
                  Users hold gold for average 45 days before selling
                </div>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="text-2xl font-bold text-purple-600">Price Sensitivity</div>
                <div className="text-sm text-muted-foreground mt-1">
                  20% increase in purchases when price drops ₹100/gram
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}