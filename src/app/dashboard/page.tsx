
'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarDays, Video, MessageSquare, FileText, User, Bell, ChevronRight, CheckCircle2, ArrowRight, ShoppingCart, Users, Activity, Briefcase } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';


const ClientDashboard = () => (
    <div className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
                <h1 className="text-3xl font-bold tracking-tight font-headline">Welcome back, Jessica!</h1>
                <p className="text-muted-foreground">Here's a look at your health dashboard. Stay healthy!</p>
            </div>
             <Button size="lg">
                <Video className="mr-2 h-5 w-5" />
                Start a Video Consultation
            </Button>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
           {/* Main column */}
           <div className="lg:col-span-2 space-y-8">
               <Card className="bg-gradient-to-br from-primary/80 to-primary text-primary-foreground border-primary/20 shadow-2xl shadow-primary/20">
                    <CardHeader>
                         <div className="flex items-center gap-4">
                            <Avatar className="w-16 h-16 border-2 border-white">
                                <AvatarImage src="https://placehold.co/100x100.png" alt="Dr. Samuel Chen" />
                                <AvatarFallback>SC</AvatarFallback>
                            </Avatar>
                            <div>
                                <CardDescription className="text-primary-foreground/80">Your Next Appointment</CardDescription>
                                <CardTitle className="text-2xl font-bold">Follow-up with Dr. Samuel Chen</CardTitle>
                            </div>
                         </div>
                    </CardHeader>
                    <CardContent className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-2">
                        <div className="flex items-center gap-3">
                            <CalendarDays className="h-5 w-5"/>
                            <p className="font-semibold">Monday, August 26, 2024 at 11:00 AM</p>
                        </div>
                        <Button asChild variant="secondary" className="bg-white text-primary hover:bg-white/90">
                           <Link href="/dashboard/appointments">
                             Manage Appointment <ChevronRight className="ml-2 h-4 w-4"/>
                           </Link>
                        </Button>
                    </CardContent>
                </Card>
                
                <Card className="bg-white">
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                        <CardDescription>An overview of your recent interactions with HCOM.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-6">
                            <li className="flex items-start gap-4">
                                 <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                                    <MessageSquare className="h-5 w-5 text-primary" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium">New message from <span className="text-primary">Dr. Samuel Chen</span></p>
                                    <p className="text-sm text-muted-foreground line-clamp-2">"Hi Jessica, please find your latest test results attached. Let's discuss them during our next appointment..."</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0 mt-1">
                                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium">Prescription Refilled</p>
                                    <p className="text-sm text-muted-foreground">Your prescription for Vitamin D has been refilled and is ready for pickup.</p>
                                </div>
                                 <div className="text-right">
                                    <p className="text-xs text-muted-foreground mt-1">1 day ago</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                 <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0 mt-1">
                                    <CalendarDays className="h-5 w-5 text-blue-600"/>
                                 </div>
                                <div className="flex-1">
                                    <p className="font-medium">Appointment Confirmed</p>
                                    <p className="text-sm text-muted-foreground">Follow-up with Dr. Amina Khan on Oct 28, 2024</p>
                                </div>
                                 <div className="text-right">
                                    <p className="text-xs text-muted-foreground mt-1">3 days ago</p>
                                </div>
                            </li>
                        </ul>
                    </CardContent>
                    <CardFooter>
                       <Button variant="outline" className="w-full">
                         View All Activity <ArrowRight className="ml-2 h-4 w-4"/>
                       </Button>
                    </CardFooter>
                </Card>
           </div>
           
           {/* Side column */}
           <div className="lg:col-span-1 space-y-8">
                 <Card className="bg-white">
                    <CardHeader>
                        <CardTitle>Quick Access</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                         <Link href="/dashboard/messages" className="block p-4 rounded-lg bg-background hover:bg-secondary transition-colors">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                     <div className="p-3 rounded-full bg-primary/10 text-primary">
                                       <MessageSquare className="h-5 w-5" />
                                     </div>
                                     <div>
                                        <p className="font-semibold">Messages</p>
                                        <p className="text-sm text-muted-foreground">5 unread</p>
                                     </div>
                                </div>
                                <ChevronRight className="h-5 w-5 text-muted-foreground" />
                            </div>
                        </Link>
                         <Link href="/dashboard/records" className="block p-4 rounded-lg bg-background hover:bg-secondary transition-colors">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 rounded-full bg-primary/10 text-primary">
                                        <FileText className="h-5 w-5" />
                                     </div>
                                     <div>
                                        <p className="font-semibold">Health Records</p>
                                        <p className="text-sm text-muted-foreground">12 files</p>
                                     </div>
                                </div>
                                <ChevronRight className="h-5 w-5 text-muted-foreground" />
                            </div>
                        </Link>
                        <Link href="/dashboard/shop" className="block p-4 rounded-lg bg-background hover:bg-secondary transition-colors">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 rounded-full bg-primary/10 text-primary">
                                        <ShoppingCart className="h-5 w-5" />
                                     </div>
                                     <div>
                                        <p className="font-semibold">Shop</p>
                                        <p className="text-sm text-muted-foreground">Medications & Equipment</p>
                                     </div>
                                </div>
                                <ChevronRight className="h-5 w-5 text-muted-foreground" />
                            </div>
                        </Link>
                    </CardContent>
                </Card>
           </div>

        </div>

    </div>
);


export default function DashboardPage() {
    return (
        <ClientDashboard />
    );
}
