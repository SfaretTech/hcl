
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { X, MessageSquare, PlusCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { availableDoctors, type Doctor } from '@/components/schedule-appointment-form';
import Link from 'next/link';

// Helper to generate a URL-friendly slug from a name
const toSlug = (name: string) => name.toLowerCase().replace(/\s+/g, '-');

const DoctorCard = ({ doctor, onRemove }: { doctor: Doctor, onRemove: (doctor: Doctor) => void }) => {
    return (
         <Card className="bg-white hover:shadow-lg transition-shadow">
            <CardContent className="p-4 flex items-center gap-4">
                <Avatar className="w-16 h-16 border">
                    <AvatarImage src={doctor.avatar} alt={doctor.name} />
                    <AvatarFallback>{doctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="flex-grow">
                    <CardTitle className="font-headline text-lg hover:text-primary transition-colors">
                        <Link href={`/dashboard/professionals/${toSlug(doctor.name)}`}>
                            {doctor.name}
                        </Link>
                    </CardTitle>
                    <CardDescription>{doctor.specialty}</CardDescription>
                </div>
                 <div className="flex items-center gap-2">
                     <Button size="sm" asChild>
                        <Link href="/dashboard/messages">
                            <MessageSquare className="mr-2 h-4 w-4"/> Message
                        </Link>
                     </Button>
                    <Button size="sm" variant="ghost" className="text-muted-foreground" onClick={() => onRemove(doctor)}>
                        <X className="mr-2 h-4 w-4"/>Remove
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default function MyProfessionalsPage() {
    const { toast } = useToast();
    
    // In a real app, this would come from a user data store/context
    const [myDoctors, setMyDoctors] = useState<Doctor[]>([availableDoctors[0]]);

     const handleRemoveDoctor = (doctor: Doctor) => {
        setMyDoctors(prev => prev.filter(d => d.name !== doctor.name));
        toast({
            title: "Doctor Removed",
            description: `${doctor.name} has been removed from your list.`,
            variant: "destructive",
        });
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                 <div>
                    <h1 className="text-3xl font-bold tracking-tight font-headline">My Doctors</h1>
                    <p className="text-muted-foreground">Manage your saved professionals and start a conversation.</p>
                </div>
                <Button size="lg" asChild>
                    <Link href="/dashboard/professionals/find">
                        <PlusCircle className="mr-2 h-5 w-5"/> Find a New Professional
                    </Link>
                </Button>
            </div>
            
            <section>
                {myDoctors.length > 0 ? (
                    <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
                        {myDoctors.map(doctor => (
                            <DoctorCard 
                                key={doctor.name} 
                                doctor={doctor}
                                onRemove={handleRemoveDoctor}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 border-2 border-dashed rounded-lg">
                        <h2 className="text-xl font-semibold mb-2">Your network is empty</h2>
                        <p className="text-muted-foreground mb-4">Add professionals to your list to quickly schedule appointments and message them.</p>
                        <Button asChild>
                            <Link href="/dashboard/professionals/find">
                                <PlusCircle className="mr-2 h-4 w-4"/> Find Professionals
                            </Link>
                        </Button>
                    </div>
                )}
            </section>
        </div>
    );
}
