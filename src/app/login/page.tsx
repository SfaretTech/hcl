
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';


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

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(1, { message: 'Password is required.' }),
});

export default function LoginPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [role, setRole] = useState('client');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log('Login submitted for role', role, 'with values:', values);
    toast({
      title: "Logged In Successfully!",
      description: "Redirecting to your dashboard...",
    });
    
    switch(role) {
      case 'professional':
        router.push('/dashboard/professional');
        break;
      case 'investor':
        // As there is no investor dashboard yet, redirecting to the client dashboard
        router.push('/dashboard');
        break;
      case 'client':
      default:
        router.push('/dashboard');
        break;
    }
  }

  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <div className="container py-16 sm:py-24">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="hidden lg:flex justify-center">
                    <Image 
                        src="https://images.unsplash.com/photo-1554734867-bf3c00a49371?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxoZWFsdGhjYXJlJTIwdGVjaG5vbG9neXxlbnwwfHx8fDE3NTU0NzQxODB8MA&ixlib=rb-4.1.0&q=80&w=1080"
                        width={500}
                        height={500}
                        alt="Healthcare professional using a laptop"
                        data-ai-hint="healthcare technology"
                        className="rounded-2xl shadow-2xl object-cover"
                    />
                </div>
                 <div>
                    <div className="max-w-md mx-auto">
                        <div className="text-center mb-8">
                            <h1 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">Welcome Back</h1>
                            <p className="mt-2 text-muted-foreground">Log in to access your HCOM account.</p>
                        </div>

                        <Tabs defaultValue="client" className="w-full" onValueChange={setRole}>
                            <TabsList className="grid w-full grid-cols-3 mb-6">
                                <TabsTrigger value="client">Client</TabsTrigger>
                                <TabsTrigger value="professional">Professional</TabsTrigger>
                                <TabsTrigger value="investor">Investor</TabsTrigger>
                            </TabsList>
                        </Tabs>

                        <Form {...form}>
                          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                              name="password"
                              render={({ field }) => (
                                <FormItem>
                                  <div className="flex justify-between items-baseline">
                                      <FormLabel>Password</FormLabel>
                                      <Link href="#" className="text-sm font-medium text-primary hover:underline">Forgot password?</Link>
                                  </div>
                                  <FormControl>
                                    <Input type="password" placeholder="********" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <Button type="submit" size="lg" className="w-full font-bold">
                              Log In as {role.charAt(0).toUpperCase() + role.slice(1)}
                            </Button>
                          </form>
                        </Form>
                         <p className="mt-8 text-center text-sm text-muted-foreground">
                            Don't have an account?{' '}
                            <Link href="/signup" className="font-semibold text-primary hover:underline">
                                Sign up now
                            </Link>
                        </p>
                    </div>
                 </div>
            </div>
        </div>
      </main>
      <Footer />
      <AIAssistant />
    </div>
  );
}
