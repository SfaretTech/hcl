
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import React, { useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Upload, User, ShieldCheck, FileUp, Banknote, Landmark, Eye, EyeOff, AlertTriangle, BadgeCheck, Trash2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { BankAccountForm } from '@/components/bank-account-form';

const profileSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters.'),
  email: z.string().email('Please enter a valid email.'),
  phoneNumber: z.string().min(10, 'Please enter a valid phone number.'),
  address: z.string().min(5, 'Address is required.'),
  bio: z.string().optional(),
});

const passwordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required.'),
  newPassword: z.string().min(8, 'New password must be at least 8 characters.'),
  confirmPassword: z.string(),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "New passwords don't match.",
  path: ['confirmPassword'],
});

const kycSchema = z.object({
  documentType: z.string().min(1, 'Please select a document type.'),
  documentNumber: z.string().min(3, 'Document number is required.'),
  documentFile: z.any().refine((files) => files?.length === 1, 'A file is required.'),
});

export type BankAccount = {
    id: string;
    bankName: string;
    accountNumber: string;
    accountName: string;
};

function KycForm({ onUpload, status }: { onUpload: (data: z.infer<typeof kycSchema>) => void; status: 'Not Verified' | 'Pending' | 'Verified' }) {
    const form = useForm<z.infer<typeof kycSchema>>({
        resolver: zodResolver(kycSchema),
        defaultValues: { documentType: '', documentNumber: '', documentFile: undefined },
    });
    const fileRef = form.register("documentFile");

    if (status === 'Verified') {
        return (
            <Alert variant="default" className="border-green-500 bg-green-50">
                <BadgeCheck className="h-4 w-4 text-green-600" />
                <AlertTitle>KYC Verified</AlertTitle>
                <AlertDescription>Your identity has been successfully verified. No further action is needed.</AlertDescription>
            </Alert>
        );
    }
     if (status === 'Pending') {
        return (
            <Alert variant="default" className="border-yellow-500 bg-yellow-50">
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
                <AlertTitle>Verification Pending</AlertTitle>
                <AlertDescription>Your documents are under review. This may take 1-2 business days.</AlertDescription>
            </Alert>
        );
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onUpload)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="documentType"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Document Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl><SelectTrigger><SelectValue placeholder="Select ID type" /></SelectTrigger></FormControl>
                                <SelectContent>
                                    <SelectItem value="National ID">National ID Card (NIN Slip)</SelectItem>
                                    <SelectItem value="Passport">International Passport</SelectItem>
                                    <SelectItem value="Drivers License">Driver's License</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField control={form.control} name="documentNumber" render={({ field }) => (
                    <FormItem><FormLabel>Document Number</FormLabel><FormControl><Input placeholder="Enter ID number" {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
                <FormField control={form.control} name="documentFile" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Upload Document</FormLabel>
                         <FormControl>
                            <div className="relative">
                                <Input type="file" className="w-full opacity-0 absolute inset-0 z-10 cursor-pointer" {...fileRef} />
                                <Button type="button" variant="outline" className="w-full justify-start font-normal text-muted-foreground">
                                    <FileUp className="mr-2 h-4 w-4" />
                                    {form.watch("documentFile")?.[0]?.name || "Upload ID document"}
                                </Button>
                            </div>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}/>
                <div className="flex justify-end pt-4">
                    <Button type="submit">Submit for Verification</Button>
                </div>
            </form>
        </Form>
    )
}

export default function InvestorProfilePage() {
    const { toast } = useToast();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [kycStatus, setKycStatus] = React.useState<'Not Verified' | 'Pending' | 'Verified'>('Not Verified');
    const [isBankDialogOpen, setBankDialogOpen] = React.useState(false);
    const [bankAccounts, setBankAccounts] = React.useState<BankAccount[]>([
        { id: 'bank-1', bankName: 'GTBank', accountNumber: '... ... 6789', accountName: 'Alex Johnson' }
    ]);
    
    const profileForm = useForm<z.infer<typeof profileSchema>>({
        resolver: zodResolver(profileSchema),
        defaultValues: { fullName: 'Alex Johnson', email: 'alex.j@invest.hcom.com', phoneNumber: '+234 901 234 5678', address: '123 Finance Avenue, Lagos, Nigeria', bio: 'Experienced angel investor with a focus on HealthTech and social impact projects.' },
    });

    const onKycUpload = (data: z.infer<typeof kycSchema>) => {
        console.log('KYC submitted:', data);
        setKycStatus('Pending');
        toast({ title: 'KYC Documents Submitted', description: 'Your information is now under review.' });
    }
    
    const onProfileSubmit = (values: z.infer<typeof profileSchema>) => {
        console.log('Profile updated:', values);
        toast({ title: 'Profile Updated', description: 'Your personal information has been saved.' });
    }

    const handleAddBankAccount = (data: Omit<BankAccount, 'id'>) => {
        const newAccount = {
            id: `bank-${Date.now()}`,
            ...data,
            accountNumber: `... ... ${data.accountNumber.slice(-4)}`
        };
        setBankAccounts(prev => [...prev, newAccount]);
        setBankDialogOpen(false);
        toast({ title: 'Bank Account Added', description: `${data.bankName} has been successfully linked.` });
    }

    const handleRemoveBankAccount = (id: string) => {
        setBankAccounts(prev => prev.filter(acc => acc.id !== id));
        toast({ title: 'Bank Account Removed', variant: 'destructive'});
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

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight font-headline">My Profile</h1>
                <p className="text-muted-foreground">Manage your investor profile and verification status.</p>
            </div>

             <Card className="bg-white">
                <CardHeader>
                <div className="flex items-center gap-6">
                    <Avatar className="w-24 h-24 border-4 border-primary/20">
                        <AvatarImage src="https://placehold.co/100x100.png" data-ai-hint="investor portrait"/>
                        <AvatarFallback>AJ</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                        <h2 className="text-2xl font-bold font-headline">{profileForm.getValues('fullName')}</h2>
                        <p className="text-muted-foreground">{profileForm.getValues('email')}</p>
                        <Input type="file" ref={fileInputRef} onChange={handlePictureChange} className="hidden" accept="image/*" />
                        <Button variant="outline" size="sm" className="mt-2" onClick={() => fileInputRef.current?.click()}>
                            <Upload className="mr-2 h-4 w-4"/> Change Picture
                        </Button>
                    </div>
                </div>
                </CardHeader>
            </Card>

            <div className="grid lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2 space-y-8">
                     <Form {...profileForm}>
                        <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-8">
                            <Card className="bg-white">
                                <CardHeader><CardTitle className="flex items-center gap-3"><User className="w-6 h-6 text-primary"/> Personal Information</CardTitle></CardHeader>
                                <CardContent className="space-y-6">
                                     <div className="grid md:grid-cols-2 gap-6">
                                        <FormField control={profileForm.control} name="fullName" render={({ field }) => (
                                            <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                                        )} />
                                        <FormField control={profileForm.control} name="email" render={({ field }) => (
                                            <FormItem><FormLabel>Email Address</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>
                                        )} />
                                         <FormField control={profileForm.control} name="phoneNumber" render={({ field }) => (
                                            <FormItem><FormLabel>Phone Number</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                                        )} />
                                         <FormField control={profileForm.control} name="address" render={({ field }) => (
                                            <FormItem><FormLabel>Residential Address</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                                        )} />
                                    </div>
                                    <FormField control={profileForm.control} name="bio" render={({ field }) => (
                                        <FormItem><FormLabel>Short Bio</FormLabel><FormControl><Textarea placeholder="Tell us about your investment interests..." {...field} /></FormControl><FormMessage /></FormItem>
                                    )} />
                                     <div className="flex justify-end">
                                        <Button type="submit">Save Profile</Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </form>
                    </Form>
                </div>
                <div className="lg:col-span-1 space-y-8">
                    <Card className="bg-white">
                        <CardHeader><CardTitle className="flex items-center gap-3"><ShieldCheck className="w-6 h-6 text-primary"/> KYC Verification</CardTitle><CardDescription>Verify your identity to unlock all investment features.</CardDescription></CardHeader>
                        <CardContent>
                            <KycForm onUpload={onKycUpload} status={kycStatus}/>
                        </CardContent>
                    </Card>
                     <Card className="bg-white">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3"><Landmark className="w-6 h-6 text-primary"/> Bank Details</CardTitle>
                            <CardDescription>Your details for withdrawals.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {bankAccounts.map(account => (
                               <div key={account.id} className="flex items-center justify-between p-3 rounded-md bg-background">
                                   <div>
                                       <p className="font-semibold">{account.bankName}</p>
                                       <p className="text-sm text-muted-foreground">{account.accountNumber}</p>
                                   </div>
                                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive" onClick={() => handleRemoveBankAccount(account.id)}>
                                        <Trash2 className="w-4 h-4"/>
                                    </Button>
                               </div>
                            ))}

                             <Dialog open={isBankDialogOpen} onOpenChange={setBankDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button variant="outline" className="w-full mt-4">Add Bank Account</Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Add New Bank Account</DialogTitle>
                                        <DialogDescription>
                                            Link your bank account for seamless withdrawals.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <BankAccountForm onSave={handleAddBankAccount} />
                                </DialogContent>
                            </Dialog>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
