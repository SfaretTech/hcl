
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, Trash2, XCircle, MessageSquare, CalendarDays, CheckCircle2 } from 'lucide-react';
import { allNotifications, type Notification } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

const iconMap: Record<string, React.ElementType> = {
    'MessageSquare': MessageSquare,
    'CalendarDays': CalendarDays,
    'CheckCircle2': CheckCircle2,
};


export default function NotificationsPage() {
    const { toast } = useToast();
    const [notifications, setNotifications] = useState<Notification[]>(allNotifications);

    const handleDelete = (id: string) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
        toast({
            title: "Notification Deleted",
            description: "The notification has been removed from your inbox.",
            variant: "destructive"
        });
    }

    const handleClearAll = () => {
        setNotifications([]);
        toast({
            title: "All Notifications Cleared",
            description: "Your inbox is now empty.",
        });
    }
    
    const getIcon = (iconName: string) => {
        const Icon = iconMap[iconName];
        return Icon ? <Icon /> : <Bell />;
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight font-headline">Notifications</h1>
                    <p className="text-muted-foreground">Manage your account alerts and updates.</p>
                </div>
                {notifications.length > 0 && (
                    <Button variant="outline" onClick={handleClearAll}>
                        <XCircle className="mr-2 h-4 w-4" /> Clear All
                    </Button>
                )}
            </div>

            <Card className="bg-white">
                <CardHeader>
                    <CardTitle>Inbox</CardTitle>
                    <CardDescription>You have {notifications.length} unread notifications.</CardDescription>
                </CardHeader>
                <CardContent>
                    {notifications.length > 0 ? (
                        <ul className="space-y-4">
                           {notifications.map(notif => (
                               <li key={notif.id} className="flex items-start gap-4 p-4 rounded-lg bg-background hover:bg-secondary/80 transition-colors">
                                   <div className={cn("w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1", {
                                       'text-primary': !notif.read,
                                       'text-muted-foreground': notif.read,
                                   })}>
                                       {getIcon(notif.icon)}
                                   </div>
                                   <div className="flex-1">
                                       <p className="font-medium">{notif.title}</p>
                                       <p className="text-sm text-muted-foreground line-clamp-2">{notif.description}</p>
                                   </div>
                                    <div className="text-right flex flex-col items-end gap-2">
                                        <p className="text-xs text-muted-foreground">{notif.time}</p>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => handleDelete(notif.id)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                               </li>
                           ))}
                        </ul>
                    ) : (
                         <div className="text-center py-16">
                            <Bell className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                            <h2 className="text-xl font-semibold">All caught up!</h2>
                            <p className="text-muted-foreground mt-2">You have no new notifications.</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
