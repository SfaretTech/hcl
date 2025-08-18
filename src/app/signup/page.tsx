
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Link from 'next/link';
import Image from 'next/image';

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
import { useToast } from '@/hooks/use-toast';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { AIAssistant } from '@/components/ai-assistant';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';


const clientSchema = z.object({
  fullName: z.string().min(2, { message: 'Full name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters.' }),
  dateOfBirth: z.string().min(1, { message: 'Date of birth is required.' }),
  phoneNumber: z.string().min(10, { message: 'Please enter a valid phone number.' }),
});

const professionalSchema = z.object({
  fullName: z.string().min(2, { message: 'Full name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters.' }),
  professionalTitle: z.string().min(2, { message: 'Professional title is required.' }),
  licenseNumber: z.string().min(1, { message: 'License number is required.' }),
  specialization: z.string().min(2, { message: 'Specialization is required.' }),
});

const investorSchema = z.object({
    fullName: z.string().min(2, { message: 'Full name must be at least 2 characters.' }),
    email: z.string().email({ message: 'Please enter a valid email address.' }),
    password: z.string().min(8, { message: 'Password must be at least 8 characters.' }),
    idType: z.enum(['nin', 'bvn'], { required_error: 'Please select an ID type.'}),
    idNumber: z.string().min(10, { message: 'Please enter a valid identification number.' }),
    phoneNumber: z.string().min(10, { message: 'Please enter a valid phone number.' }),
});


function ClientForm() {
    const { toast } = useToast();
    const form = useForm<z.infer<typeof clientSchema>>({
        resolver: zodResolver(clientSchema),
        defaultValues: { fullName: '', email: '', password: '', dateOfBirth: '', phoneNumber: '' },
    });

    function onSubmit(values: z.infer<typeof clientSchema>) {
        console.log('Client Account created:', values);
        toast({ title: "Account Created!", description: `Your client account has been successfully created.` });
        form.reset();
    }
    
    return (
        <Card>
            <CardHeader className="text-center">
                <CardTitle className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">Create Client Account</CardTitle>
                <CardDescription className="mt-2 text-muted-foreground">Join HCOM to manage your health journey.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField control={form.control} name="fullName" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="email" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email Address</FormLabel>
                                <FormControl><Input type="email" placeholder="john.doe@example.com" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="password" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl><Input type="password" placeholder="********" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="dateOfBirth" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Date of Birth</FormLabel>
                                <FormControl><Input type="date" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="phoneNumber" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl><Input type="tel" placeholder="+234..." {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <Button type="submit" size="lg" className="w-full font-bold">
                            Create Account
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};

function ProfessionalForm() {
    const { toast } = useToast();
    const form = useForm<z.infer<typeof professionalSchema>>({
        resolver: zodResolver(professionalSchema),
        defaultValues: { fullName: '', email: '', password: '', professionalTitle: '', licenseNumber: '', specialization: '' },
    });

    function onSubmit(values: z.infer<typeof professionalSchema>) {
        console.log('Professional Account created:', values);
        toast({ title: "Account Created!", description: `Your professional account has been successfully created.` });
        form.reset();
    }
    
    return (
        <Card>
            <CardHeader className="text-center">
                <CardTitle className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">Professional Registration</CardTitle>
                <CardDescription className="mt-2 text-muted-foreground">Join our network of licensed healthcare providers.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField control={form.control} name="fullName" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl><Input placeholder="Dr. Jane Smith" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="email" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email Address</FormLabel>
                                <FormControl><Input type="email" placeholder="jane.smith@example.com" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                         <FormField control={form.control} name="password" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl><Input type="password" placeholder="********" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                         <FormField control={form.control} name="professionalTitle" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Professional Title</FormLabel>
                                <FormControl><Input placeholder="e.g., Medical Doctor, Pharmacist" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="licenseNumber" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Medical License Number</FormLabel>
                                <FormControl><Input placeholder="MDCN/12345" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="specialization" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Specialization</FormLabel>
                                <FormControl><Input placeholder="e.g., General Practice, Radiology" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                         <Button type="submit" size="lg" className="w-full font-bold">
                            Create Account
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};


function InvestorForm() {
    const { toast } = useToast();
    const form = useForm<z.infer<typeof investorSchema>>({
        resolver: zodResolver(investorSchema),
        defaultValues: { fullName: '', email: '', password: '', idNumber: '', phoneNumber: '' },
    });

    function onSubmit(values: z.infer<typeof investorSchema>) {
        console.log('Investor Account created:', values);
        toast({ title: "Account Created!", description: `Your investor account has been successfully created.` });
        form.reset();
    }
    
    return (
        <Card>
            <CardHeader className="text-center">
                <CardTitle className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">Investor Registration</CardTitle>
                <CardDescription className="mt-2 text-muted-foreground">Join our RAFFIM program and invest in health.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField control={form.control} name="fullName" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl><Input placeholder="Adaeze Okoro" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="email" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email Address</FormLabel>
                                <FormControl><Input type="email" placeholder="ada.okoro@example.com" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                         <FormField control={form.control} name="password" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl><Input type="password" placeholder="********" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField
                            control={form.control}
                            name="idType"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Identification Type</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select ID type" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="nin">NIN (National Identification Number)</SelectItem>
                                            <SelectItem value="bvn">BVN (Bank Verification Number)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField control={form.control} name="idNumber" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Identification Number</FormLabel>
                                <FormControl><Input placeholder="Enter your ID number" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="phoneNumber" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl><Input type="tel" placeholder="+234..." {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <Button type="submit" size="lg" className="w-full font-bold">
                            Create Account
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};


export default function SignupPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <div className="container py-16 sm:py-24">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="hidden lg:flex justify-center">
                    <Image 
                        src="https://images.unsplash.com/photo-1576091160550-2173dba999ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxkb2N0b3J8ZW58MHx8fHwxNzU1NDc0MDA4fDA&ixlib=rb-4.1.0&q=80&w=1080"
                        width={500}
                        height={500}
                        alt="A doctor using a tablet"
                        data-ai-hint="doctor technology"
                        className="rounded-2xl shadow-2xl object-cover"
                    />
                </div>
                 <div className="max-w-md mx-auto w-full">
                    <Tabs defaultValue="client" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="client">Client</TabsTrigger>
                            <TabsTrigger value="professional">Professional</TabsTrigger>
                            <TabsTrigger value="investor">Investor</TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="client">
                           <ClientForm />
                        </TabsContent>
                        
                        <TabsContent value="professional">
                           <ProfessionalForm />
                        </TabsContent>

                        <TabsContent value="investor">
                            <InvestorForm />
                        </TabsContent>
                    </Tabs>
                    <p className="mt-8 text-center text-sm text-muted-foreground">
                        Already have an account?{' '}
                        <Link href="/login" className="font-semibold text-primary hover:underline">
                            Log in
                        </Link>
                    </p>
                 </div>
            </div>
        </div>
      </main>
      <Footer />
      <AIAssistant />
    </div>
  );
}
