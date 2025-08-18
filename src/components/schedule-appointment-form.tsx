
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useState, useMemo } from 'react';
import { format } from 'date-fns';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarIcon, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';


export type Doctor = {
    name: string;
    specialty: string;
    avatar: string;
    department: 'Technology' | 'Outreach' | 'General Medicine' | 'Dermatology' | 'Cardiology' | 'Pediatrics';
    bio: string;
};

const availableDoctors: Doctor[] = [
    {
        name: 'Dr. Samuel Chen',
        specialty: 'General Medicine',
        department: 'General Medicine',
        avatar: 'https://placehold.co/100x100.png',
        bio: 'Dr. Chen has over 10 years of experience in general medicine and is passionate about preventative care.'
    },
    {
        name: 'Dr. Amina Khan',
        specialty: 'Dermatology',
        department: 'Dermatology',
        avatar: 'https://placehold.co/100x100.png',
        bio: 'Dr. Khan is a board-certified dermatologist specializing in both medical and cosmetic dermatology.'
    },
    {
        name: 'Dr. Evelyn Reed',
        specialty: 'Cardiology',
        department: 'Cardiology',
        avatar: 'https://placehold.co/100x100.png',
        bio: 'Dr. Reed is a leading cardiologist with expertise in managing complex heart conditions.'
    },
    {
        name: 'Dr. Ben Carter',
        specialty: 'Pediatrics',
        department: 'Pediatrics',
        avatar: 'https://placehold.co/100x100.png',
        bio: 'Dr. Carter is a dedicated pediatrician with a friendly approach to child healthcare.'
    },
];

const departments = [...new Set(availableDoctors.map(d => d.department))];

const formSchema = z.object({
  department: z.string({
    required_error: 'Please select a department.',
  }),
  doctorId: z.string({
    required_error: 'Please select a doctor.',
  }),
  date: z.date({
    required_error: 'A date is required.',
  }),
  notes: z.string().optional(),
});

export function ScheduleAppointmentForm({ onSchedule }: { onSchedule: (doctor: Doctor, date: Date, notes: string) => void; }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const selectedDepartment = form.watch('department');
  const selectedDoctorId = form.watch('doctorId');

  const filteredDoctors = useMemo(() => {
    return availableDoctors.filter(d => d.department === selectedDepartment);
  }, [selectedDepartment]);
  
  const selectedDoctor = useMemo(() => {
      return availableDoctors.find(d => d.name === selectedDoctorId);
  }, [selectedDoctorId]);

  // Reset doctor selection when department changes
  React.useEffect(() => {
    form.resetField('doctorId');
  }, [selectedDepartment, form]);


  function onSubmit(values: z.infer<typeof formSchema>) {
    const doctor = availableDoctors.find(d => d.name === values.doctorId);
    if (doctor) {
        onSchedule(doctor, values.date, values.notes || '');
        form.reset();
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-4">
         <FormField
          control={form.control}
          name="department"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select a Department</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a department" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="doctorId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select a Doctor</FormLabel>
              <Select onValueChange={field.onChange} value={field.value} disabled={!selectedDepartment}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a healthcare professional" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {filteredDoctors.map((doc) => (
                    <SelectItem key={doc.name} value={doc.name}>
                      {doc.name} - {doc.specialty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {selectedDoctor && (
             <Card className="bg-background/50 border-primary/20">
                <CardHeader className="flex flex-row items-center gap-4">
                    <Avatar className="w-16 h-16">
                        <AvatarImage src={selectedDoctor.avatar} alt={selectedDoctor.name} />
                        <AvatarFallback>{selectedDoctor.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <CardTitle className="text-lg">{selectedDoctor.name}</CardTitle>
                        <CardDescription>{selectedDoctor.specialty}</CardDescription>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">{selectedDoctor.bio}</p>
                </CardContent>
            </Card>
        )}

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Select Date & Time</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date(new Date().setHours(0,0,0,0))
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reason for Visit (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="e.g., Annual check-up, specific symptoms..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="ghost">Cancel</Button>
          </DialogClose>
          <Button type="submit">Schedule Appointment</Button>
        </DialogFooter>
      </form>
    </Form>
  )
}
