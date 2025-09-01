
'use client';

import React from 'react';
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


export type CredentialType = 'Medical License' | 'Professional Certification' | 'Business Registration' | 'Other';
export type CredentialStatus = 'Verified' | 'Pending' | 'Rejected';

export type Credential = {
    id: string;
    type: CredentialType;
    name: string;
    url: string;
    status: CredentialStatus;
};

export type Doctor = {
    id: string;
    name: string;
    specialty: string;
    avatar: string;
    department: 'Technology' | 'Outreach' | 'General Medicine' | 'Dermatology' | 'Cardiology' | 'Pediatrics';
    bio: string;
    location: string;
    status: 'online' | 'offline';
    credentials?: Credential[];
};

export const availableDoctors: Doctor[] = [
    {
        id: 'doc-1',
        name: 'Dr. Samuel Chen',
        specialty: 'General Medicine',
        department: 'General Medicine',
        avatar: 'https://placehold.co/100x100.png',
        bio: 'Dr. Chen has over 10 years of experience in general medicine and is passionate about preventative care.',
        location: 'Port Harcourt, NG',
        status: 'online',
        credentials: [
            { id: 'cred-1', type: 'Medical License', name: 'MDCN/12345/2014', url: '#', status: 'Verified' },
        ]
    },
    {
        id: 'doc-2',
        name: 'Dr. Amina Khan',
        specialty: 'Dermatology',
        department: 'Dermatology',
        avatar: 'https://placehold.co/100x100.png',
        bio: 'Dr. Khan is a board-certified dermatologist specializing in both medical and cosmetic dermatology.',
        location: 'Lagos, NG',
        status: 'offline',
        credentials: [
            { id: 'cred-2', type: 'Medical License', name: 'MDCN/54321/2012', url: '#', status: 'Verified' },
            { id: 'cred-3', type: 'Professional Certification', name: 'Fellowship in Cosmetic Dermatology', url: '#', status: 'Verified' },
        ]
    },
    {
        id: 'doc-3',
        name: 'Dr. Evelyn Reed',
        specialty: 'Cardiology',
        department: 'Cardiology',
        avatar: 'https://placehold.co/100x100.png',
        bio: 'Dr. Reed is a leading cardiologist with expertise in managing complex heart conditions.',
        location: 'Abuja, FCT',
        status: 'online',
        credentials: [
            { id: 'cred-4', type: 'Medical License', name: 'MDCN/67890/2010', url: '#', status: 'Verified' },
        ]
    },
    {
        id: 'doc-4',
        name: 'Dr. Ben Carter',
        specialty: 'Pediatrics',
        department: 'Pediatrics',
        avatar: 'https://placehold.co/100x100.png',
        bio: 'Dr. Carter is a dedicated pediatrician with a friendly approach to child healthcare.',
        location: 'Port Harcourt, NG',
        status: 'offline',
        credentials: [
             { id: 'cred-5', type: 'Medical License', name: 'MDCN/11223/2015', url: '#', status: 'Pending' },
        ]
    },
];

const formSchema = z.object({
  doctorId: z.string({
    required_error: 'Please select a doctor.',
  }),
  date: z.date({
    required_error: 'A date is required.',
  }),
  notes: z.string().optional(),
});

export function ScheduleAppointmentForm({ myDoctors, onSchedule }: { myDoctors: Doctor[], onSchedule: (doctor: Doctor, date: Date, notes: string) => void; }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const doctor = availableDoctors.find(d => d.id === values.doctorId);
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
          name="doctorId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select a Doctor</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a healthcare professional" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {myDoctors.map((doc) => (
                    <SelectItem key={doc.id} value={doc.id}>
                        <div className="flex items-center gap-2">
                           <Avatar className="w-6 h-6">
                                <AvatarImage src={doc.avatar} alt={doc.name} />
                                <AvatarFallback>{doc.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                           {doc.name} - {doc.specialty}
                        </div>
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
