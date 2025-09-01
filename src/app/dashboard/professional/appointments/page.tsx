
'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon, Clock, Users, Video, MoreVertical, Filter, Phone, AlertTriangle } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { allAppointments } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';


export default function ProfessionalAppointmentsPage() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const { toast } = useToast();

  const filteredAppointments = allAppointments.filter(appt => 
      format(new Date(appt.date), 'yyyy-MM-dd') === (date ? format(date, 'yyyy-MM-dd') : '')
  );

  const handleStartMeeting = (patientName: string, type: 'video' | 'phone') => {
      toast({
          title: "Meeting Started!",
          description: `You have started a ${type} call with ${patientName}. The patient has been notified to join.`,
      });
  }

  return (
    <div className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
                <h1 className="text-3xl font-bold tracking-tight font-headline">My Schedule</h1>
                <p className="text-muted-foreground">View and manage your patient appointments.</p>
            </div>
             <Popover>
                <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    size="lg"
                    className={cn(
                    "w-full sm:w-[280px] justify-start text-left font-normal",
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

        <Card className="bg-white">
            <CardHeader>
                <CardTitle>Appointments for {date ? format(date, "PPP") : '...'}</CardTitle>
            </CardHeader>
            <CardContent>
                {filteredAppointments.length > 0 ? (
                     <ul className="space-y-4">
                        {filteredAppointments.map(appt => (
                            <li key={appt.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-lg bg-background hover:bg-secondary/80">
                                <div className="flex items-center gap-4 flex-1">
                                    <Avatar className="h-12 w-12">
                                        <AvatarImage src={'https://placehold.co/100x100.png'} />
                                        <AvatarFallback>{appt.patientName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                        <p className="font-semibold">{appt.patientName}</p>
                                        <p className="text-sm text-muted-foreground">{appt.notes}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 w-full sm:w-auto">
                                    <div className="flex items-center gap-1.5 text-sm">
                                        <Clock className="h-4 w-4 text-muted-foreground" />
                                        <span>{format(new Date(appt.date), "p")}</span>
                                    </div>
                                    <Badge variant={appt.status === 'Completed' ? 'secondary' : 'default'}>{appt.status}</Badge>
                                </div>
                                <div className="w-full sm:w-auto flex gap-2">
                                     <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button className="w-full sm:w-auto">
                                                <Video className="mr-2 h-4 w-4" /> Start Meeting
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle className="flex items-center gap-2"><AlertTriangle className="h-6 w-6 text-primary" />Start Consultation?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    This will start a video call and notify {appt.patientName} to join immediately. Are you ready to begin?
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction onClick={() => handleStartMeeting(appt.patientName, 'video')}>Yes, Start Video Call</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                    <Button variant="ghost" size="icon" className="w-auto">
                                        <MoreVertical className="h-5 w-5" />
                                    </Button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-lg text-muted-foreground">No appointments scheduled for this day.</p>
                    </div>
                )}
            </CardContent>
        </Card>
    </div>
  );
}
