
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Upload, KeyRound, User, Phone, Calendar } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const profileSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters.'),
  email: z.string().email('Please enter a valid email.'),
  phoneNumber: z.string().min(10, { message: 'Please enter a valid phone number.' }),
  dateOfBirth: z.string().min(1, { message: 'Date of birth is required.' }),
});

export default function ClientProfilePage() {
  const { toast } = useToast();

  const profileForm = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: 'Jessica Peterson',
      email: 'jessica.peterson@example.com',
      phoneNumber: '+234 801 234 5678',
      dateOfBirth: '1990-05-15',
    },
  });

  function onProfileSubmit(values: z.infer<typeof profileSchema>) {
    console.log('Profile updated:', values);
    toast({
      title: 'Profile Updated',
      description: 'Your personal information has been saved.',
    });
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">My Profile</h1>
        <p className="text-muted-foreground">Update your personal information.</p>
      </div>

      <Card className="bg-white">
        <CardHeader>
          <div className="flex items-center gap-6">
            <Avatar className="w-24 h-24 border-4 border-primary/20">
                <AvatarImage src="https://placehold.co/100x100.png" data-ai-hint="client portrait"/>
                <AvatarFallback>JP</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
                <h2 className="text-2xl font-bold font-headline">{profileForm.getValues('fullName')}</h2>
                <p className="text-muted-foreground">{profileForm.getValues('email')}</p>
                <Button variant="outline" size="sm" className="mt-2">
                    <Upload className="mr-2 h-4 w-4"/>
                    Change Picture
                </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Form {...profileForm}>
        <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-8">
            <Card className="bg-white">
                <CardHeader>
                <div className="flex items-center gap-3">
                    <User className="w-6 h-6 text-primary"/>
                    <CardTitle>Personal Details</CardTitle>
                </div>
                <CardDescription>Manage your name, email and other personal information.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                        <FormField control={profileForm.control} name="fullName" render={({ field }) => (
                            <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={profileForm.control} name="email" render={({ field }) => (
                            <FormItem><FormLabel>Email Address</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={profileForm.control} name="phoneNumber" render={({ field }) => (
                            <FormItem><FormLabel>Phone Number</FormLabel><FormControl><Input type="tel" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={profileForm.control} name="dateOfBirth" render={({ field }) => (
                            <FormItem><FormLabel>Date of Birth</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                    </div>
                </CardContent>
            </Card>
            
            <div className="flex justify-end">
                <Button type="submit" size="lg">Save Changes</Button>
            </div>
        </form>
      </Form>
    </div>
  );
}
