
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';


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
import { Checkbox } from '@/components/ui/checkbox';


const clientSchema = z.object({
  fullName: z.string().min(2, { message: 'Full name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  dateOfBirth: z.string().min(1, { message: 'Date of birth is required.' }),
  phoneNumber: z.string().min(10, { message: 'Please enter a valid phone number.' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters.' }),
  confirmPassword: z.string(),
  terms: z.literal(true, {
    errorMap: () => ({ message: 'You must accept the terms and conditions' }),
  }),
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

const professionalSchema = z.object({
  fullName: z.string().min(2, { message: 'Full name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  professionalTitle: z.string().min(2, { message: 'Professional title is required.' }),
  licenseNumber: z.string().min(1, { message: 'License number is required.' }),
  specialization: z.string().min(2, { message: 'Specialization is required.' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters.' }),
  confirmPassword: z.string(),
  terms: z.literal(true, {
    errorMap: () => ({ message: 'You must accept the terms and conditions' }),
  }),
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

const investorSchema = z.object({
  fullName: z.string().min(2, { message: 'Full name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
   investmentInterest: z.string().min(1, { message: 'Please select an investment interest.' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters.' }),
  confirmPassword: z.string(),
  terms: z.literal(true, {
    errorMap: () => ({ message: 'You must accept the terms and conditions' }),
  }),
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});


function ClientForm() {
    const { toast } = useToast();
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const form = useForm<z.infer<typeof clientSchema>>({
        resolver: zodResolver(clientSchema),
        defaultValues: { fullName: '', email: '', dateOfBirth: '', phoneNumber: '', password: '', confirmPassword: '', terms: false },
    });

    function onSubmit(values: z.infer<typeof clientSchema>) {
        console.log('Client Account created:', values);
        toast({ title: "Account Created!", description: "Redirecting you to the login page..." });
        form.reset();
        router.push('/login');
    }
    
    return (
        <Card className="shadow-lg border-transparent">
            <CardHeader className="text-center">
                <CardTitle className="font-headline text-2xl font-bold">Create Client Account</CardTitle>
                <CardDescription>Join HCOM to manage your health journey.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                        <FormField control={form.control} name="password" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input type={showPassword ? 'text' : 'password'} placeholder="********" {...field} />
                                        <Button type="button" variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7" onClick={() => setShowPassword(!showPassword)}>
                                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        </Button>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="confirmPassword" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input type={showPassword ? 'text' : 'password'} placeholder="********" {...field} />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField
                            control={form.control}
                            name="terms"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 pt-2">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                    <FormLabel>
                                    I agree to the <Link href="/terms" className="text-primary hover:underline">Terms & Conditions</Link>
                                    </FormLabel>
                                    <FormMessage />
                                </div>
                                </FormItem>
                            )}
                        />
                        <Button type="submit" size="lg" className="w-full font-bold mt-6">
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
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const form = useForm<z.infer<typeof professionalSchema>>({
        resolver: zodResolver(professionalSchema),
        defaultValues: { fullName: '', email: '', professionalTitle: '', licenseNumber: '', specialization: '', password: '', confirmPassword: '', terms: false },
    });

    function onSubmit(values: z.infer<typeof professionalSchema>) {
        console.log('Professional Account created:', values);
        toast({ title: "Account Created!", description: "Redirecting you to the login page..." });
        form.reset();
        router.push('/login');
    }
    
    return (
        <Card className="shadow-lg border-transparent">
            <CardHeader className="text-center">
                <CardTitle className="font-headline text-2xl font-bold">Professional Registration</CardTitle>
                <CardDescription>Join our network of licensed healthcare providers.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                         <FormField control={form.control} name="password" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input type={showPassword ? 'text' : 'password'} placeholder="********" {...field} />
                                         <Button type="button" variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7" onClick={() => setShowPassword(!showPassword)}>
                                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        </Button>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="confirmPassword" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input type={showPassword ? 'text' : 'password'} placeholder="********" {...field} />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField
                            control={form.control}
                            name="terms"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 pt-2">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                    <FormLabel>
                                     I agree to the <Link href="/terms" className="text-primary hover:underline">Terms & Conditions</Link>
                                    </FormLabel>
                                    <FormMessage />
                                </div>
                                </FormItem>
                            )}
                        />
                         <Button type="submit" size="lg" className="w-full font-bold mt-6">
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
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const form = useForm<z.infer<typeof investorSchema>>({
        resolver: zodResolver(investorSchema),
        defaultValues: { fullName: '', email: '', investmentInterest: '', password: '', confirmPassword: '', terms: false },
    });

    function onSubmit(values: z.infer<typeof investorSchema>) {
        console.log('Investor Account created:', values);
        toast({ title: "Account Created!", description: "Redirecting you to the login page..." });
        form.reset();
        router.push('/login');
    }
    
    return (
        <Card className="shadow-lg border-transparent">
            <CardHeader className="text-center">
                <CardTitle className="font-headline text-2xl font-bold">Become an Investor</CardTitle>
                <CardDescription>Join our mission to revolutionize healthcare in Nigeria.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                         <FormField
                            control={form.control}
                            name="investmentInterest"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Investment Interest</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select an area of interest" />
                                    </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="raffim">RAFFIM Program</SelectItem>
                                        <SelectItem value="equity">Company Equity</SelectItem>
                                        <SelectItem value="outreach">Outreach Sponsorship</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField control={form.control} name="password" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input type={showPassword ? 'text' : 'password'} placeholder="********" {...field} />
                                         <Button type="button" variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7" onClick={() => setShowPassword(!showPassword)}>
                                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        </Button>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="confirmPassword" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input type={showPassword ? 'text' : 'password'} placeholder="********" {...field} />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField
                            control={form.control}
                            name="terms"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 pt-2">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                    <FormLabel>
                                     I agree to the <Link href="/terms" className="text-primary hover:underline">Terms & Conditions</Link>
                                    </FormLabel>
                                    <FormMessage />
                                </div>
                                </FormItem>
                            )}
                        />
                         <Button type="submit" size="lg" className="w-full font-bold mt-6">
                            Register Interest
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};


const accountImages: Record<string, {src: string, hint: string}> = {
  client: {
    src: "https://images.unsplash.com/photo-1521790797524-b2497295b8a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxDbGllbnR8ZW58MHx8fHwxNzU1NDc1NjA2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    hint: "happy clients"
  },
  professional: {
    src: "https://images.unsplash.com/photo-1666886573230-2b730505f298?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxoZWFsdGhjYXJlJTIwcHJvdmlkZXJzfGVufDB8fHx8MTc1NTQ3NTc2Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    hint: "healthcare professional"
  },
  investor: {
    src: "https://images.unsplash.com/photo-1579621970795-87f91d258143?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxpbnZlc3RvcnxlbnwwfHx8fDE3NTU0NzU4MjF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    hint: "investment growth"
  },
}

export default function SignupPage() {
  const [activeTab, setActiveTab] = useState('client');
  
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <div className="container py-16 sm:py-24">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="hidden lg:flex justify-center">
                    <Image 
                        src={accountImages[activeTab].src}
                        width={500}
                        height={600}
                        alt="A diverse group of people smiling"
                        data-ai-hint={accountImages[activeTab].hint}
                        className="rounded-2xl shadow-2xl object-cover h-full max-h-[700px]"
                    />
                </div>
                 <div className="w-full">
                    <Tabs defaultValue="client" className="w-full" onValueChange={setActiveTab}>
                        <TabsList className="grid w-full grid-cols-3 mb-6">
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
