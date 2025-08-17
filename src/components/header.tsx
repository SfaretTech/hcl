
'use client';

import { HeartPulse, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from './ui/sheet';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/product', label: 'Product' },
  { href: '/outreach', label: 'Outreach' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const [isSheetOpen, setSheetOpen] = useState(false);
  const pathname = usePathname();

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
              className={cn(
                "transition-colors hover:text-primary",
                pathname === link.href ? "text-primary font-semibold" : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        
        <div className="hidden md:flex items-center ml-4">
            <Button asChild>
                <Link href="/signup">Register/Signup</Link>
            </Button>
        </div>


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
                        className={cn(
                            "font-medium transition-colors hover:text-primary text-lg",
                            pathname === link.href ? "text-primary" : "text-foreground"
                        )}
                      >
                        {link.label}
                      </Link>
                    </SheetClose>
                  ))}
                   <SheetClose asChild>
                      <Link
                        href="/career"
                        className={cn(
                            "font-medium transition-colors hover:text-primary text-lg",
                            pathname === "/career" ? "text-primary" : "text-foreground"
                        )}
                      >
                        Career
                      </Link>
                    </SheetClose>
                </nav>
                <div className="p-4 mt-auto">
                    <SheetClose asChild>
                        <Button asChild className="w-full">
                            <Link href="/signup">Register/Signup</Link>
                        </Button>
                    </SheetClose>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
