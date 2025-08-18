
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Video, MoreVertical, CheckCircle, XCircle } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const upcomingAppointments = [
    {
        doctor: {
            name: 'Dr. Samuel Chen',
            specialty: 'General Medicine',
            avatar: 'https://placehold.co/100x100.png'
        },
        date: 'August 26, 2024',
        time: '11:00 AM',
        status: 'Confirmed' as const,
    },
    {
        doctor: {
            name: 'Dr. Amina Khan',
            specialty: 'Dermatology',
            avatar: 'https://placehold.co/100x100.png'
        },
        date: 'September 5, 2024',
        time: '2:30 PM',
        status: 'Confirmed' as const,
    }
];

const pastAppointments = [
    {
        doctor: {
            name: 'Dr. Evelyn Reed',
            specialty: 'Cardiology',
            avatar: 'https://placehold.co/100x100.png'
        },
        date: 'July 15, 2024',
        time: '10:00 AM',
        status: 'Completed' as const,
    },
     {
        doctor: {
            name: 'Dr. Samuel Chen',
            specialty: 'General Medicine',
            avatar: 'https://placehold.co/100x100.png'
        },
        date: 'June 20, 2024',
        time: '9:00 AM',
        status: 'Completed' as const,
    },
    {
        doctor: {
            name: 'Dr. Ben Carter',
            specialty: 'Pediatrics',
            avatar: 'https://placehold.co/100x100.png'
        },
        date: 'May 18, 2024',
        time: '3:00 PM',
        status: 'Canceled' as const,
    }
]

const AppointmentCard = ({ appointment }: { appointment: (typeof upcomingAppointments[0] | typeof pastAppointments[0])}) => {
    const isPast = new Date(appointment.date) < new Date() && appointment.status !== 'Confirmed';

    const getStatusBadge = (status: 'Confirmed' | 'Completed' | 'Canceled') => {
        switch(status) {
            case 'Confirmed': return <Badge variant="default" className="bg-blue-500 hover:bg-blue-600"><CheckCircle className="h-4 w-4 mr-1.5" />Confirmed</Badge>;
            case 'Completed': return <Badge variant="secondary"><CheckCircle className="h-4 w-4 mr-1.5" />Completed</Badge>;
            case 'Canceled': return <Badge variant="destructive"><XCircle className="h-4 w-4 mr-1.5" />Canceled</Badge>;
        }
    }

    return (
        <Card className="bg-white hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex items-center gap-4">
                     <Avatar className="w-12 h-12">
                        <AvatarImage src={appointment.doctor.avatar} alt={appointment.doctor.name} />
                        <AvatarFallback>{appointment.doctor.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <CardTitle className="text-lg font-bold">{appointment.doctor.name}</CardTitle>
                        <CardDescription>{appointment.doctor.specialty}</CardDescription>
                    </div>
                </div>
                 {!isPast && (
                     <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <MoreVertical className="h-5 w-5" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>Reschedule</DropdownMenuItem>
                            <DropdownMenuItem>Cancel</DropdownMenuItem>
                             <DropdownMenuItem>View Details</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                 )}
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground border-t pt-4">
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1.5"><Calendar className="h-4 w-4" /> <span>{appointment.date}</span></div>
                        <div className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> <span>{appointment.time}</span></div>
                    </div>
                    {getStatusBadge(appointment.status)}
                </div>
            </CardContent>
        </Card>
    )
}

export default function AppointmentsPage() {
    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight font-headline">Manage Appointments</h1>
                    <p className="text-muted-foreground">View, schedule, and manage all your appointments in one place.</p>
                </div>
                <Button size="lg">
                    <Calendar className="mr-2 h-5 w-5" />
                    Schedule New Appointment
                </Button>
            </div>

            <Tabs defaultValue="upcoming">
                <TabsList className="grid w-full grid-cols-2 sm:w-[300px]">
                    <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                    <TabsTrigger value="past">Past</TabsTrigger>
                </TabsList>
                <TabsContent value="upcoming" className="mt-6">
                    <div className="grid gap-6 md:grid-cols-2">
                        {upcomingAppointments.map((appt, index) => (
                           <AppointmentCard key={index} appointment={appt} />
                        ))}
                         {upcomingAppointments.length === 0 && (
                            <div className="md:col-span-2 text-center py-12">
                                <p className="text-lg text-muted-foreground">No upcoming appointments.</p>
                            </div>
                        )}
                    </div>
                </TabsContent>
                <TabsContent value="past" className="mt-6">
                     <div className="grid gap-6 md:grid-cols-2">
                        {pastAppointments.map((appt, index) => (
                            <AppointmentCard key={index} appointment={appt} />
                        ))}
                         {pastAppointments.length === 0 && (
                            <div className="md:col-span-2 text-center py-12">
                                <p className="text-lg text-muted-foreground">No past appointments.</p>
                            </div>
                        )}
                    </div>
                </TabsContent>
            </Tabs>

        </div>
    )
}
