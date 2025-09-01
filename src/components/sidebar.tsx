
'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutGrid, CalendarDays, MessageSquare, FileText, User, Settings, LifeBuoy, LogOut, UserSearch, UserPlus, ShoppingCart, CreditCard, CheckCircle, Briefcase, Bell } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button, buttonVariants } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Logo } from './logo';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { useToast } from '@/hooks/use-toast';


const clientNavItems = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Appointments',
        href: '/dashboard/appointments',
        icon: CalendarDays,
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
        icon: MessageSquare,
    },
    {
        title: 'Health Records',
        href: '/dashboard/records',
        icon: FileText,
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
    }
];

const professionalRoutes = [
    '/dashboard/professional',
    '/dashboard/profile',
    '/dashboard/settings',
    '/dashboard/notifications'
];

const isProfessionalRoute = (pathname: string) => {
    return professionalRoutes.some(route => pathname.startsWith(route));
};

export function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const { toast } = useToast();
    
    // In a real app, role would come from a user session
    const role = isProfessionalRoute(pathname) ? 'professional' : 'client';


    const handleLogout = () => {
        toast({
            title: "Logged Out",
            description: "You have been successfully logged out.",
        });
        router.push('/login');
    };

    const isProfessionalsActive = pathname.startsWith('/dashboard/professionals');
    const isShopActive = pathname.startsWith('/dashboard/shop');

    const sidebarNavItems = role === 'professional' ? professionalNavItems : clientNavItems;
    const settingsLink = role === 'professional' ? '/dashboard/settings' : '/dashboard/client/settings';

    return (
        <aside className="hidden lg:flex flex-col w-64 border-r bg-card">
            <div className="flex-1 flex flex-col gap-y-7">
                <div className="h-16 flex items-center px-6 border-b">
                     <Link href="/" className="flex items-center gap-2">
                        <Logo className="h-7 w-7 text-primary" />
                        <span className="font-bold text-xl font-headline">HCOM</span>
                    </Link>
                </div>
                <nav className="flex-1 px-4 space-y-1">
                   {sidebarNavItems.map((item: any) => (
                    item.subItems ? (
                        <Accordion key={item.title} type="single" collapsible defaultValue={isProfessionalsActive || isShopActive ? 'item-1' : ''}>
                            <AccordionItem value="item-1" className="border-b-0">
                                <Link
                                    href={item.href}
                                    className={cn(
                                        buttonVariants({ variant: 'ghost' }),
                                        'w-full justify-start',
                                        pathname === item.href && 'bg-primary/10 text-primary hover:bg-primary/20'
                                    )}
                                >
                                     <AccordionTrigger className="w-full p-0 hover:no-underline justify-start">
                                         <div className="flex items-center">
                                            <item.icon className="mr-3 h-5 w-5" />
                                            {item.title}
                                         </div>
                                     </AccordionTrigger>
                                </Link>
                                <AccordionContent className="pb-0 pl-7 space-y-1">
                                    {item.subItems.map((subItem: any) => (
                                        <Link
                                            key={subItem.title}
                                            href={subItem.href}
                                            className={cn(
                                                buttonVariants({ variant: 'ghost' }),
                                                'w-full justify-start',
                                                pathname === subItem.href && 'bg-primary/10 text-primary hover:bg-primary/20'
                                            )}
                                        >
                                            <subItem.icon className="mr-3 h-5 w-5" />
                                            {subItem.title}
                                        </Link>
                                    ))}
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    ) : (
                       <Link
                           key={item.title}
                           href={item.href}
                           className={cn(
                               buttonVariants({ variant: 'ghost' }),
                               'w-full justify-start',
                               (pathname.startsWith(item.href) && item.href !== '/dashboard' && !item.href.endsWith('/professional')) && 'bg-primary/10 text-primary hover:bg-primary/20',
                               pathname === item.href && 'bg-primary/10 text-primary hover:bg-primary/20'
                           )}
                       >
                           <item.icon className="mr-3 h-5 w-5" />
                           {item.title}
                       </Link>
                    )
                   ))}
                </nav>
            </div>
             <div className="p-4 border-t">
                <Link
                    href={settingsLink}
                    className={cn(
                        buttonVariants({ variant: 'ghost' }),
                        'w-full justify-start mb-2',
                        pathname === settingsLink && 'bg-primary/10 text-primary hover:bg-primary/20'
                    )}
                    >
                    <Settings className="mr-3 h-5 w-5" />
                    Settings
                </Link>
                <Button variant="outline" className="w-full justify-start" onClick={handleLogout}>
                     <LogOut className="mr-3 h-5 w-5" />
                     Logout
                </Button>
            </div>
        </aside>
    )
}
