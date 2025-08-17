import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { AIAssistant } from '@/components/ai-assistant';

export default function ProductPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <Header />
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-headline text-6xl font-bold tracking-tight text-foreground sm:text-7xl md:text-8xl">
            Coming Soon
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            We're working hard to bring you something amazing. Stay tuned!
          </p>
        </div>
      </main>
      <Footer />
      <AIAssistant />
    </div>
  );
}
