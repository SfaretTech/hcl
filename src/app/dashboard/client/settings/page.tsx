
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Bell, Palette, UserCircle, LogOut, KeyRound } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const passwordSchema = z.object({
    currentPassword: z.string().min(1, 'Current password is required.'),
    newPassword: z.string().min(8, 'New password must be at least 8 characters.'),
    confirmPassword: z.string(),
}).refine(data => data.newPassword === data.confirmPassword, {
    message: "New passwords don't match.",
    path: ['confirmPassword'],
});


export default function ClientSettingsPage() {
    const { toast } = useToast();
    const router = useRouter();
    const [notificationSettings, setNotificationSettings] = useState({
        emailAppointmentReminder: true,
        emailNewMessage: true,
        emailResultsReady: true,
    });
    const [activeTheme, setActiveTheme] = useState('light');
    const [showLogoutToast, setShowLogoutToast] = useState(false);

    const passwordForm = useForm<z.infer<typeof passwordSchema>>({
      resolver: zodResolver(passwordSchema),
      defaultValues: { currentPassword: '', newPassword: '', confirmPassword: '' }
    })

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'light';
        setActiveTheme(savedTheme);
        document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }, []);

    useEffect(() => {
        if (showLogoutToast) {
            toast({
                title: "Logged Out",
                description: "You have been successfully logged out.",
            });
            router.push('/login');
        }
    }, [showLogoutToast, toast, router]);


    const handleThemeChange = (theme: 'light' | 'dark' | 'system') => {
        let newTheme = theme;
        if (theme === 'system') {
            newTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        
        setActiveTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.classList.toggle('dark', newTheme === 'dark');

        toast({
            title: "Theme Changed",
            description: `Switched to ${newTheme} theme.`,
        });
    };

    const handleNotificationChange = (id: keyof typeof notificationSettings) => {
        setNotificationSettings(prev => {
            const newSettings = { ...prev, [id]: !prev[id] };
            toast({
                title: 'Notification Settings Updated',
            });
            return newSettings;
        });
    }

    const handleLogout = () => {
        setShowLogoutToast(true);
    };

    function onPasswordSubmit(values: z.infer<typeof passwordSchema>) {
        console.log("Password change requested:", values);
        toast({
            title: "Password Updated",
            description: "Your password has been changed successfully.",
        });
        passwordForm.reset();
    }


    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight font-headline">Settings</h1>
                <p className="text-muted-foreground">Manage your account settings and preferences.</p>
            </div>

            <Card className="bg-white">
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <Bell className="w-6 h-6 text-primary"/>
                        <CardTitle>Notifications</CardTitle>
                    </div>
                    <CardDescription>Choose how you want to be notified about your account activity.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center justify-between p-4 rounded-lg bg-background">
                        <div>
                            <Label htmlFor="email-appointment-reminder" className="font-semibold">Appointment Reminders</Label>
                            <p className="text-sm text-muted-foreground">Notify me via email about upcoming appointments.</p>
                        </div>
                        <Switch 
                            id="email-appointment-reminder" 
                            checked={notificationSettings.emailAppointmentReminder}
                            onCheckedChange={() => handleNotificationChange('emailAppointmentReminder')}
                        />
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-lg bg-background">
                        <div>
                            <Label htmlFor="email-new-message" className="font-semibold">New Messages</Label>
                            <p className="text-sm text-muted-foreground">Notify me when I receive a new message from a doctor.</p>
                        </div>
                         <Switch 
                            id="email-new-message"
                            checked={notificationSettings.emailNewMessage}
                            onCheckedChange={() => handleNotificationChange('emailNewMessage')}
                        />
                    </div>
                     <div className="flex items-center justify-between p-4 rounded-lg bg-background">
                        <div>
                            <Label htmlFor="email-results-ready" className="font-semibold">New Health Records</Label>
                            <p className="text-sm text-muted-foreground">Notify me when a new document is added to my health records.</p>
                        </div>
                        <Switch 
                            id="email-results-ready"
                            checked={notificationSettings.emailResultsReady}
                            onCheckedChange={() => handleNotificationChange('emailResultsReady')}
                        />
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-white">
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <KeyRound className="w-6 h-6 text-primary"/>
                        <CardTitle>Security</CardTitle>
                    </div>
                    <CardDescription>Manage your password.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...passwordForm}>
                        <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-6">
                        <div className="grid md:grid-cols-3 gap-6">
                            <FormField control={passwordForm.control} name="currentPassword" render={({ field }) => (
                                <FormItem><FormLabel>Current Password</FormLabel><FormControl><Input type="password" {...field} /></FormControl><FormMessage /></FormItem>
                            )}/>
                            <FormField control={passwordForm.control} name="newPassword" render={({ field }) => (
                                <FormItem><FormLabel>New Password</FormLabel><FormControl><Input type="password" {...field} /></FormControl><FormMessage /></FormItem>
                            )}/>
                            <FormField control={passwordForm.control} name="confirmPassword" render={({ field }) => (
                                <FormItem><FormLabel>Confirm New Password</FormLabel><FormControl><Input type="password" {...field} /></FormControl><FormMessage /></FormItem>
                            )}/>
                        </div>
                            <div className="flex justify-end">
                                <Button type="submit">Change Password</Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
            
            <Card className="bg-white">
                <CardHeader>
                     <div className="flex items-center gap-3">
                        <UserCircle className="w-6 h-6 text-primary"/>
                        <CardTitle>Account</CardTitle>
                    </div>
                    <CardDescription>Manage your personal profile and log out.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Button asChild variant="outline" className="w-full sm:w-auto">
                        <Link href="/dashboard/client/profile">Go to Profile</Link>
                    </Button>
                     <Separator />
                     <Button variant="destructive" className="w-full sm:w-auto" onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" /> Log Out
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}

