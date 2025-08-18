
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { AIAssistant } from '@/components/ai-assistant';
import { Button } from '@/components/ui/button';
import { MailCheck } from 'lucide-react';
import Link from 'next/link';

export default function VerifyAccountPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <Header />
      <main className="flex-1 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
           <div className="absolute h-64 w-64 bg-primary/20 rounded-full -top-16 -left-16 blur-2xl"></div>
           <div className="absolute h-64 w-64 bg-accent/20 rounded-full -bottom-16 -right-16 blur-2xl"></div>
           <div className="absolute h-48 w-48 bg-secondary/20 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-2xl"></div>
        </div>
        <div className="text-center z-10 p-4">
           <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-primary/10 mb-8 border-4 border-primary/20">
            <MailCheck className="h-10 w-10 text-primary" />
          </div>
          <h1 className="font-headline text-5xl font-bold tracking-tight text-foreground sm:text-6xl md:text-7xl">
            Verify Your Email
          </h1>
          <p className="mt-4 max-w-xl mx-auto text-lg text-muted-foreground">
            We've sent a verification link to your email address. Please check your inbox and follow the instructions to activate your account.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 max-w-md mx-auto">
            <Button asChild size="lg" className="w-full">
              <Link href="/login">Back to Login</Link>
            </Button>
            <p className="text-sm text-muted-foreground">
                Didn't receive an email? <Button variant="link" className="p-0 h-auto">Resend verification link</Button>
            </p>
          </div>
           <p className="mt-4 text-xs text-muted-foreground">Make sure to check your spam folder.</p>
        </div>
      </main>
      <Footer />
      <AIAssistant />
    </div>
  );
}
