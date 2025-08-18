
'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, UserPlus, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { availableDoctors, type Doctor } from '@/components/schedule-appointment-form';
import Link from 'next/link';

const departments = ['All', ...new Set(availableDoctors.map(d => d.department))];
const locations = ['All', ...new Set(availableDoctors.map(d => d.location))];

// Helper to generate a URL-friendly slug from a name
const toSlug = (name: string) => name.toLowerCase().replace(/\s+/g, '-');

const DoctorCard = ({ doctor, onAdd, isAdded }: { doctor: Doctor, onAdd: (doctor: Doctor) => void, isAdded: boolean }) => {
    
    return (
        <Card className="bg-white hover:shadow-lg transition-shadow flex flex-col">
            <CardHeader className="text-center items-center">
                <Avatar className="w-24 h-24 mb-4 border-4 border-primary/20">
                    <AvatarImage src={doctor.avatar} alt={doctor.name} />
                    <AvatarFallback>{doctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <CardTitle className="font-headline text-xl">{doctor.name}</CardTitle>
                <CardDescription>{doctor.specialty}</CardDescription>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground pt-1">
                    <MapPin className="h-4 w-4" />
                    <span>{doctor.location}</span>
                </div>
            </CardHeader>
            <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground text-center line-clamp-3 h-[60px]">{doctor.bio}</p>
            </CardContent>
            <CardFooter className="flex-col gap-2 pt-4">
                <Button variant="outline" className="w-full" asChild>
                    <Link href={`/dashboard/professionals/${toSlug(doctor.name)}`}>View Profile</Link>
                </Button>
                <Button className="w-full" onClick={() => onAdd(doctor)} disabled={isAdded}>
                    <UserPlus className="mr-2 h-4 w-4" /> {isAdded ? 'Added' : 'Add to My Doctors'}
                </Button>
            </CardFooter>
        </Card>
    );
};

export default function FindProfessionalsPage() {
    const { toast } = useToast();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('All');
    const [selectedLocation, setSelectedLocation] = useState('All');
    
    // In a real app, this would come from a user data store/context
    const [myDoctors, setMyDoctors] = useState<Doctor[]>([availableDoctors[0]]);

    const handleAddDoctor = (doctor: Doctor) => {
        if (!myDoctors.find(d => d.name === doctor.name)) {
            setMyDoctors(prev => [...prev, doctor]);
            toast({
                title: "Doctor Added!",
                description: `${doctor.name} has been added to your list.`,
            });
        }
    };

    const filteredDoctors = useMemo(() => {
        return availableDoctors.filter(doctor => {
            const matchesDepartment = selectedDepartment === 'All' || doctor.department === selectedDepartment;
            const matchesLocation = selectedLocation === 'All' || doctor.location === selectedLocation;
            const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                  doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesDepartment && matchesSearch && matchesLocation;
        });
    }, [searchTerm, selectedDepartment, selectedLocation]);

    return (
        <div className="space-y-8">
             <div>
                <h1 className="text-3xl font-bold tracking-tight font-headline">Find a Professional</h1>
                <p className="text-muted-foreground">Search our network to find and add doctors to your list.</p>
            </div>
            
            <Card className="bg-white p-6 shadow-sm sticky top-16 z-10">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="relative sm:col-span-3 lg:col-span-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input 
                            placeholder="Search by name or specialty..."
                            className="pl-10"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Filter by department" />
                        </SelectTrigger>
                        <SelectContent>
                            {departments.map(dept => (
                                <SelectItem key={dept} value={dept}>{dept === 'All' ? 'All Departments' : dept}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Filter by location" />
                        </SelectTrigger>
                        <SelectContent>
                            {locations.map(loc => (
                                <SelectItem key={loc} value={loc}>{loc === 'All' ? 'All Locations' : loc}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </Card>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredDoctors.map(doctor => (
                    <DoctorCard 
                        key={doctor.name} 
                        doctor={doctor}
                        onAdd={handleAddDoctor}
                        isAdded={!!myDoctors.find(d => d.name === doctor.name)}
                    />
                ))}
            </div>

            {filteredDoctors.length === 0 && (
                <div className="text-center py-16">
                    <p className="text-lg text-muted-foreground">No new professionals found matching your criteria.</p>
                </div>
            )}
        </div>
    );
}
