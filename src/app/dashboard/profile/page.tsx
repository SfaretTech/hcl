
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
import { Upload, KeyRound, User, Award, Info, BadgeCheck, FileUp, FileText, AlertCircle, RefreshCw, Trash2, ShieldCheck, Building } from 'lucide-react';
import React, { useRef } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Credential, CredentialType, availableDoctors } from '@/components/schedule-appointment-form';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';


const profileFormSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters.'),
  email: z.string().email('Please enter a valid email.'),
  professionalTitle: z.string().min(2, 'Title must be at least 2 characters.'),
  specialization: z.string().min(2, 'Specialization is required.'),
  yearsOfExperience: z.coerce.number().min(0, 'Years of experience cannot be negative.'),
  bio: z.string().min(20, 'Bio should be at least 20 characters.'),
  // Organisation fields
  organisationName: z.string().optional(),
  organisationType: z.string().optional(),
  cacNumber: z.string().optional(),
  organisationAddress: z.string().optional(),
  organisationWebsite: z.string().url('Please enter a valid URL.').optional().or(z.literal('')),
  // Password fields
  currentPassword: z.string().optional(),
  newPassword: z.string().optional(),
  confirmPassword: z.string().optional(),
})
.refine(data => {
    if (data.newPassword && data.newPassword.length < 8) return false;
    return true;
}, {
    message: "New password must be at least 8 characters.",
    path: ['newPassword'],
})
.refine(data => {
    if (data.newPassword || data.confirmPassword) {
        return data.newPassword === data.confirmPassword;
    }
    return true;
}, {
    message: "New passwords don't match.",
    path: ['confirmPassword'],
})
.refine(data => {
    if (data.newPassword && !data.currentPassword) {
        return false;
    }
    return true;
}, {
    message: "Current password is required to set a new one.",
    path: ['currentPassword'],
});


const credentialSchema = z.object({
  credentialType: z.string().min(1, 'Please select a credential type.'),
  credentialName: z.string().min(3, 'Credential name must be at least 3 characters.'),
  credentialFile: z.any().refine((files) => files?.length === 1, 'A file is required.'),
});

const kycSchema = z.object({
  documentType: z.string().min(1, 'Please select a document type.'),
  documentFile: z.any().refine((files) => files?.length === 1, 'An identity document file is required.'),
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

function KycUploadForm({ onUpload }: { onUpload: (data: z.infer<typeof kycSchema>) => void; }) {
    const form = useForm<z.infer<typeof kycSchema>>({
        resolver: zodResolver(kycSchema),
        defaultValues: { documentType: '', documentFile: undefined },
    });
    const fileRef = form.register("documentFile");
    const kycFile = form.watch("documentFile");

    function onSubmit(values: z.infer<typeof kycSchema>) {
        onUpload(values);
        form.reset();
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                    <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg text-center relative cursor-pointer hover:bg-accent">
                        <FileUp className="h-12 w-12 text-muted-foreground mb-2" />
                        <p className="font-semibold">{kycFile?.[0]?.name || 'Drag & drop or click to upload'}</p>
                        <p className="text-xs text-muted-foreground">PDF, PNG, JPG up to 10MB</p>
                        <Input type="file" className="w-full h-full opacity-0 absolute inset-0 z-10 cursor-pointer" {...fileRef} />
                    </div>
                    <FormField
                      control={form.control}
                      name="documentFile"
                      render={() => ( <FormItem><FormMessage /></FormItem>)}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="documentType"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Identity Document Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select ID type" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="National ID">National ID Card</SelectItem>
                                    <SelectItem value="Passport">International Passport</SelectItem>
                                    <SelectItem value="Drivers License">Driver's License</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                 <div className="flex justify-end gap-2 pt-4">
                     <DialogTrigger asChild>
                        <Button type="button" variant="ghost">Cancel</Button>
                    </DialogTrigger>
                    <Button type="submit">Submit KYC Document</Button>
                </div>
            </form>
        </Form>
    );
}

export default function ProfessionalProfilePage() {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isCredentialUploadOpen, setCredentialUploadOpen] = React.useState(false);
  const [isKycUploadOpen, setKycUploadOpen] = React.useState(false);
  const [doctor, setDoctor] = React.useState(availableDoctors.find(d => d.id === 'doc-1')); // Assuming current user is Dr. Chen
  const [kycStatus, setKycStatus] = React.useState<'Not Submitted' | 'Pending' | 'Verified'>('Not Submitted');


  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      fullName: doctor?.name,
      email: 'dr.chen@hcom.com',
      professionalTitle: 'Medical Doctor',
      specialization: doctor?.specialty,
      yearsOfExperience: 10,
      bio: doctor?.bio,
      organisationName: 'HCOM International Clinic',
      organisationType: 'Clinic',
      cacNumber: 'RC 123456',
      organisationAddress: '23 Rumomoi, Port Harcourt, Nigeria',
      organisationWebsite: 'https://www.hcom.com.ng',
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });
  
  if (!doctor) {
      return <div>Loading professional profile...</div>;
  }

  function onSubmit(values: z.infer<typeof profileFormSchema>) {
    console.log('Profile updated:', values);
    toast({
      title: 'Profile Updated',
      description: 'Your professional information has been saved.',
    });
     if (values.newPassword) {
        toast({
            title: "Password Updated",
            description: "Your password has been changed successfully.",
        });
    }
    form.reset({
        ...values,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
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

   function onKycUpload(values: z.infer<typeof kycSchema>) {
        console.log("KYC document uploaded:", values);
        setKycStatus('Pending');
        setKycUploadOpen(false);
        toast({
            title: "KYC Document Submitted",
            description: "Your identity document has been submitted for verification.",
        });
    }

  const handleDeleteCredential = (credId: string) => {
      if (!doctor) return;
      setDoctor(prev => {
        if (!prev) return undefined;
        return {
            ...prev,
            credentials: prev.credentials?.filter(c => c.id !== credId) || []
        }
    });
    toast({
        title: "Credential Removed",
        description: "The credential has been successfully removed.",
        variant: "destructive"
    });
  }
  
  const handlePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      toast({
        title: 'Picture Updated!',
        description: `${file.name} has been selected. In a real app, this would be uploaded.`,
      });
    }
  };

  const getStatusBadge = (status: Credential['status']) => {
      switch(status) {
          case 'Verified': return <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200"><BadgeCheck className="mr-1 h-3 w-3" />Verified</Badge>;
          case 'Pending': return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-200"><RefreshCw className="mr-1 h-3 w-3 animate-spin" />Pending</Badge>;
          case 'Rejected': return <Badge variant="destructive"><AlertCircle className="mr-1 h-3 w-3" />Rejected</Badge>;
          default: return <Badge variant="outline">Unknown</Badge>;
      }
  }

   const getKycStatusBadge = () => {
        switch (kycStatus) {
            case 'Verified': return <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200"><BadgeCheck className="mr-1 h-3 w-3" />Verified</Badge>;
            case 'Pending': return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-200"><RefreshCw className="mr-1 h-3 w-3 animate-spin" />Pending</Badge>;
            case 'Not Submitted':
            default:
                return <Badge variant="outline">Not Submitted</Badge>;
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
                <h2 className="text-2xl font-bold font-headline">{form.getValues('fullName')}</h2>
                <p className="text-muted-foreground">{form.getValues('professionalTitle')}</p>
                <Input type="file" ref={fileInputRef} onChange={handlePictureChange} className="hidden" accept="image/*" />
                <Button variant="outline" size="sm" className="mt-2" onClick={() => fileInputRef.current?.click()}>
                    <Upload className="mr-2 h-4 w-4"/>
                    Change Picture
                </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                        <FormField control={form.control} name="fullName" render={({ field }) => (
                            <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="email" render={({ field }) => (
                            <FormItem><FormLabel>Email Address</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="professionalTitle" render={({ field }) => (
                            <FormItem><FormLabel>Professional Title</FormLabel><FormControl><Input placeholder="e.g. Medical Doctor" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-white">
                <CardHeader>
                <div className="flex items-center gap-3">
                    <Building className="w-6 h-6 text-primary"/>
                    <CardTitle>Organisation Information</CardTitle>
                </div>
                <CardDescription>Details about your affiliated hospital, clinic, or pharmacy.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                        <FormField control={form.control} name="organisationName" render={({ field }) => (
                            <FormItem><FormLabel>Organisation Name</FormLabel><FormControl><Input placeholder="HCOM Clinic" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                         <FormField control={form.control} name="organisationType" render={({ field }) => (
                            <FormItem><FormLabel>Organisation Type</FormLabel><FormControl><Input placeholder="e.g. Clinic, Hospital" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                         <FormField control={form.control} name="cacNumber" render={({ field }) => (
                            <FormItem><FormLabel>CAC Registration No.</FormLabel><FormControl><Input placeholder="RC 123456" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                         <FormField control={form.control} name="organisationAddress" render={({ field }) => (
                            <FormItem><FormLabel>Address</FormLabel><FormControl><Input placeholder="123 Healthway Drive, Port Harcourt" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                         <FormField control={form.control} name="organisationWebsite" render={({ field }) => (
                            <FormItem className="md:col-span-2"><FormLabel>Website</FormLabel><FormControl><Input placeholder="https://www.yourclinic.com" {...field} /></FormControl><FormMessage /></FormItem>
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
                            <FormField control={form.control} name="specialization" render={({ field }) => (
                                <FormItem><FormLabel>Specialization</FormLabel><FormControl><Input placeholder="e.g. General Medicine" {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                             <FormField control={form.control} name="yearsOfExperience" render={({ field }) => (
                                <FormItem><FormLabel>Years of Experience</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                        </div>
                        <FormField control={form.control} name="bio" render={({ field }) => (
                            <FormItem><FormLabel>Biography</FormLabel><FormControl><Textarea placeholder="Tell patients about yourself..." className="min-h-24" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-white">
                <CardHeader>
                   <div className="flex items-center gap-3">
                      <KeyRound className="w-6 h-6 text-primary"/>
                      <CardTitle>Security</CardTitle>
                   </div>
                  <CardDescription>Manage your password. Leave fields blank to keep your current password.</CardDescription>
                </CardHeader>
                <CardContent>
                   <div className="grid md:grid-cols-3 gap-6">
                     <FormField control={form.control} name="currentPassword" render={({ field }) => (
                        <FormItem><FormLabel>Current Password</FormLabel><FormControl><Input type="password" {...field} /></FormControl><FormMessage /></FormItem>
                     )}/>
                     <FormField control={form.control} name="newPassword" render={({ field }) => (
                        <FormItem><FormLabel>New Password</FormLabel><FormControl><Input type="password" {...field} /></FormControl><FormMessage /></FormItem>
                     )}/>
                     <FormField control={form.control} name="confirmPassword" render={({ field }) => (
                        <FormItem><FormLabel>Confirm New Password</FormLabel><FormControl><Input type="password" {...field} /></FormControl><FormMessage /></FormItem>
                     )}/>
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
                          <div className="flex items-center gap-2">
                            {getStatusBadge(cred.status)}
                            <Button variant="outline" size="sm" asChild>
                              <Link href={cred.url} target="_blank">View</Link>
                            </Button>
                            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive" onClick={() => handleDeleteCredential(cred.id)}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
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

      <Card className="bg-white">
        <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-3">
                    <ShieldCheck className="w-6 h-6 text-primary"/>
                    <CardTitle>KYC Verification (Admin View Only)</CardTitle>
                </div>
                <CardDescription>Upload identity documents for internal Know Your Customer verification.</CardDescription>
              </div>
                <Dialog open={isKycUploadOpen} onOpenChange={setKycUploadOpen}>
                    <DialogTrigger asChild>
                        <Button variant="outline">
                            <FileUp className="mr-2 h-4 w-4"/>
                            Upload Identity Document
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Upload Identity Document</DialogTitle>
                            <DialogDescription>
                                This document is for internal verification only and will not be shared publicly.
                            </DialogDescription>
                        </DialogHeader>
                        <KycUploadForm onUpload={onKycUpload}/>
                    </DialogContent>
                </Dialog>
            </div>
        </CardHeader>
         <CardContent>
             <div className="p-3 bg-background rounded-lg flex items-center justify-between">
                <div className="font-semibold">Verification Status</div>
                {getKycStatusBadge()}
            </div>
         </CardContent>
      </Card>
    </div>
  );
}

    