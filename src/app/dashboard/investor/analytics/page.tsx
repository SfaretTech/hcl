
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis, Pie, PieChart, Cell } from "recharts"

const areaChartData = Array.from({ length: 30 }, (_, i) => ({
  date: `2024-08-${String(i + 1).padStart(2, '0')}`,
  value: 750000 + (Math.sin(i / 5) * 50000) + (Math.random() * 20000),
}));

const barChartData = [
    { name: "Jan-Apr", "RAFFIM": 4000, "Equity": 2400 },
    { name: "May-Aug", "RAFFIM": 3000, "Equity": 1398 },
    { name: "Sep-Dec", "RAFFIM": 2000, "Equity": 9800 },
];

const pieChartData = [
  { name: 'RAFFIM Program', value: 450000, fill: 'hsl(var(--chart-1))' },
  { name: 'Company Equity', value: 300000, fill: 'hsl(var(--chart-2))' },
]


export default function AnalyticsPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight font-headline">Investment Analytics</h1>
                <p className="text-muted-foreground">Track your portfolio performance and analyze your returns.</p>
            </div>
            
            <div className="grid gap-8 items-start lg:grid-cols-5">
                <div className="lg:col-span-3">
                     <Card className="bg-white">
                        <CardHeader>
                            <CardTitle>Portfolio Value (Last 30 Days)</CardTitle>
                        </CardHeader>
                        <CardContent>
                             <ChartContainer config={{}} className="h-64 w-full">
                                <AreaChart data={areaChartData} margin={{ left: 0, right: 0, top: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                                            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <XAxis dataKey="date" hide />
                                    <ChartTooltip cursor={true} content={<ChartTooltipContent indicator="dot" />} />
                                    <Area type="monotone" dataKey="value" stroke="hsl(var(--primary))" fill="url(#colorValue)" />
                                </AreaChart>
                             </ChartContainer>
                        </CardContent>
                    </Card>
                </div>
                 <div className="lg:col-span-2">
                     <Card className="bg-white">
                        <CardHeader>
                            <CardTitle>Portfolio Allocation</CardTitle>
                        </CardHeader>
                        <CardContent>
                           <ChartContainer config={{}} className="h-64 w-full">
                                <PieChart>
                                    <Pie data={pieChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                                         {pieChartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.fill} />
                                        ))}
                                    </Pie>
                                     <ChartTooltip cursor={true} content={<ChartTooltipContent />} />
                                </PieChart>
                           </ChartContainer>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <Card className="bg-white">
                <CardHeader>
                    <CardTitle>Quarterly Earnings Breakdown</CardTitle>
                    <CardDescription>Comparison of earnings from different investment types.</CardDescription>
                </CardHeader>
                <CardContent>
                     <ChartContainer config={{}} className="h-80 w-full">
                        <BarChart data={barChartData}>
                            <CartesianGrid vertical={false} />
                            <XAxis dataKey="name" />
                            <ChartTooltip cursor={true} content={<ChartTooltipContent />} />
                             <Bar dataKey="RAFFIM" fill="hsl(var(--chart-1))" radius={4} />
                             <Bar dataKey="Equity" fill="hsl(var(--chart-2))" radius={4} />
                        </BarChart>
                    </ChartContainer>
                </CardContent>
            </Card>

        </div>
    );
}
