import { HeartPulse } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-white border-t">
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
           <Link href="/" className="flex items-center gap-2">
            <HeartPulse className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg font-headline">HCOM</span>
          </Link>
          <p className="text-sm text-muted-foreground">
            &copy; {year} HCOM. All rights reserved.
          </p>
           <div className="flex items-center gap-4">
            <Link href="#platform" className="text-sm text-muted-foreground hover:text-primary transition-colors">Platform</Link>
            <Link href="#outreach" className="text-sm text-muted-foreground hover:text-primary transition-colors">Outreach</Link>
            <Link href="#contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
