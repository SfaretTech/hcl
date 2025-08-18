
'use client';

import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { Button, buttonVariants } from './ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from './ui/sheet';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Logo } from './logo';

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

  const isDashboard = pathname.startsWith('/dashboard');

  if (isDashboard) {
    return (
       <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 lg:hidden">
            <div className="container flex h-16 items-center">
                 <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
                    <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <Menu className="h-6 w-6" />
                        <span className="sr-only">Open menu</span>
                    </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-[280px] p-0">
                         <div className="flex flex-col h-full">
                            <div className="h-16 flex items-center px-6 border-b">
                                <Link href="/" className="flex items-center gap-2">
                                <Logo className="h-7 w-7 text-primary" />
                                <span className="font-bold text-xl font-headline">HCOM</span>
                            </Link>
                            </div>
                           <nav className="flex-1 px-4 py-4 space-y-2">
                                {[{
                                    title: 'Dashboard',
                                    href: '/dashboard',
                                    icon: 'LayoutGrid'
                                },
                                {
                                    title: 'Appointments',
                                    href: '/dashboard/appointments',
                                    icon: 'CalendarDays'
                                },
                                {
                                    title: 'Messages',
                                    href: '/dashboard/messages',
                                    icon: 'MessageSquare'
                                },
                                {
                                    title: 'Health Records',
                                    href: '/dashboard/records',
                                    icon: 'FileText'
                                },
                                {
                                    title: 'Profile',
                                    href: '/dashboard/profile',
                                    icon: 'User'
                                }].map((item) => (
                                    <SheetClose asChild key={item.href}>
                                        <Link
                                            href={item.href}
                                             className={cn(
                                                buttonVariants({ variant: 'ghost' }),
                                                'w-full justify-start text-base',
                                                pathname === item.href && 'bg-primary/10 text-primary hover:bg-primary/20'
                                            )}
                                        >
                                           {item.title}
                                        </Link>
                                    </SheetClose>
                                ))}
                            </nav>
                             <div className="p-4 mt-auto border-t">
                                <SheetClose asChild>
                                    <Button asChild className="w-full justify-start text-base mb-2">
                                        <Link href="/dashboard/settings">Settings</Link>
                                    </Button>
                                </SheetClose>
                                <SheetClose asChild>
                                    <Button variant="outline" className="w-full justify-start text-base">Logout</Button>
                                </SheetClose>
                             </div>
                         </div>
                    </SheetContent>
                </Sheet>
            </div>
       </header>
    )
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center gap-2 mr-auto">
          <Logo className="h-7 w-7 text-primary" />
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
            <Button variant="ghost" asChild className="rounded-r-none border-r-0">
                <Link href="/login">Log In</Link>
            </Button>
            <Button asChild className="rounded-l-none">
                <Link href="/signup">Register</Link>
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
                    <Logo className="h-6 w-6 text-primary" />
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
                </nav>
                <div className="p-4 mt-auto border-t">
                    <SheetClose asChild>
                         <Button asChild className="w-full mb-2">
                            <Link href="/signup">Register</Link>
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
