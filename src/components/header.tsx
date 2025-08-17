'use client';

import { HeartPulse, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from './ui/sheet';
import { useState } from 'react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '#platform', label: 'Platform' },
  { href: '/services', label: 'Services' },
  { href: '/outreach', label: 'Outreach' },
  { href: '#contact', label: 'Contact' },
];

export function Header() {
  const [isSheetOpen, setSheetOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center gap-2 mr-auto">
          <HeartPulse className="h-7 w-7 text-primary" />
          <span className="font-bold text-xl font-headline">HCOM</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => (
             <Link
              key={link.href}
              href={link.href}
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="md:hidden ml-4">
          <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px]">
              <div className="flex flex-col h-full">
                 <div className="flex items-center justify-between p-4 border-b">
                   <Link href="/" className="flex items-center gap-2">
                    <HeartPulse className="h-6 w-6 text-primary" />
                    <span className="font-bold text-lg font-headline">HCOM</span>
                  </Link>
                   <SheetClose asChild>
                     <Button variant="ghost" size="icon">
                        <X className="h-6 w-6" />
                        <span className="sr-only">Close menu</span>
                      </Button>
                   </SheetClose>
                 </div>
                <nav className="flex flex-col gap-4 p-4 mt-4">
                   {navLinks.map((link) => (
                    <SheetClose asChild key={link.href}>
                      <Link
                        href={link.href}
                        className="text-lg font-medium text-foreground transition-colors hover:text-primary"
                      >
                        {link.label}
                      </Link>
                    </SheetClose>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
