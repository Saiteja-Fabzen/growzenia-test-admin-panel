'use client';

import * as React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';

export const description = 'An interactive bar chart';

const chartData = [
  { date: '2024-04-01', deposits: 45000, withdrawals: 15000 },
  { date: '2024-04-02', deposits: 52000, withdrawals: 18000 },
  { date: '2024-04-03', deposits: 38000, withdrawals: 12000 },
  { date: '2024-04-04', deposits: 67000, withdrawals: 25000 },
  { date: '2024-04-05', deposits: 71000, withdrawals: 28000 },
  { date: '2024-04-06', deposits: 58000, withdrawals: 22000 },
  { date: '2024-04-07', deposits: 43000, withdrawals: 16000 },
  { date: '2024-04-08', deposits: 79000, withdrawals: 31000 },
  { date: '2024-04-09', deposits: 35000, withdrawals: 11000 },
  { date: '2024-04-10', deposits: 64000, withdrawals: 19000 },
  { date: '2024-04-11', deposits: 72000, withdrawals: 35000 },
  { date: '2024-04-12', deposits: 55000, withdrawals: 21000 },
  { date: '2024-04-13', deposits: 68000, withdrawals: 38000 },
  { date: '2024-04-14', deposits: 42000, withdrawals: 22000 },
  { date: '2024-04-15', deposits: 39000, withdrawals: 17000 },
  { date: '2024-04-16', deposits: 41000, withdrawals: 19000 },
  { date: '2024-04-17', deposits: 83000, withdrawals: 36000 },
  { date: '2024-04-18', deposits: 74000, withdrawals: 41000 },
  { date: '2024-04-19', deposits: 51000, withdrawals: 18000 },
  { date: '2024-04-20', deposits: 33000, withdrawals: 15000 },
  { date: '2024-04-21', deposits: 40000, withdrawals: 20000 },
  { date: '2024-04-22', deposits: 48000, withdrawals: 17000 },
  { date: '2024-04-23', deposits: 41000, withdrawals: 23000 },
  { date: '2024-04-24', deposits: 76000, withdrawals: 29000 },
  { date: '2024-04-25', deposits: 49000, withdrawals: 25000 },
  { date: '2024-04-26', deposits: 28000, withdrawals: 13000 },
  { date: '2024-04-27', deposits: 78000, withdrawals: 42000 },
  { date: '2024-04-28', deposits: 37000, withdrawals: 18000 },
  { date: '2024-04-29', deposits: 63000, withdrawals: 24000 },
  { date: '2024-04-30', deposits: 85000, withdrawals: 38000 },
  { date: '2024-05-01', deposits: 44000, withdrawals: 22000 },
  { date: '2024-05-02', deposits: 59000, withdrawals: 31000 },
  { date: '2024-05-03', deposits: 51000, withdrawals: 19000 },
  { date: '2024-05-04', deposits: 77000, withdrawals: 42000 },
  { date: '2024-05-05', deposits: 88000, withdrawals: 39000 },
  { date: '2024-05-06', deposits: 92000, withdrawals: 52000 },
  { date: '2024-05-07', deposits: 75000, withdrawals: 30000 },
  { date: '2024-05-08', deposits: 43000, withdrawals: 21000 },
  { date: '2024-05-09', deposits: 48000, withdrawals: 18000 },
  { date: '2024-05-10', deposits: 59000, withdrawals: 33000 },
  { date: '2024-05-11', deposits: 66000, withdrawals: 27000 },
  { date: '2024-05-12', deposits: 46000, withdrawals: 24000 },
  { date: '2024-05-13', deposits: 46000, withdrawals: 16000 },
  { date: '2024-05-14', deposits: 84000, withdrawals: 49000 },
  { date: '2024-05-15', deposits: 87000, withdrawals: 38000 },
  { date: '2024-05-16', deposits: 67000, withdrawals: 40000 },
  { date: '2024-05-17', deposits: 91000, withdrawals: 42000 },
  { date: '2024-05-18', deposits: 63000, withdrawals: 35000 },
  { date: '2024-05-19', deposits: 50000, withdrawals: 18000 },
  { date: '2024-05-20', deposits: 44000, withdrawals: 23000 },
  { date: '2024-05-21', deposits: 31000, withdrawals: 14000 },
  { date: '2024-05-22', deposits: 30000, withdrawals: 12000 },
  { date: '2024-05-23', deposits: 53000, withdrawals: 29000 },
  { date: '2024-05-24', deposits: 58000, withdrawals: 22000 },
  { date: '2024-05-25', deposits: 47000, withdrawals: 25000 },
  { date: '2024-05-26', deposits: 49000, withdrawals: 17000 },
  { date: '2024-05-27', deposits: 80000, withdrawals: 46000 },
  { date: '2024-05-28', deposits: 50000, withdrawals: 19000 },
  { date: '2024-05-29', deposits: 29000, withdrawals: 13000 },
  { date: '2024-05-30', deposits: 67000, withdrawals: 28000 },
  { date: '2024-05-31', deposits: 44000, withdrawals: 23000 },
  { date: '2024-06-01', deposits: 44000, withdrawals: 20000 },
  { date: '2024-06-02', deposits: 86000, withdrawals: 41000 },
  { date: '2024-06-03', deposits: 35000, withdrawals: 16000 },
  { date: '2024-06-04', deposits: 82000, withdrawals: 38000 },
  { date: '2024-06-05', deposits: 32000, withdrawals: 14000 },
  { date: '2024-06-06', deposits: 58000, withdrawals: 25000 },
  { date: '2024-06-07', deposits: 64000, withdrawals: 37000 },
  { date: '2024-06-08', deposits: 75000, withdrawals: 32000 },
  { date: '2024-06-09', deposits: 82000, withdrawals: 48000 },
  { date: '2024-06-10', deposits: 43000, withdrawals: 20000 },
  { date: '2024-06-11', deposits: 33000, withdrawals: 15000 },
  { date: '2024-06-12', deposits: 90000, withdrawals: 42000 },
  { date: '2024-06-13', deposits: 30000, withdrawals: 13000 },
  { date: '2024-06-14', deposits: 81000, withdrawals: 38000 },
  { date: '2024-06-15', deposits: 62000, withdrawals: 35000 },
  { date: '2024-06-16', deposits: 73000, withdrawals: 31000 },
  { date: '2024-06-17', deposits: 87000, withdrawals: 52000 },
  { date: '2024-06-18', deposits: 36000, withdrawals: 17000 },
  { date: '2024-06-19', deposits: 67000, withdrawals: 29000 },
  { date: '2024-06-20', deposits: 79000, withdrawals: 45000 },
  { date: '2024-06-21', deposits: 44000, withdrawals: 21000 },
  { date: '2024-06-22', deposits: 63000, withdrawals: 27000 },
  { date: '2024-06-23', deposits: 88000, withdrawals: 53000 },
  { date: '2024-06-24', deposits: 40000, withdrawals: 18000 },
  { date: '2024-06-25', deposits: 42000, withdrawals: 19000 },
  { date: '2024-06-26', deposits: 81000, withdrawals: 38000 },
  { date: '2024-06-27', deposits: 84000, withdrawals: 49000 },
  { date: '2024-06-28', deposits: 43000, withdrawals: 20000 },
  { date: '2024-06-29', deposits: 35000, withdrawals: 16000 },
  { date: '2024-06-30', deposits: 83000, withdrawals: 40000 }
];

const chartConfig = {
  views: {
    label: 'Transactions'
  },
  deposits: {
    label: 'Deposits',
    color: 'var(--primary)'
  },
  withdrawals: {
    label: 'Withdrawals',
    color: 'var(--primary)'
  },
  error: {
    label: 'Error',
    color: 'var(--primary)'
  }
} satisfies ChartConfig;

export function BarGraph() {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>('deposits');

  const total = React.useMemo(
    () => ({
      deposits: chartData.reduce((acc, curr) => acc + curr.deposits, 0),
      withdrawals: chartData.reduce((acc, curr) => acc + curr.withdrawals, 0)
    }),
    []
  );

  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  React.useEffect(() => {
    if (activeChart === 'error') {
      throw new Error('Mocking Error');
    }
  }, [activeChart]);

  if (!isClient) {
    return null;
  }

  return (
    <Card className='@container/card !pt-3'>
      <CardHeader className='flex flex-col items-stretch space-y-0 border-b !p-0 sm:flex-row'>
        <div className='flex flex-1 flex-col justify-center gap-1 px-6 !py-0'>
          <CardTitle>Deposits vs Withdrawals</CardTitle>
          <CardDescription>
            <span className='hidden @[540px]/card:block'>
              Payment transactions for the last 3 months
            </span>
            <span className='@[540px]/card:hidden'>Last 3 months</span>
          </CardDescription>
        </div>
        <div className='flex'>
          {['deposits', 'withdrawals', 'error'].map((key) => {
            const chart = key as keyof typeof chartConfig;
            if (!chart || total[key as keyof typeof total] === 0) return null;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className='data-[active=true]:bg-primary/5 hover:bg-primary/5 relative flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left transition-colors duration-200 even:border-l sm:border-t-0 sm:border-l sm:px-8 sm:py-6'
                onClick={() => setActiveChart(chart)}
              >
                <span className='text-muted-foreground text-xs'>
                  {chartConfig[chart].label}
                </span>
                <span className='text-lg leading-none font-bold sm:text-3xl'>
                  ₹{(total[key as keyof typeof total] / 1000)?.toLocaleString()}K
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className='px-2 pt-4 sm:px-6 sm:pt-6'>
        <ChartContainer
          config={chartConfig}
          className='aspect-auto h-[250px] w-full'
        >
          <BarChart
            data={chartData}
            margin={{
              left: 12,
              right: 12
            }}
          >
            <defs>
              <linearGradient id='fillBar' x1='0' y1='0' x2='0' y2='1'>
                <stop
                  offset='0%'
                  stopColor='var(--primary)'
                  stopOpacity={0.8}
                />
                <stop
                  offset='100%'
                  stopColor='var(--primary)'
                  stopOpacity={0.2}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='date'
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric'
                });
              }}
            />
            <ChartTooltip
              cursor={{ fill: 'var(--primary)', opacity: 0.1 }}
              content={
                <ChartTooltipContent
                  className='w-[150px]'
                  nameKey='views'
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    });
                  }}
                />
              }
            />
            <Bar
              dataKey={activeChart}
              fill='url(#fillBar)'
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
