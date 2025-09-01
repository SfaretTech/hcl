
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DollarSign, TrendingUp, Users, ArrowRight, PieChart, Wallet, ChevronRight, FileText } from 'lucide-react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
]

const chartConfig = {
  desktop: {
    label: "Value",
    color: "hsl(var(--primary))",
  },
}

const recentTransactions = [
    { type: 'Deposit', amount: 500000, status: 'Completed', date: '2024-08-28' },
    { type: 'Investment', amount: -250000, status: 'Processed', date: '2024-08-25' },
    { type: 'Withdrawal', amount: -50000, status: 'Pending', date: '2024-08-22' },
    { type: 'Dividend', amount: 12500, status: 'Completed', date: '2024-08-20' },
];

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(amount);
}

export default function InvestorDashboard() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">Welcome back, Alex!</h1>
          <p className="text-muted-foreground">Here's a summary of your investment portfolio.</p>
        </div>
        <Button size="lg" asChild>
          <Link href="/dashboard/investor/investments">
            <DollarSign className="mr-2 h-5 w-5" />
            Explore Investments
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Investment Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(750000)}</div>
            <p className="text-xs text-muted-foreground">+15.2% since last month</p>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Portfolio Performance (30d)</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">+8.5%</div>
            <p className="text-xs text-muted-foreground">All-time return: +23.1%</p>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Available to Invest</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(250000)}</div>
            <p className="text-xs text-muted-foreground">In your HCOM Wallet</p>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Investments</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">2 in RAFFIM, 1 in Shares</p>
          </CardContent>
        </Card>
      </div>

       <div className="grid gap-8 lg:grid-cols-5 items-start">
            <div className="lg:col-span-3">
                <Card className="bg-white">
                    <CardHeader>
                        <CardTitle>Portfolio Value Over Time</CardTitle>
                        <CardDescription>A look at your portfolio's growth over the last 6 months.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <ChartContainer config={chartConfig} className="h-[250px] w-full">
                            <AreaChart data={chartData} margin={{ left: 12, right: 12 }}>
                                <CartesianGrid vertical={false} />
                                <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => value.slice(0, 3)} />
                                <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
                                <Area dataKey="desktop" type="natural" fill="var(--color-desktop)" fillOpacity={0.4} stroke="var(--color-desktop)" />
                            </AreaChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
            </div>
            <div className="lg:col-span-2">
                <Card className="bg-white">
                    <CardHeader>
                        <CardTitle>Recent Transactions</CardTitle>
                        <CardDescription>Your latest financial activities.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-4">
                            {recentTransactions.map((tx, index) => (
                                <li key={index} className="flex items-center gap-4">
                                    <div className="p-2 bg-secondary rounded-full">
                                        {tx.amount > 0 ? <TrendingUp className="w-5 h-5 text-green-600"/> : <TrendingUp className="w-5 h-5 text-red-600 rotate-90"/>}
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold">{tx.type}</p>
                                        <p className="text-sm text-muted-foreground">{tx.date}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className={cn("font-bold", tx.amount > 0 ? "text-green-600" : "text-foreground")}>{formatCurrency(tx.amount)}</p>
                                        <Badge variant={tx.status === 'Completed' ? 'secondary' : (tx.status === 'Processed' ? 'default' : 'outline')}>{tx.status}</Badge>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <Button asChild variant="outline" className="w-full">
                            <Link href="/dashboard/investor/wallet">
                                View All Transactions <ArrowRight className="ml-2 h-4 w-4"/>
                            </Link>
                        </Button>
                    </CardFooter>
                </Card>
            </div>
       </div>

    </div>
  );
}
