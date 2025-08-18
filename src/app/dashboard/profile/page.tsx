
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Upload, KeyRound, User, MapPin } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const profileSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters.'),
  email: z.string().email('Please enter a valid email.'),
  phoneNumber: z.string().optional(),
  
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  postalCode: z.string().optional(),
  
  idType: z.string().optional(),
  idNumber: z.string().optional(),
  idDocument: z.any().optional(),
});

const passwordSchema = z.object({
    currentPassword: z.string().min(1, 'Current password is required.'),
    newPassword: z.string().min(8, 'New password must be at least 8 characters.'),
    confirmPassword: z.string(),
}).refine(data => data.newPassword === data.confirmPassword, {
    message: "New passwords don't match.",
    path: ['confirmPassword'],
});

export default function ProfilePage() {
  const { toast } = useToast();

  const profileForm = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: 'Jessica Peterson',
      email: 'jessica.peterson@example.com',
      phoneNumber: '+234 801 234 5678',
      address: '123 Healthway Drive',
      city: 'Port Harcourt',
      state: 'Rivers',
      postalCode: '500101',
      idType: '',
      idNumber: '',
      idDocument: null,
    },
  });

  const passwordForm = useForm<z.infer<typeof passwordSchema>>({
      resolver: zodResolver(passwordSchema),
      defaultValues: {
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
      }
  })

  function onProfileSubmit(values: z.infer<typeof profileSchema>) {
    console.log('Profile updated:', values);
    toast({
      title: 'Profile Updated',
      description: 'Your personal information has been saved.',
    });
  }

  function onPasswordSubmit(values: z.infer<typeof passwordSchema>) {
    console.log("Password change requested:", values);
    toast({
        title: "Password Updated",
        description: "Your password has been changed successfully.",
    });
    passwordForm.reset();
  }
  
  const idFileRef = profileForm.register("idDocument");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">My Profile</h1>
        <p className="text-muted-foreground">Manage your personal information, address, and account settings.</p>
      </div>

      <Card className="bg-white">
        <CardHeader>
          <div className="flex items-center gap-6">
            <Avatar className="w-24 h-24 border-4 border-primary/20">
                <AvatarImage src="https://placehold.co/100x100.png" data-ai-hint="woman smiling"/>
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

      <Card className="bg-white">
        <CardHeader>
           <div className="flex items-center gap-3">
              <User className="w-6 h-6 text-primary"/>
              <CardTitle>Personal Information</CardTitle>
           </div>
          <CardDescription>Update your name, email, and phone number.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...profileForm}>
            <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                 <FormField
                  control={profileForm.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={profileForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={profileForm.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input type="tel" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
               <div className="flex justify-end">
                    <Button type="submit">Save Changes</Button>
               </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      
       <Card className="bg-white">
        <CardHeader>
            <div className="flex items-center gap-3">
              <MapPin className="w-6 h-6 text-primary"/>
              <CardTitle>Address</CardTitle>
           </div>
          <CardDescription>Manage your primary residential address.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...profileForm}>
            <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
              <FormField
                  control={profileForm.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Street Address</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              <div className="grid md:grid-cols-3 gap-6">
                 <FormField
                  control={profileForm.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={profileForm.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State/Province</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={profileForm.control}
                  name="postalCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Postal Code</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex justify-end">
                  <Button type="submit">Save Address</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card className="bg-white">
        <CardHeader>
           <div className="flex items-center gap-3">
              <KeyRound className="w-6 h-6 text-primary"/>
              <CardTitle>Security & Verification</CardTitle>
           </div>
          <CardDescription>Manage your password and verify your identity for full access to our services.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
            <Form {...passwordForm}>
                <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-6">
                   <div className="grid md:grid-cols-3 gap-6">
                     <FormField
                        control={passwordForm.control}
                        name="currentPassword"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Current Password</FormLabel>
                            <FormControl>
                                <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                         <FormField
                        control={passwordForm.control}
                        name="newPassword"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>New Password</FormLabel>
                            <FormControl>
                                <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                         <FormField
                        control={passwordForm.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Confirm New Password</FormLabel>
                            <FormControl>
                                <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                   </div>
                    <div className="flex justify-end">
                        <Button type="submit">Change Password</Button>
                    </div>
                </form>
            </Form>
            
            <Separator />

            <div>
                <h3 className="text-lg font-semibold mb-2">Identity Verification (KYC)</h3>
                <p className="text-sm text-muted-foreground mb-4">Upload a government-issued ID to fully verify your account.</p>
                <Form {...profileForm}>
                 <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                            control={profileForm.control}
                            name="idType"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>ID Type</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select ID Type" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="nin">National ID Card (NIN)</SelectItem>
                                            <SelectItem value="passport">International Passport</SelectItem>
                                            <SelectItem value="drivers_license">Driver's License</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={profileForm.control}
                            name="idNumber"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>ID Number</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your ID number" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                        control={profileForm.control}
                        name="idDocument"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Upload ID Document</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Input type="file" className="w-full opacity-0 absolute inset-0 z-10 cursor-pointer" {...idFileRef} />
                                    <Button type="button" variant="outline" className="w-full justify-start font-normal text-muted-foreground">
                                        <Upload className="mr-2 h-4 w-4" />
                                        {field.value?.length ? field.value[0].name : "Choose a file to upload"}
                                    </Button>
                                </div>
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex justify-end">
                        <Button type="submit">Submit for Verification</Button>
                    </div>
                 </form>
                </Form>
            </div>
        </CardContent>
      </Card>

    </div>
  );
}
