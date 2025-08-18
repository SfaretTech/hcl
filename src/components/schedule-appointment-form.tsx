
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useState } from 'react';
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
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DialogFooter, DialogClose } from '@/components/ui/dialog';


export type Doctor = {
    name: string;
    specialty: string;
    avatar: string;
};

const availableDoctors: Doctor[] = [
    {
        name: 'Dr. Samuel Chen',
        specialty: 'General Medicine',
        avatar: 'https://placehold.co/100x100.png'
    },
    {
        name: 'Dr. Amina Khan',
        specialty: 'Dermatology',
        avatar: 'https://placehold.co/100x100.png'
    },
    {
        name: 'Dr. Evelyn Reed',
        specialty: 'Cardiology',
        avatar: 'https://placehold.co/100x100.png'
    },
    {
        name: 'Dr. Ben Carter',
        specialty: 'Pediatrics',
        avatar: 'https://placehold.co/100x100.png'
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

export function ScheduleAppointmentForm({ onSchedule }: { onSchedule: (doctor: Doctor, date: Date, notes: string) => void; }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const selectedDoctor = availableDoctors.find(d => d.name === values.doctorId);
    if (selectedDoctor) {
        onSchedule(selectedDoctor, values.date, values.notes || '');
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a healthcare professional" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {availableDoctors.map((doc) => (
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
                      date < new Date() || date < new Date("1900-01-01")
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
