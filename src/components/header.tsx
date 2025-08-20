
'use client';

import { Menu, X, LayoutGrid, CalendarDays, MessageSquare, FileText, User, UserSearch, UserPlus, Settings, Bell, CheckCircle2, LogOut, ShoppingCart, CreditCard, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { Button, buttonVariants } from './ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetHeader, SheetTitle } from './ui/sheet';
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Logo } from './logo';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Separator } from './ui/separator';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/product', label: 'Product' },
  { href: '/outreach', label: 'Outreach' },
  { href: '/contact', label: 'Contact' },
];

const clientNavItems = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid
    },
    {
        title: 'Appointments',
        href: '/dashboard/appointments',
        icon: CalendarDays
    },
    {
        title: 'My Doctors',
        href: '/dashboard/professionals',
        icon: User,
         subItems: [
             {
                title: 'Find a Doctor',
                href: '/dashboard/professionals/find',
                icon: UserSearch,
            }
        ]
    },
    {
        title: 'Messages',
        href: '/dashboard/messages',
        icon: MessageSquare
    },
    {
        title: 'Health Records',
        href: '/dashboard/records',
        icon: FileText
    },
    {
        title: 'Shop',
        href: '/dashboard/shop',
        icon: ShoppingCart,
        subItems: [
            {
                title: 'Cart',
                href: '/dashboard/shop/cart',
                icon: ShoppingCart,
            },
            {
                title: 'Checkout',
                href: '/dashboard/shop/checkout',
                icon: CreditCard,
            },
            {
                title: 'Confirmation',
                href: '/dashboard/shop/confirmation',
                icon: CheckCircle,
            }
        ]
    },
];

const professionalNavItems = [
     {
        title: 'Dashboard',
        href: '/dashboard/professional',
        icon: LayoutGrid
    },
    // Add more professional-specific nav items here
]


const notifications = [
    {
        icon: MessageSquare,
        title: "New message from Dr. Samuel Chen",
        description: "Hi Jessica, please find your latest test results attached...",
        time: "2 hours ago",
        read: false,
    },
    {
        icon: CheckCircle2,
        title: "Prescription Refilled",
        description: "Your prescription for Vitamin D has been refilled.",
        time: "1 day ago",
        read: true,
    },
    {
        icon: CalendarDays,
        title: "Appointment Confirmed",
        description: "Follow-up with Dr. Amina Khan on Oct 28, 2024.",
        time: "3 days ago",
        read: true,
    },
];

function Notifications({role}: {role: 'client' | 'professional'}) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Bell className="h-5 w-5" />
                    <span className="sr-only">Notifications</span>
                </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-80">
                <div className="flex items-center justify-between px-2 pt-1 pb-2">
                    <h3 className="font-semibold">Notifications</h3>
                    <Button variant="link" size="sm" className="p-0 h-auto">Mark all as read</Button>
                </div>
                <div className="space-y-2">
                    {notifications.map((notif, index) => (
                        <div key={index} className="flex items-start gap-3 p-2 rounded-lg hover:bg-secondary/50">
                            <div className="w-5 h-5 mt-1 text-muted-foreground flex-shrink-0">
                                <notif.icon />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium">{notif.title}</p>
                                <p className="text-xs text-muted-foreground">{notif.description}</p>
                                <p className="text-xs text-muted-foreground mt-1">{notif.time}</p>
                            </div>
                            {!notif.read && <div className="w-2 h-2 rounded-full bg-primary mt-1 flex-shrink-0"></div>}
                        </div>
                    ))}
                </div>
                 <Separator className="my-2" />
                 <Button variant="outline" className="w-full">View all notifications</Button>
            </PopoverContent>
        </Popover>
    )
}

function UserNav({role}: {role: 'client' | 'professional'}) {
    const router = useRouter();
    const { toast } = useToast();

    const handleLogout = () => {
        toast({
            title: "Logged Out",
            description: "You have been successfully logged out.",
        });
        router.push('/login');
    };
    
    const profileLink = role === 'professional' ? '/dashboard/professional/profile' : '/dashboard/profile';
    const settingsLink = role === 'professional' ? '/dashboard/professional/settings' : '/dashboard/settings';

    return (
         <DropdownMenu>
            <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                        <AvatarImage src={role === 'professional' ? 'https://placehold.co/100x100.png' : 'https://placehold.co/100x100.png'} />
                        <AvatarFallback>{role === 'professional' ? 'DC' : 'JP'}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{role === 'professional' ? 'Dr. Chen' : 'Jessica Peterson'}</p>
                        <p className="text-xs leading-none text-muted-foreground">{role === 'professional' ? 'dr.chen@hcom.com' : 'jessica.peterson@example.com'}</p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                    <Link href={profileLink}><User className="mr-2 h-4 w-4" />Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                        <Link href={settingsLink}><Settings className="mr-2 h-4 w-4" />Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export function Header() {
  const [isSheetOpen, setSheetOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();

  const handleLogout = () => {
    toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
    });
    router.push('/login');
  };

  const isDashboard = pathname.startsWith('/dashboard');
  const role = pathname.includes('/professional') ? 'professional' : 'client';
  const dashboardNavItems = role === 'professional' ? professionalNavItems : clientNavItems;


  if (isDashboard) {
    return (
       <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center">
                 <div className="lg:hidden">
                    <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
                        <SheetTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <Menu className="h-6 w-6" />
                            <span className="sr-only">Open menu</span>
                        </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-[280px] p-0">
                            <div className="flex flex-col h-full">
                                <SheetHeader className="h-16 flex items-center px-6 border-b">
                                    <SheetTitle>
                                        <Link href="/" className="flex items-center gap-2">
                                        <Logo className="h-7 w-7 text-primary" />
                                        <span className="font-bold text-xl font-headline">HCOM</span>
                                        </Link>
                                    </SheetTitle>
                                </SheetHeader>
                            <nav className="flex-1 px-4 py-4 space-y-1">
                                    {dashboardNavItems.map((item) => (
                                        item.subItems ? (
                                            <Accordion key={item.title} type="single" collapsible defaultValue={pathname.startsWith(item.href) ? 'item-1' : ''}>
                                                <AccordionItem value="item-1" className="border-b-0">
                                                    <SheetClose asChild>
                                                        <Link
                                                            href={item.href}
                                                            className={cn(
                                                                buttonVariants({ variant: 'ghost' }),
                                                                'w-full justify-start text-base',
                                                                pathname === item.href && 'bg-primary/10 text-primary hover:bg-primary/20'
                                                            )}
                                                        >
                                                            <AccordionTrigger className="w-full p-0 hover:no-underline justify-start text-base">
                                                                <div className="flex items-center">
                                                                    <item.icon className="mr-3 h-5 w-5" />
                                                                    {item.title}
                                                                </div>
                                                            </AccordionTrigger>
                                                        </Link>
                                                    </SheetClose>
                                                    <AccordionContent className="pb-0 pl-7 space-y-1">
                                                        {item.subItems.map(subItem => (
                                                            <SheetClose asChild key={subItem.href}>
                                                                <Link
                                                                    href={subItem.href}
                                                                    className={cn(
                                                                        buttonVariants({ variant: 'ghost' }),
                                                                        'w-full justify-start text-base',
                                                                        pathname === subItem.href && 'bg-primary/10 text-primary hover:bg-primary/20'
                                                                    )}
                                                                >
                                                                    <subItem.icon className="mr-3 h-5 w-5" />
                                                                    {subItem.title}
                                                                </Link>
                                                            </SheetClose>
                                                        ))}
                                                    </AccordionContent>
                                                </AccordionItem>
                                            </Accordion>
                                        ) : (
                                        <SheetClose asChild key={item.href}>
                                            <Link
                                                href={item.href}
                                                className={cn(
                                                    buttonVariants({ variant: 'ghost' }),
                                                    'w-full justify-start text-base',
                                                    pathname.startsWith(item.href) && !item.href.endsWith('professionals') && !item.href.endsWith('shop') && 'bg-primary/10 text-primary hover:bg-primary/20'
                                                )}
                                            >
                                            <item.icon className="mr-3 h-5 w-5" />
                                            {item.title}
                                            </Link>
                                        </SheetClose>
                                        )
                                    ))}
                                </nav>
                                <div className="p-4 mt-auto border-t">
                                    <SheetClose asChild>
                                        <Button asChild className="w-full justify-start text-base mb-2">
                                            <Link
                                                href={role === 'professional' ? '/dashboard/professional/settings' : '/dashboard/settings'}
                                                className={cn(
                                                    buttonVariants({ variant: 'ghost' }),
                                                    'w-full justify-start',
                                                    pathname === (role === 'professional' ? '/dashboard/professional/settings' : '/dashboard/settings') && 'bg-primary/10 text-primary hover:bg-primary/20'
                                                )}
                                            >
                                                <Settings className="mr-3 h-5 w-5" />
                                                Settings
                                            </Link>
                                        </Button>
                                    </SheetClose>
                                    <SheetClose asChild>
                                        <Button variant="outline" className="w-full justify-start text-base" onClick={handleLogout}>Logout</Button>
                                    </SheetClose>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                 </div>
                 <div className="flex items-center gap-2 ml-auto">
                    {role === 'client' && (
                        <Button asChild variant="ghost" size="icon">
                            <Link href="/dashboard/shop/cart">
                                <ShoppingCart className="h-5 w-5" />
                                <span className="sr-only">Cart</span>
                            </Link>
                        </Button>
                    )}
                    <Notifications role={role} />
                    <UserNav role={role} />
                 </div>
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
                 <SheetHeader className="flex flex-row items-center justify-between p-4 border-b">
                   <SheetTitle>
                    <Link href="/" className="flex items-center gap-2">
                        <Logo className="h-6 w-6 text-primary" />
                        <span className="font-bold text-lg font-headline">HCOM</span>
                    </Link>
                   </SheetTitle>
                   <SheetClose asChild>
                     <Button variant="ghost" size="icon">
                        <X className="h-6 w-6" />
                        <span className="sr-only">Close menu</span>
                      </Button>
                   </SheetClose>
                 </SheetHeader>
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
