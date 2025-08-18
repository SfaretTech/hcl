
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Bell, Palette, UserCircle, LogOut } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';


export default function SettingsPage() {
    const { toast } = useToast();
    const router = useRouter();
    const [notificationSettings, setNotificationSettings] = useState({
        email: true,
        sms: true,
        push: false,
    });
    const [activeTheme, setActiveTheme] = useState('light');

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'light';
        setActiveTheme(savedTheme);
        document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }, []);


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
                description: `${id.charAt(0).toUpperCase() + id.slice(1)} notifications ${newSettings[id] ? 'enabled' : 'disabled'}.`
            });
            return newSettings;
        });
    }

    const handleLogout = () => {
        toast({
            title: "Logged Out",
            description: "You have been successfully logged out.",
        });
        router.push('/login');
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight font-headline">Settings</h1>
                <p className="text-muted-foreground">Manage your account settings, notifications, and appearance.</p>
            </div>

            <Card className="bg-white">
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <Bell className="w-6 h-6 text-primary"/>
                        <CardTitle>Notifications</CardTitle>
                    </div>
                    <CardDescription>Choose how you want to be notified about appointments, messages, and updates.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center justify-between p-4 rounded-lg bg-background">
                        <div>
                            <Label htmlFor="email-notifications" className="font-semibold">Email Notifications</Label>
                            <p className="text-sm text-muted-foreground">Receive updates and reminders via email.</p>
                        </div>
                        <Switch 
                            id="email-notifications" 
                            checked={notificationSettings.email}
                            onCheckedChange={() => handleNotificationChange('email')}
                        />
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-lg bg-background">
                        <div>
                            <Label htmlFor="sms-notifications" className="font-semibold">SMS Reminders</Label>
                            <p className="text-sm text-muted-foreground">Get appointment reminders via text message.</p>
                        </div>
                        <Switch 
                            id="sms-notifications"
                            checked={notificationSettings.sms}
                            onCheckedChange={() => handleNotificationChange('sms')}
                        />
                    </div>
                     <div className="flex items-center justify-between p-4 rounded-lg bg-background">
                        <div>
                            <Label htmlFor="push-notifications" className="font-semibold">Push Notifications</Label>
                            <p className="text-sm text-muted-foreground">Get real-time alerts on your device.</p>
                        </div>
                         <Switch 
                            id="push-notifications"
                            checked={notificationSettings.push}
                            onCheckedChange={() => handleNotificationChange('push')}
                        />
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-white">
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <Palette className="w-6 h-6 text-primary"/>
                        <CardTitle>Appearance</CardTitle>
                    </div>
                    <CardDescription>Customize the look and feel of your dashboard.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid sm:grid-cols-3 gap-4">
                        <Button variant={activeTheme === 'light' ? 'secondary' : 'outline'} onClick={() => handleThemeChange('light')}>Light Mode</Button>
                        <Button variant={activeTheme === 'dark' ? 'secondary' : 'outline'} onClick={() => handleThemeChange('dark')}>Dark Mode</Button>
                        <Button variant="outline" onClick={() => handleThemeChange('system')}>System Default</Button>
                    </div>
                </CardContent>
            </Card>
            
            <Card className="bg-white">
                <CardHeader>
                     <div className="flex items-center gap-3">
                        <UserCircle className="w-6 h-6 text-primary"/>
                        <CardTitle>Account</CardTitle>
                    </div>
                    <CardDescription>Manage your personal information and log out.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Button asChild variant="outline" className="w-full sm:w-auto">
                        <Link href="/dashboard/profile">Go to Profile Settings</Link>
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
