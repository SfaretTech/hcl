
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarDays, Video, MessageSquare, FileText, User, Settings, Bell, LayoutGrid } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';

const ClientDashboard = () => (
    <div className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
                <h1 className="text-3xl font-bold tracking-tight font-headline">Welcome back, Jessica!</h1>
                <p className="text-muted-foreground">Here's your health summary for today.</p>
            </div>
            <Button>
                <Video className="mr-2 h-4 w-4" />
                Start a Consultation
            </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="bg-white">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Upcoming Appointments</CardTitle>
                    <CalendarDays className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">2</div>
                    <p className="text-xs text-muted-foreground">
                        Your next appointment is in 3 days.
                    </p>
                </CardContent>
            </Card>
            <Card className="bg-white">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Unread Messages</CardTitle>
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">5</div>
                    <p className="text-xs text-muted-foreground">
                        From Dr. Chen and HCOM Support.
                    </p>
                </CardContent>
            </Card>
            <Card className="bg-white">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Health Records</CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">12</div>
                    <p className="text-xs text-muted-foreground">
                        Prescriptions, lab results, and more.
                    </p>
                </CardContent>
            </Card>
        </div>

        <Card className="bg-white">
            <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="space-y-4">
                    <li className="flex items-center gap-4">
                        <Avatar>
                            <AvatarImage src="https://placehold.co/40x40.png" alt="Dr. Samuel Chen" />
                            <AvatarFallback>SC</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <p className="font-medium">New message from <span className="text-primary">Dr. Samuel Chen</span></p>
                            <p className="text-sm text-muted-foreground">"Please find your test results attached..."</p>
                        </div>
                        <Badge variant="secondary">Message</Badge>
                    </li>
                    <li className="flex items-center gap-4">
                         <Avatar>
                            <AvatarFallback className="bg-primary/20 text-primary"><CalendarDays/></AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <p className="font-medium">Appointment Confirmed</p>
                            <p className="text-sm text-muted-foreground">Follow-up with Dr. Amina Khan on Oct 28, 2024</p>
                        </div>
                        <Badge variant="outline">Appointment</Badge>
                    </li>
                </ul>
            </CardContent>
             <CardFooter>
                <Button variant="outline" className="w-full">View All Activity</Button>
            </CardFooter>
        </Card>
    </div>
);


const ProfessionalDashboard = () => (
     <div className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
                <h1 className="text-3xl font-bold tracking-tight font-headline">Welcome back, Dr. Chen!</h1>
                <p className="text-muted-foreground">Here's a summary of your schedule and patients.</p>
            </div>
             <Link href="/dashboard/schedule">
                <Button>
                    <CalendarDays className="mr-2 h-4 w-4" />
                    View Full Schedule
                </Button>
            </Link>
        </div>
         <div className="text-center p-16 border-2 border-dashed rounded-lg">
            <h2 className="text-2xl font-bold font-headline mb-2">Professional Dashboard</h2>
            <p className="text-muted-foreground">Coming soon! This is where you'll manage your appointments, patients, and more.</p>
        </div>
    </div>
)

const InvestorDashboard = () => (
     <div className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
                <h1 className="text-3xl font-bold tracking-tight font-headline">Welcome back, Adaeze!</h1>
                <p className="text-muted-foreground">Here's your RAFFIM investment overview.</p>
            </div>
             <Link href="/dashboard/investments">
                <Button>
                    Manage Investments
                </Button>
            </Link>
        </div>
        <div className="text-center p-16 border-2 border-dashed rounded-lg">
            <h2 className="text-2xl font-bold font-headline mb-2">Investor Dashboard</h2>
            <p className="text-muted-foreground">Coming soon! Track your portfolio, earnings, and impact.</p>
        </div>
    </div>
)

export default function DashboardPage() {
    return (
        <Tabs defaultValue="client" className="w-full">
            <div className="flex justify-between items-center mb-6">
                 <TabsList>
                    <TabsTrigger value="client">Client View</TabsTrigger>
                    <TabsTrigger value="professional">Professional View</TabsTrigger>
                    <TabsTrigger value="investor">Investor View</TabsTrigger>
                </TabsList>
            </div>
            
            <TabsContent value="client">
                <ClientDashboard />
            </TabsContent>
            <TabsContent value="professional">
                <ProfessionalDashboard />
            </TabsContent>
            <TabsContent value="investor">
                <InvestorDashboard />
            </TabsContent>
        </Tabs>
    );
}
