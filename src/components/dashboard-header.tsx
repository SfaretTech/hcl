
'use client';

import { Menu, LayoutGrid, CalendarDays, MessageSquare, FileText, User, UserSearch, UserPlus, Settings, Bell, CheckCircle2, LogOut, ShoppingCart, CreditCard, CheckCircle, Briefcase, ShoppingBag, Package, PackagePlus, DollarSign, PieChart, ShieldCheck, Wallet } from 'lucide-react';
import Link from 'next/link';
import { Button, buttonVariants } from './ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetHeader, SheetTitle } from './ui/sheet';
import { useState, useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Logo } from './logo';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Separator } from './ui/separator';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { allNotifications } from '@/lib/data';

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
        title: 'Notifications',
        href: '/dashboard/notifications',
        icon: Bell
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
    {
        title: 'Appointments',
        href: '/dashboard/professional/appointments',
        icon: CalendarDays
    },
    {
        title: 'Notifications',
        href: '/dashboard/notifications',
        icon: Bell
    },
    {
        title: 'Messaging',
        href: '/dashboard/professional/messages',
        icon: MessageSquare
    },
    {
        title: 'Patient Records',
        href: '/dashboard/professional/records',
        icon: FileText
    },
    {
        title: 'Shop',
        href: '/dashboard/professional/shop?role=professional',
        icon: ShoppingCart
    },
    {
        title: 'Marketplace',
        href: '/dashboard/professional/marketplace',
        icon: ShoppingBag,
        subItems: [
            {
                title: 'My Products',
                href: '/dashboard/professional/marketplace/products',
                icon: Package,
            },
            {
                title: 'Add New Product',
                href: '/dashboard/professional/marketplace/products/new',
                icon: PackagePlus,
            },
            {
                title: 'Orders',
                href: '/dashboard/professional/marketplace/orders',
                icon: Briefcase,
            }
        ]
    }
];

const investorNavItems = [
    {
        title: 'Dashboard',
        href: '/dashboard/investor',
        icon: LayoutGrid
    },
    {
        title: 'Investments',
        href: '/dashboard/investor/investments',
        icon: DollarSign
    },
    {
        title: 'Analytics',
        href: '/dashboard/investor/analytics',
        icon: PieChart
    },
    {
        title: 'Wallet',
        href: '/dashboard/investor/wallet',
        icon: Wallet
    },
    {
        title: 'Profile & KYC',
        href: '/dashboard/investor/profile',
        icon: ShieldCheck
    },
];


const iconMap: Record<string, React.ElementType> = {
    'MessageSquare': MessageSquare,
    'CalendarDays': CalendarDays,
    'CheckCircle2': CheckCircle2,
};

const getIcon = (iconName: string) => {
    const Icon = iconMap[iconName];
    return Icon ? <Icon /> : <Bell />;
}

function Notifications({role}: {role: 'client' | 'professional' | 'investor'}) {
    const notifications = allNotifications;
    return (
        <Popover>
            <PopoverTrigger asChild>
                 <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    {notifications.filter(n => !n.read).length > 0 && (
                         <span className="absolute top-1 right-1 flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </span>
                    )}
                    <span className="sr-only">Notifications</span>
                </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-80">
                <div className="flex items-center justify-between px-2 pt-1 pb-2">
                    <h3 className="font-semibold">Notifications</h3>
                    <Button variant="link" size="sm" className="p-0 h-auto">Mark all as read</Button>
                </div>
                <div className="space-y-2">
                    {notifications.slice(0,3).map((notif, index) => (
                        <div key={index} className="flex items-start gap-3 p-2 rounded-lg hover:bg-secondary/50">
                            <div className="w-5 h-5 mt-1 text-muted-foreground flex-shrink-0">
                                {getIcon(notif.icon)}
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
                 <Button variant="outline" className="w-full" asChild>
                    <Link href="/dashboard/notifications">View all notifications</Link>
                </Button>
            </PopoverContent>
        </Popover>
    )
}

function UserNav({role}: {role: 'client' | 'professional' | 'investor'}) {
    const router = useRouter();
    const { toast } = useToast();
    const [showLogoutToast, setShowLogoutToast] = useState(false);

    useEffect(() => {
        if (showLogoutToast) {
            toast({
                title: "Logged Out",
                description: "You have been successfully logged out.",
            });
            router.push('/login');
        }
    }, [showLogoutToast, toast, router]);

    const handleLogout = () => {
        setShowLogoutToast(true);
    };
    
    let profileLink = '/dashboard/client/profile';
    let settingsLink = '/dashboard/client/settings';
    let userName = 'Jessica Peterson';
    let userEmail = 'jessica.peterson@example.com';
    let avatarFallback = 'JP';

    if (role === 'professional') {
        profileLink = '/dashboard/profile';
        settingsLink = '/dashboard/settings';
        userName = 'Dr. Chen';
        userEmail = 'dr.chen@hcom.com';
        avatarFallback = 'DC';
    } else if (role === 'investor') {
        profileLink = '/dashboard/investor/profile';
        settingsLink = '/dashboard/investor/settings';
        userName = 'Alex Johnson';
        userEmail = 'alex.j@invest.hcom.com';
        avatarFallback = 'AJ';
    }

    return (
         <DropdownMenu>
            <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                        <AvatarImage src={'https://placehold.co/100x100.png'} />
                        <AvatarFallback>{avatarFallback}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{userName}</p>
                        <p className="text-xs leading-none text-muted-foreground">{userEmail}</p>
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

const getRole = (pathname: string, roleQueryParam: string | null): 'client' | 'professional' | 'investor' => {
    if (pathname.startsWith('/dashboard/investor')) {
        return 'investor';
    }
    
    const professionalRoutes = [
        '/dashboard/professional',
        '/dashboard/profile',
        '/dashboard/settings',
    ];

    if (roleQueryParam === 'professional') return 'professional';
    if (professionalRoutes.some(route => pathname.startsWith(route))) return 'professional';

    const sharedShopRoutes = [
        '/dashboard/shop',
        '/dashboard/shop/cart',
        '/dashboard/shop/checkout',
        '/dashboard/shop/confirmation'
    ];

    if (sharedShopRoutes.some(route => pathname.startsWith(route)) && roleQueryParam === 'professional') {
        return 'professional';
    }
    
    return 'client';
}


export function DashboardHeader() {
  const [isSheetOpen, setSheetOpen] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();
  const [showLogoutToast, setShowLogoutToast] = useState(false);

  useEffect(() => {
    if (showLogoutToast) {
        toast({
            title: "Logged Out",
            description: "You have been successfully logged out.",
        });
        router.push('/login');
    }
  }, [showLogoutToast, toast, router]);

  const handleLogout = () => {
    setShowLogoutToast(true);
  };

  const role = getRole(pathname, searchParams.get('role'));
  
  let dashboardNavItems;
  if (role === 'investor') {
      dashboardNavItems = investorNavItems;
  } else if (role === 'professional') {
      dashboardNavItems = professionalNavItems;
  } else {
      dashboardNavItems = clientNavItems;
  }
  
  const settingsLink = role === 'professional' ? '/dashboard/settings' : (role === 'investor' ? '/dashboard/investor/settings' : '/dashboard/client/settings');

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
                                    {dashboardNavItems.map((item: any) => (
                                        item.subItems ? (
                                            <Accordion key={item.title} type="single" collapsible defaultValue={item.subItems?.some((sub: any) => pathname.startsWith(sub.href)) ? 'item-1' : ''}>
                                                <AccordionItem value="item-1" className="border-b-0">
                                                    <SheetClose asChild>
                                                        <Link
                                                            href={item.href}
                                                            className={cn(
                                                                buttonVariants({ variant: 'ghost' }),
                                                                'w-full justify-start text-base',
                                                                pathname.startsWith(item.href) && 'bg-primary/10 text-primary hover:bg-primary/20'
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
                                                        {item.subItems.map((subItem: any) => (
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
                                                href={settingsLink}
                                                className={cn(
                                                    buttonVariants({ variant: 'ghost' }),
                                                    'w-full justify-start',
                                                     pathname === settingsLink && 'bg-primary/10 text-primary hover:bg-primary/20'
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
                    {role !== 'investor' && (
                        <Button asChild variant="ghost" size="icon">
                            <Link href={role === 'professional' ? '/dashboard/shop/cart?role=professional' : '/dashboard/shop/cart'}>
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
