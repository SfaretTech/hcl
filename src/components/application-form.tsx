'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Upload } from 'lucide-react';

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  resume: z.any().refine((files) => files?.length === 1, 'Resume is required.'),
  coverLetter: z.string().optional(),
});

export function ApplicationForm() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      email: '',
      coverLetter: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // In a real application, you would handle file upload and send data to a server.
    console.log('Application submitted:', values);
    toast({
      title: "Application Sent!",
      description: "Thank you for applying. We'll be in touch if you're a good fit.",
    });
    form.reset();
  }

  const fileRef = form.register("resume");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input type="email" placeholder="john.doe@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
            control={form.control}
            name="resume"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Resume/CV</FormLabel>
                <FormControl>
                    <div className="relative">
                        <Input type="file" className="w-full opacity-0 absolute inset-0 z-10 cursor-pointer" {...fileRef} />
                        <Button type="button" variant="outline" className="w-full justify-start font-normal text-muted-foreground">
                            <Upload className="mr-2 h-4 w-4" />
                            {field.value?.length ? field.value[0].name : "Upload your resume"}
                        </Button>
                    </div>
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
        />
        <FormField
          control={form.control}
          name="coverLetter"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cover Letter (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us why you're a great fit for this role..."
                  className="min-h-[100px]"
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
          <Button type="submit">Submit Application</Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
