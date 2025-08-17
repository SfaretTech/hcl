import Image from 'next/image';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { AIAssistant } from '@/components/ai-assistant';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Bot } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function ProductPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <section id="platform" className="bg-white py-16 sm:py-24">
          <div className="container">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <Badge variant="secondary" className="mb-4">Our Technology</Badge>
                <h1 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Our Digital Health Ecosystem</h1>
                <p className="mt-4 text-lg text-muted-foreground">
                  HCOM technology infrastructure is built on a secure, scalable, and cloud-based architecture that integrates AI-powered diagnostics, real-time consultation modules, encrypted communication channels, and automated backend workflows
                </p>
                <div className="mt-8 space-y-6">
                  <Card className="bg-background/50 transition-transform transform hover:-translate-y-2 hover:shadow-xl">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3 font-headline"><Download className="h-6 w-6 text-primary"/> HCOM HealthTech App</CardTitle>
                      <CardDescription>Your central hub for virtual consultations, remote diagnostics, e-prescriptions, and health records. Secure, user-friendly, and powerful.</CardDescription>
                    </CardHeader>
                  </Card>
                   <Card className="bg-background/50 transition-transform transform hover:-translate-y-2 hover:shadow-xl">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3 font-headline"><Bot className="h-6 w-6 text-primary"/> PAHC Health Companion</CardTitle>
                      <CardDescription>Your Personalized AI-Driven Health Companion offers real-time advice, health monitoring, and support based on your unique health profile.</CardDescription>
                    </CardHeader>
                  </Card>
                </div>
              </div>
              <div className="flex justify-center">
                 <Image src="https://placehold.co/500x500.png" width={500} height={500} alt="HCOM App interface" data-ai-hint="app interface" className="rounded-2xl shadow-2xl" />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <AIAssistant />
    </div>
  );
}
