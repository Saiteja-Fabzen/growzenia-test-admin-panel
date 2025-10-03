'use client';

import * as React from 'react';
import { IconTrendingUp } from '@tabler/icons-react';
import { Label, Pie, PieChart } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';

const chartData = [
  { category: 'gold', purchases: 3250, fill: 'var(--primary)' },
  { category: 'sip', purchases: 2180, fill: 'var(--primary-light)' },
  { category: 'deposits', purchases: 1890, fill: 'var(--primary-lighter)' },
  { category: 'withdrawals', purchases: 1420, fill: 'var(--primary-dark)' },
  { category: 'lucky_draws', purchases: 980, fill: 'var(--primary-darker)' }
];

const chartConfig = {
  purchases: {
    label: 'Transactions'
  },
  gold: {
    label: 'Gold Purchases',
    color: 'var(--primary)'
  },
  sip: {
    label: 'SIP Investments',
    color: 'var(--primary)'
  },
  deposits: {
    label: 'Deposits',
    color: 'var(--primary)'
  },
  withdrawals: {
    label: 'Withdrawals',
    color: 'var(--primary)'
  },
  lucky_draws: {
    label: 'Lucky Draw Entries',
    color: 'var(--primary)'
  }
} satisfies ChartConfig;

export function PieGraph() {
  const totalTransactions = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.purchases, 0);
  }, []);

  return (
    <Card className='@container/card'>
      <CardHeader>
        <CardTitle>Transaction Distribution</CardTitle>
        <CardDescription>
          <span className='hidden @[540px]/card:block'>
            Transaction breakdown by category for the last 6 months
          </span>
          <span className='@[540px]/card:hidden'>Transaction types</span>
        </CardDescription>
      </CardHeader>
      <CardContent className='px-2 pt-4 sm:px-6 sm:pt-6'>
        <ChartContainer
          config={chartConfig}
          className='mx-auto aspect-square h-[250px]'
        >
          <PieChart>
            <defs>
              {['gold', 'sip', 'deposits', 'withdrawals', 'lucky_draws'].map(
                (category, index) => (
                  <linearGradient
                    key={category}
                    id={`fill${category}`}
                    x1='0'
                    y1='0'
                    x2='0'
                    y2='1'
                  >
                    <stop
                      offset='0%'
                      stopColor='var(--primary)'
                      stopOpacity={1 - index * 0.15}
                    />
                    <stop
                      offset='100%'
                      stopColor='var(--primary)'
                      stopOpacity={0.8 - index * 0.15}
                    />
                  </linearGradient>
                )
              )}
            </defs>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData.map((item) => ({
                ...item,
                fill: `url(#fill${item.category})`
              }))}
              dataKey='purchases'
              nameKey='category'
              innerRadius={60}
              strokeWidth={2}
              stroke='var(--background)'
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor='middle'
                        dominantBaseline='middle'
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className='fill-foreground text-3xl font-bold'
                        >
                          {totalTransactions.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className='fill-muted-foreground text-sm'
                        >
                          Total Transactions
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className='flex-col gap-2 text-sm'>
        <div className='flex items-center gap-2 leading-none font-medium'>
          Gold Purchases lead with{' '}
          {((chartData[0].purchases / totalTransactions) * 100).toFixed(1)}%{' '}
          <IconTrendingUp className='h-4 w-4' />
        </div>
        <div className='text-muted-foreground leading-none'>
          Based on data from January - June 2024
        </div>
      </CardFooter>
    </Card>
  );
}
