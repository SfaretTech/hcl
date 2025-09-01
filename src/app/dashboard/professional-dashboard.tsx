
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarDays, Users, Activity, MessageSquare, ChevronRight } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export default function ProfessionalDashboard() {
    const recentPatients = [
        { name: 'Jessica Peterson', avatar: 'https://placehold.co/100x100.png', reason: 'Annual Check-up', time: '11:00 AM' },
        { name: 'David Lee', avatar: 'https://placehold.co/100x100.png', reason: 'Follow-up', time: '1:30 PM' },
        { name: 'Aisha Bello', avatar: 'https://placehold.co/100x100.png', reason: 'New Consultation', time: '3:00 PM' },
    ];
    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight font-headline">Welcome back, Dr. Chen!</h1>
                    <p className="text-muted-foreground">Here is a summary of your activities for today.</p>
                </div>
                <Button size="lg">
                    <CalendarDays className="mr-2 h-5 w-5" />
                    View Full Schedule
                </Button>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card className="bg-white">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1,254</div>
                        <p className="text-xs text-muted-foreground">+20 since last month</p>
                    </CardContent>
                </Card>
                <Card className="bg-white">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Appointments Today</CardTitle>
                        <CalendarDays className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12</div>
                        <p className="text-xs text-muted-foreground">3 upcoming</p>
                    </CardContent>
                </Card>
                 <Card className="bg-white">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Unread Messages</CardTitle>
                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">8</div>
                        <p className="text-xs text-muted-foreground">From 5 patients</p>
                    </CardContent>
                </Card>
                 <Card className="bg-white">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Consultation Hours</CardTitle>
                        <Activity className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">28.5</div>
                        <p className="text-xs text-muted-foreground">This week</p>
                    </CardContent>
                </Card>
            </div>

            <Card className="bg-white">
                <CardHeader>
                    <CardTitle>Today's Appointments</CardTitle>
                    <CardDescription>A list of your scheduled patient consultations for today.</CardDescription>
                </CardHeader>
                <CardContent>
                     <ul className="space-y-4">
                        {recentPatients.map(patient => (
                            <li key={patient.name} className="flex items-center gap-4 p-3 rounded-lg bg-background hover:bg-secondary/80">
                                <Avatar className="h-10 w-10">
                                    <AvatarImage src={patient.avatar} />
                                    <AvatarFallback>{patient.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <p className="font-semibold">{patient.name}</p>
                                    <p className="text-sm text-muted-foreground">{patient.reason}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-medium">{patient.time}</p>
                                     <Badge variant="outline" className="mt-1">Confirmed</Badge>
                                </div>
                                <Button variant="ghost" size="icon">
                                    <ChevronRight className="h-5 w-5" />
                                </Button>
                            </li>
                        ))}
                    </ul>
                </CardContent>
                <CardFooter>
                    <Button variant="outline" className="w-full">
                        View All Appointments
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};
