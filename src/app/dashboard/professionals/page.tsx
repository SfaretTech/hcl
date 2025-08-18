
'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, UserPlus, Check, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { availableDoctors, type Doctor } from '@/components/schedule-appointment-form';

const departments = ['All', ...new Set(availableDoctors.map(d => d.department))];

const DoctorCard = ({ doctor, onAdd, onRemove, isAdded }: { doctor: Doctor, onAdd: (doctor: Doctor) => void, onRemove: (doctor: Doctor) => void, isAdded: boolean }) => {
    return (
        <Card className="bg-white hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-primary/20">
                    <AvatarImage src={doctor.avatar} alt={doctor.name} />
                    <AvatarFallback>{doctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <CardTitle className="font-headline text-xl">{doctor.name}</CardTitle>
                <CardDescription>{doctor.specialty}</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground text-center line-clamp-3 h-[60px]">{doctor.bio}</p>
            </CardContent>
            <CardFooter className="flex-col gap-2">
                <Button variant="outline" className="w-full">View Profile</Button>
                {isAdded ? (
                     <Button variant="secondary" className="w-full" onClick={() => onRemove(doctor)}>
                        <X className="mr-2 h-4 w-4" /> Remove from My Doctors
                    </Button>
                ) : (
                    <Button className="w-full" onClick={() => onAdd(doctor)}>
                        <UserPlus className="mr-2 h-4 w-4" /> Add to My Doctors
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
};

export default function ProfessionalsPage() {
    const { toast } = useToast();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('All');
    
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

     const handleRemoveDoctor = (doctor: Doctor) => {
        setMyDoctors(prev => prev.filter(d => d.name !== doctor.name));
        toast({
            title: "Doctor Removed",
            description: `${doctor.name} has been removed from your list.`,
            variant: "destructive",
        });
    };

    const filteredDoctors = useMemo(() => {
        return availableDoctors.filter(doctor => {
            const matchesDepartment = selectedDepartment === 'All' || doctor.department === selectedDepartment;
            const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                  doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesDepartment && matchesSearch;
        });
    }, [searchTerm, selectedDepartment]);

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight font-headline">Find a Healthcare Professional</h1>
                <p className="text-muted-foreground">Search our network of licensed professionals to find the right care for you.</p>
            </div>

            <Card className="bg-white p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input 
                            placeholder="Search by name or specialty..."
                            className="pl-10"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                        <SelectTrigger className="w-full sm:w-[240px]">
                            <SelectValue placeholder="Filter by department" />
                        </SelectTrigger>
                        <SelectContent>
                            {departments.map(dept => (
                                <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </Card>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredDoctors.map(doctor => (
                    <DoctorCard 
                        key={doctor.name} 
                        doctor={doctor}
                        onAdd={handleAddDoctor}
                        onRemove={handleRemoveDoctor}
                        isAdded={!!myDoctors.find(d => d.name === doctor.name)}
                    />
                ))}
            </div>

            {filteredDoctors.length === 0 && (
                <div className="text-center py-16">
                    <p className="text-lg text-muted-foreground">No professionals found matching your criteria.</p>
                </div>
            )}
        </div>
    );
}
