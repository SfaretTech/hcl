
'use client';

import { useParams } from 'next/navigation';
import { availableDoctors, Doctor } from '@/components/schedule-appointment-form';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarDays, Mail, MapPin, Phone, UserPlus, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import React from 'react';
import Link from 'next/link';

// Helper to find a doctor by slug
const getDoctorBySlug = (slug: string): Doctor | undefined => {
  return availableDoctors.find(
    (doctor) => doctor.name.toLowerCase().replace(/\s+/g, '-') === slug
  );
};


export default function ProfessionalProfilePage() {
    const params = useParams();
    const { toast } = useToast();
    const slug = typeof params.slug === 'string' ? params.slug : '';
    const doctor = getDoctorBySlug(slug);

    // In a real app, 'myDoctors' would come from a user context or store
    const [myDoctors, setMyDoctors] = React.useState<Doctor[]>([availableDoctors[0]]);
    const isAdded = !!myDoctors.find(d => d.name === doctor?.name);

    const handleAddDoctor = (doctor: Doctor) => {
        if (!myDoctors.find(d => d.name === doctor.name)) {
            setMyDoctors(prev => [...prev, doctor]);
            toast({
                title: "Doctor Added!",
                description: `${doctor.name} has been added to your list.`,
            });
        }
    };

     const handleRemoveDoctor = (doctor: Doctor) => {
        setMyDoctors(prev => prev.filter(d => d.name !== doctor.name));
        toast({
            title: "Doctor Removed",
            description: `${doctor.name} has been removed from your list.`,
            variant: "destructive",
        });
    };


    if (!doctor) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-center">
                <h1 className="text-4xl font-bold">Doctor not found</h1>
                <p className="text-muted-foreground mt-2">The professional you are looking for does not exist.</p>
                <Button asChild className="mt-6">
                    <Link href="/dashboard/professionals">Back to Search</Link>
                </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Profile Header */}
            <Card className="bg-white overflow-hidden">
                <div className="h-32 bg-primary/10" />
                <CardContent className="p-6 pt-0">
                    <div className="flex flex-col sm:flex-row items-center sm:items-end sm:gap-6 -mt-16">
                         <Avatar className="w-32 h-32 border-4 border-white shadow-md">
                            <AvatarImage src={doctor.avatar} alt={doctor.name} />
                            <AvatarFallback>{doctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 mt-4 sm:mt-0 text-center sm:text-left">
                            <h1 className="text-3xl font-bold font-headline">{doctor.name}</h1>
                            <p className="text-lg text-muted-foreground">{doctor.specialty}</p>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground justify-center sm:justify-start mt-1">
                                <MapPin className="h-4 w-4" />
                                <span>{doctor.location}</span>
                            </div>
                        </div>
                        <div className="flex gap-2 mt-4 sm:mt-0">
                            {isAdded ? (
                                <Button variant="secondary" onClick={() => handleRemoveDoctor(doctor)}>
                                    <X className="mr-2 h-4 w-4" /> Remove from My Doctors
                                </Button>
                            ) : (
                                <Button onClick={() => handleAddDoctor(doctor)}>
                                    <UserPlus className="mr-2 h-4 w-4" /> Add to My Doctors
                                </Button>
                            )}
                             <Button variant="outline" asChild>
                                <Link href="/dashboard/appointments">
                                    <CalendarDays className="mr-2 h-4 w-4"/> Schedule
                                </Link>
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Profile Details */}
            <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-8">
                    <Card className="bg-white">
                        <CardHeader>
                            <CardTitle>About {doctor.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">{doctor.bio}</p>
                        </CardContent>
                    </Card>
                </div>
                <div className="md:col-span-1">
                     <Card className="bg-white">
                        <CardHeader>
                            <CardTitle>Contact Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-3">
                                <Phone className="h-5 w-5 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">This number is private. Please use the messaging feature.</span>
                            </div>
                             <div className="flex items-center gap-3">
                                <Mail className="h-5 w-5 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">Contact via in-app messaging.</span>
                            </div>
                             <div className="flex items-center gap-3">
                                <MapPin className="h-5 w-5 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">{doctor.location}</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
