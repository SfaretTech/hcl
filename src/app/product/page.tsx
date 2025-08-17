import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { AIAssistant } from '@/components/ai-assistant';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Construction } from 'lucide-react';

export default function ProductPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <Header />
      <main className="flex-1 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
           {/* You can replace this with a more sophisticated background pattern */}
           <div className="absolute h-64 w-64 bg-primary/20 rounded-full -top-16 -left-16 blur-2xl"></div>
           <div className="absolute h-64 w-64 bg-accent/20 rounded-full -bottom-16 -right-16 blur-2xl"></div>
           <div className="absolute h-48 w-48 bg-secondary/20 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-2xl"></div>
        </div>
        <div className="text-center z-10 p-4">
           <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-primary/10 mb-8 border-4 border-primary/20">
            <Construction className="h-10 w-10 text-primary" />
          </div>
          <h1 className="font-headline text-5xl font-bold tracking-tight text-foreground sm:text-6xl md:text-7xl">
            Coming Soon
          </h1>
          <p className="mt-4 max-w-xl mx-auto text-lg text-muted-foreground">
            We're building something amazing. Be the first to know when our new product launches.
          </p>
          <form className="mt-8 flex max-w-md mx-auto gap-2">
            <Input type="email" placeholder="Enter your email" className="flex-1" />
            <Button type="submit">Notify Me</Button>
          </form>
           <p className="mt-2 text-xs text-muted-foreground">We respect your privacy. No spam.</p>
        </div>
      </main>
      <Footer />
      <AIAssistant />
    </div>
  );
}
