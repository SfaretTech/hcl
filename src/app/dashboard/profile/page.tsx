
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Upload, KeyRound, User, Award, Info, BadgeCheck, FileUp, FileText, AlertCircle, RefreshCw } from 'lucide-react';
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Credential, CredentialType, availableDoctors } from '@/components/schedule-appointment-form';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';


const profileSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters.'),
  email: z.string().email('Please enter a valid email.'),
  professionalTitle: z.string().min(2, 'Title must be at least 2 characters.'),
  specialization: z.string().min(2, 'Specialization is required.'),
  yearsOfExperience: z.coerce.number().min(0, 'Years of experience cannot be negative.'),
  bio: z.string().min(20, 'Bio should be at least 20 characters.'),
});

const passwordSchema = z.object({
    currentPassword: z.string().min(1, 'Current password is required.'),
    newPassword: z.string().min(8, 'New password must be at least 8 characters.'),
    confirmPassword: z.string(),
}).refine(data => data.newPassword === data.confirmPassword, {
    message: "New passwords don't match.",
    path: ['confirmPassword'],
});

const credentialSchema = z.object({
  credentialType: z.string().min(1, 'Please select a credential type.'),
  credentialName: z.string().min(3, 'Credential name must be at least 3 characters.'),
  credentialFile: z.any().refine((files) => files?.length === 1, 'A file is required.'),
});


function CredentialUploadForm({ onUpload }: { onUpload: (data: z.infer<typeof credentialSchema>) => void; }) {
    const form = useForm<z.infer<typeof credentialSchema>>({
        resolver: zodResolver(credentialSchema),
        defaultValues: { credentialType: '', credentialName: '', credentialFile: undefined },
    });
    const fileRef = form.register("credentialFile");
    const credentialFile = form.watch("credentialFile");
    const credentialTypes: CredentialType[] = ['Medical License', 'Professional Certification', 'Business Registration', 'Other'];

    function onSubmit(values: z.infer<typeof credentialSchema>) {
        onUpload(values);
        form.reset();
    }
    
    return (
         <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                    <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg text-center relative cursor-pointer hover:bg-accent">
                        <FileUp className="h-12 w-12 text-muted-foreground mb-2" />
                        <p className="font-semibold">{credentialFile?.[0]?.name || 'Drag & drop or click to upload'}</p>
                        <p className="text-xs text-muted-foreground">PDF, PNG, JPG up to 10MB</p>
                        <Input type="file" className="w-full h-full opacity-0 absolute inset-0 z-10 cursor-pointer" {...fileRef} />
                    </div>
                     <FormField
                      control={form.control}
                      name="credentialFile"
                      render={() => ( <FormItem><FormMessage /></FormItem>)}
                    />
                </div>
                 <FormField
                    control={form.control}
                    name="credentialType"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Credential Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select the type of document" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {credentialTypes.map(type => (
                                        <SelectItem key={type} value={type}>{type}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="credentialName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Document Name / Number</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g., 'MDCN/12345' or 'Advanced Cardiology Cert.'" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex justify-end gap-2 pt-4">
                     <DialogTrigger asChild>
                        <Button type="button" variant="ghost">Cancel</Button>
                    </DialogTrigger>
                    <Button type="submit">Submit for Review</Button>
                </div>
            </form>
        </Form>
    );
}

export default function ProfessionalProfilePage() {
  const { toast } = useToast();
  const [isCredentialUploadOpen, setCredentialUploadOpen] = React.useState(false);
  const [doctor, setDoctor] = React.useState(() => availableDoctors.find(d => d.id === 'doc-1')); // Assuming current user is Dr. Chen

  const profileForm = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: doctor?.name,
      email: 'dr.chen@hcom.com',
      professionalTitle: 'Medical Doctor',
      specialization: doctor?.specialty,
      yearsOfExperience: 10,
      bio: doctor?.bio,
    },
  });

  const passwordForm = useForm<z.infer<typeof passwordSchema>>({
      resolver: zodResolver(passwordSchema),
      defaultValues: { currentPassword: '', newPassword: '', confirmPassword: '' }
  })
  
  if (!doctor) {
      return <div>Loading professional profile...</div>;
  }

  function onProfileSubmit(values: z.infer<typeof profileSchema>) {
    console.log('Profile updated:', values);
    toast({
      title: 'Profile Updated',
      description: 'Your professional information has been saved.',
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

  function onCredentialUpload(values: z.infer<typeof credentialSchema>) {
    console.log("Credential uploaded:", values);
    const newCredential: Credential = {
      id: `cred-${Date.now()}`,
      type: values.credentialType as CredentialType,
      name: values.credentialName,
      url: '#', // Placeholder URL
      status: 'Pending',
    }

    setDoctor(prev => prev ? { ...prev, credentials: [...(prev.credentials || []), newCredential] } : undefined);
    
    setCredentialUploadOpen(false);
    toast({
        title: "Credential Submitted",
        description: "Your new credential has been submitted for review. This may take 2-3 business days.",
    });
  }
  
  const getStatusBadge = (status: Credential['status']) => {
      switch(status) {
          case 'Verified': return <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200"><BadgeCheck className="mr-1 h-3 w-3" />Verified</Badge>;
          case 'Pending': return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-200"><RefreshCw className="mr-1 h-3 w-3 animate-spin" />Pending</Badge>;
          case 'Rejected': return <Badge variant="destructive"><AlertCircle className="mr-1 h-3 w-3" />Rejected</Badge>;
          default: return <Badge variant="outline">Unknown</Badge>;
      }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Manage Profile</h1>
        <p className="text-muted-foreground">Update your personal, professional, and security information.</p>
      </div>

      <Card className="bg-white">
        <CardHeader>
          <div className="flex items-center gap-6">
            <Avatar className="w-24 h-24 border-4 border-primary/20">
                <AvatarImage src="https://placehold.co/100x100.png" data-ai-hint="doctor portrait"/>
                <AvatarFallback>DC</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
                <h2 className="text-2xl font-bold font-headline">{profileForm.getValues('fullName')}</h2>
                <p className="text-muted-foreground">{profileForm.getValues('professionalTitle')}</p>
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
                    <CardTitle>Personal Information</CardTitle>
                </div>
                <CardDescription>Update your name, email, and professional title.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                        <FormField control={profileForm.control} name="fullName" render={({ field }) => (
                            <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={profileForm.control} name="email" render={({ field }) => (
                            <FormItem><FormLabel>Email Address</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={profileForm.control} name="professionalTitle" render={({ field }) => (
                            <FormItem><FormLabel>Professional Title</FormLabel><FormControl><Input placeholder="e.g. Medical Doctor" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-white">
                <CardHeader>
                <div className="flex items-center gap-3">
                    <Info className="w-6 h-6 text-primary"/>
                    <CardTitle>Public Profile Details</CardTitle>
                </div>
                <CardDescription>This information will be visible to clients on your profile page.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                         <div className="grid md:grid-cols-2 gap-6">
                            <FormField control={profileForm.control} name="specialization" render={({ field }) => (
                                <FormItem><FormLabel>Specialization</FormLabel><FormControl><Input placeholder="e.g. General Medicine" {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                             <FormField control={profileForm.control} name="yearsOfExperience" render={({ field }) => (
                                <FormItem><FormLabel>Years of Experience</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                        </div>
                        <FormField control={profileForm.control} name="bio" render={({ field }) => (
                            <FormItem><FormLabel>Biography</FormLabel><FormControl><Textarea placeholder="Tell patients about yourself..." className="min-h-24" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-white">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-3">
                          <Award className="w-6 h-6 text-primary"/>
                          <CardTitle>Credential Management</CardTitle>
                      </div>
                      <CardDescription>Upload and manage your professional credentials for verification.</CardDescription>
                    </div>
                     <Dialog open={isCredentialUploadOpen} onOpenChange={setCredentialUploadOpen}>
                        <DialogTrigger asChild>
                            <Button type="button">
                                <FileUp className="mr-2 h-4 w-4"/>
                                Upload New Credential
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Upload New Credential</DialogTitle>
                                <DialogDescription>
                                    Please upload your updated credential document. It will be reviewed by our team within 2-3 business days.
                                </DialogDescription>
                            </DialogHeader>
                            <CredentialUploadForm onUpload={onCredentialUpload} />
                        </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                      {(doctor.credentials && doctor.credentials.length > 0) ? (
                        doctor.credentials.map((cred) => (
                           <div key={cred.id} className="p-3 bg-background rounded-lg flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <FileText className="h-6 w-6 text-muted-foreground"/>
                                    <div>
                                        <p className="font-semibold">{cred.name}</p>
                                        <p className="text-sm text-muted-foreground">{cred.type}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                  {getStatusBadge(cred.status)}
                                  <Button variant="outline" size="sm">View</Button>
                                </div>
                           </div>
                        ))
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-muted-foreground">No credentials uploaded yet.</p>
                        </div>
                      )}
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-end">
                <Button type="submit" size="lg">Save All Changes</Button>
            </div>
        </form>
      </Form>


      <Card className="bg-white">
        <CardHeader>
           <div className="flex items-center gap-3">
              <KeyRound className="w-6 h-6 text-primary"/>
              <CardTitle>Security</CardTitle>
           </div>
          <CardDescription>Manage your password.</CardDescription>
        </CardHeader>
        <CardContent>
            <Form {...passwordForm}>
                <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-6">
                   <div className="grid md:grid-cols-3 gap-6">
                     <FormField control={passwordForm.control} name="currentPassword" render={({ field }) => (
                        <FormItem><FormLabel>Current Password</FormLabel><FormControl><Input type="password" {...field} /></FormControl><FormMessage /></FormItem>
                     )}/>
                     <FormField control={passwordForm.control} name="newPassword" render={({ field }) => (
                        <FormItem><FormLabel>New Password</FormLabel><FormControl><Input type="password" {...field} /></FormControl><FormMessage /></FormItem>
                     )}/>
                     <FormField control={passwordForm.control} name="confirmPassword" render={({ field }) => (
                        <FormItem><FormLabel>Confirm New Password</FormLabel><FormControl><Input type="password" {...field} /></FormControl><FormMessage /></FormItem>
                     )}/>
                   </div>
                    <div className="flex justify-end">
                        <Button type="submit">Change Password</Button>
                    </div>
                </form>
            </Form>
        </CardContent>
      </Card>

    </div>
  );
}
