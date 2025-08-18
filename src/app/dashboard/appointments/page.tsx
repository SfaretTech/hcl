

'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon, Clock, Video, MoreVertical, CheckCircle, XCircle, Info, AlertTriangle } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';


const upcomingAppointments = [
    {
        id: 'appt-1',
        doctor: {
            name: 'Dr. Samuel Chen',
            specialty: 'General Medicine',
            avatar: 'https://placehold.co/100x100.png'
        },
        date: '2024-08-26T11:00:00',
        status: 'Confirmed' as const,
        notes: 'Follow-up regarding your recent test results. Please ensure you have them available.',
        joinLink: '#',
    },
    {
        id: 'appt-2',
        doctor: {
            name: 'Dr. Amina Khan',
            specialty: 'Dermatology',
            avatar: 'https://placehold.co/100x100.png'
        },
        date: '2024-09-05T14:30:00',
        status: 'Confirmed' as const,
        notes: 'Initial consultation for your skin concerns.',
        joinLink: '#',
    }
];

const pastAppointments = [
    {
        id: 'appt-3',
        doctor: {
            name: 'Dr. Evelyn Reed',
            specialty: 'Cardiology',
            avatar: 'https://placehold.co/100x100.png'
        },
        date: '2024-07-15T10:00:00',
        status: 'Completed' as const,
        notes: 'Discussed statin medication options. Follow-up in 6 months.',
        joinLink: '#',
    },
     {
        id: 'appt-4',
        doctor: {
            name: 'Dr. Samuel Chen',
            specialty: 'General Medicine',
            avatar: 'https://placehold.co/100x100.png'
        },
        date: '2024-06-20T09:00:00',
        status: 'Completed' as const,
        notes: 'Annual physical check-up. All vitals are normal.',
        joinLink: '#',
    },
    {
        id: 'appt-5',
        doctor: {
            name: 'Dr. Ben Carter',
            specialty: 'Pediatrics',
            avatar: 'https://placehold.co/100x100.png'
        },
        date: '2024-05-18T15:00:00',
        status: 'Canceled' as const,
        notes: 'Canceled by patient.',
        joinLink: '#',
    }
]

type Appointment = typeof upcomingAppointments[0] | typeof pastAppointments[0];


const RescheduleDialog = ({ appointment, onReschedule, children }: { appointment: Appointment, onReschedule: (id: string, newDate: Date) => void, children: React.ReactNode }) => {
    const [date, setDate] = useState<Date | undefined>(new Date(appointment.date));

    const handleReschedule = () => {
        if (date) {
            onReschedule(appointment.id, date);
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Reschedule Appointment</DialogTitle>
                    <DialogDescription>
                        Select a new date and time for your appointment with {appointment.doctor.name}.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="date" className="text-right">
                            Date
                        </Label>
                         <Popover>
                            <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                "w-[280px] justify-start text-left font-normal",
                                !date && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date ? format(date, "PPP") : <span>Pick a date</span>}
                            </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                initialFocus
                            />
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="outline">Cancel</Button>
                    </DialogClose>
                     <DialogClose asChild>
                        <Button type="submit" onClick={handleReschedule}>Save changes</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

const ViewDetailsDialog = ({ appointment, children }: { appointment: Appointment, children: React.ReactNode }) => {
    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Appointment Details</DialogTitle>
                     <DialogDescription>
                        with {appointment.doctor.name} ({appointment.doctor.specialty})
                     </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                     <div className="flex items-center gap-2 text-sm"><CalendarIcon className="h-4 w-4 text-muted-foreground" /> <span>{format(new Date(appointment.date), "PPP 'at' p")}</span></div>
                     <div>
                        <h4 className="font-semibold text-sm mb-1">Notes</h4>
                        <p className="text-sm text-muted-foreground">{appointment.notes}</p>
                     </div>
                </div>
                <DialogFooter>
                     {appointment.status === "Confirmed" && (
                         <Button className="w-full sm:w-auto">
                            <Video className="mr-2 h-4 w-4"/> Join Video Call
                        </Button>
                     )}
                     <DialogClose asChild>
                        <Button variant="outline" className="w-full sm:w-auto">Close</Button>
                     </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}


const AppointmentCard = ({ appointment, onCancel, onReschedule }: { appointment: Appointment, onCancel: (id: string) => void; onReschedule: (id: string, newDate: Date) => void; }) => {
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
                             <ViewDetailsDialog appointment={appointment}>
                                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                    <Info className="mr-2 h-4 w-4"/> View Details
                                </DropdownMenuItem>
                            </ViewDetailsDialog>
                            <RescheduleDialog appointment={appointment} onReschedule={onReschedule}>
                                 <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                    <CalendarIcon className="mr-2 h-4 w-4"/> Reschedule
                                </DropdownMenuItem>
                            </RescheduleDialog>
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                     <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-red-600 focus:text-red-600 focus:bg-red-50">
                                        <XCircle className="mr-2 h-4 w-4"/> Cancel
                                    </DropdownMenuItem>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle className="flex items-center gap-2"><AlertTriangle className="h-6 w-6 text-red-500" />Are you sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This will permanently cancel your appointment with {appointment.doctor.name}. This action cannot be undone.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Go Back</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => onCancel(appointment.id)} className="bg-red-600 hover:bg-red-700">Yes, Cancel Appointment</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </DropdownMenuContent>
                    </DropdownMenu>
                 )}
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground border-t pt-4">
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1.5"><CalendarIcon className="h-4 w-4" /> <span>{format(new Date(appointment.date), "PPP")}</span></div>
                        <div className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> <span>{format(new Date(appointment.date), "p")}</span></div>
                    </div>
                    {getStatusBadge(appointment.status)}
                </div>
            </CardContent>
        </Card>
    )
}

export default function AppointmentsPage() {
    const { toast } = useToast();
    const [allAppointments, setAllAppointments] = useState<Appointment[]>([...upcomingAppointments, ...pastAppointments]);

    const handleCancelAppointment = (id: string) => {
        setAllAppointments(prev => prev.map(appt => appt.id === id ? { ...appt, status: 'Canceled' } : appt));
        toast({
            title: "Appointment Canceled",
            description: "Your appointment has been successfully canceled.",
            variant: "destructive"
        });
    }

    const handleRescheduleAppointment = (id: string, newDate: Date) => {
        setAllAppointments(prev => prev.map(appt => appt.id === id ? { ...appt, date: newDate.toISOString() } : appt));
         toast({
            title: "Appointment Rescheduled",
            description: `Your appointment has been moved to ${format(newDate, "PPP 'at' p")}.`,
        });
    }
    
    const currentUpcoming = allAppointments.filter(a => a.status === 'Confirmed' && new Date(a.date) >= new Date()).sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    const currentPast = allAppointments.filter(a => a.status !== 'Confirmed' || new Date(a.date) < new Date()).sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight font-headline">Manage Appointments</h1>
                    <p className="text-muted-foreground">View, schedule, and manage all your appointments in one place.</p>
                </div>
                <Button size="lg">
                    <CalendarIcon className="mr-2 h-5 w-5" />
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
                        {currentUpcoming.map((appt) => (
                           <AppointmentCard key={appt.id} appointment={appt} onCancel={handleCancelAppointment} onReschedule={handleRescheduleAppointment} />
                        ))}
                         {currentUpcoming.length === 0 && (
                            <div className="md:col-span-2 text-center py-12">
                                <p className="text-lg text-muted-foreground">No upcoming appointments.</p>
                            </div>
                        )}
                    </div>
                </TabsContent>
                <TabsContent value="past" className="mt-6">
                     <div className="grid gap-6 md:grid-cols-2">
                        {currentPast.map((appt) => (
                            <AppointmentCard key={appt.id} appointment={appt} onCancel={handleCancelAppointment} onReschedule={handleRescheduleAppointment}/>
                        ))}
                         {currentPast.length === 0 && (
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

    