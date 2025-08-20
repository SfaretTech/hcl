
'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Eye, Download, Search, UploadCloud, User } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { format } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type DocumentType = 'Lab Report' | 'Prescription' | 'Imaging Result' | 'Consultation Note' | 'Other';

type HealthRecord = {
    id: string;
    name: string;
    type: DocumentType;
    date: string;
    uploadedBy: 'Client' | 'Me';
    fileUrl: string;
};

type Patient = {
  id: string;
  name: string;
  avatar: string;
  records: HealthRecord[];
};

const initialPatients: Patient[] = [
    { 
        id: 'pat-1', 
        name: 'Jessica Peterson', 
        avatar: 'https://placehold.co/100x100.png',
        records: [
            { id: 'rec-1', name: 'Annual Blood Panel Results', type: 'Lab Report', date: '2024-08-15T10:00:00', uploadedBy: 'Me', fileUrl: '#' },
            { id: 'rec-2', name: 'Vitamin D Prescription', type: 'Prescription', date: '2024-08-10T14:30:00', uploadedBy: 'Me', fileUrl: '#' },
            { id: 'rec-3', name: 'Follow-up Notes - August', type: 'Consultation Note', date: '2024-08-10T15:00:00', uploadedBy: 'Client', fileUrl: '#' },
            { id: 'rec-4', name: 'Chest X-Ray', type: 'Imaging Result', date: '2024-07-22T09:00:00', uploadedBy: 'Client', fileUrl: '#' },
        ]
    },
    { 
        id: 'pat-2', 
        name: 'David Lee', 
        avatar: 'https://placehold.co/100x100.png',
        records: [
            { id: 'rec-5', name: 'Dermatology Follow-up', type: 'Consultation Note', date: '2024-08-20T11:00:00', uploadedBy: 'Me', fileUrl: '#' },
        ]
    },
    { 
        id: 'pat-3', 
        name: 'Aisha Bello', 
        avatar: 'https://placehold.co/100x100.png',
        records: []
    },
];

export default function ProfessionalRecordsPage() {
    const [patients, setPatients] = useState<Patient[]>(initialPatients);
    const [selectedPatient, setSelectedPatient] = useState<Patient>(initialPatients[0]);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredPatients = useMemo(() => {
        return patients.filter(patient =>
            patient.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [patients, searchTerm]);

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight font-headline">Patient Records</h1>
                <p className="text-muted-foreground">Access and manage your patients' medical documents.</p>
            </div>
            
            <div className="grid lg:grid-cols-4 gap-8 items-start">
                <div className="lg:col-span-1">
                    <Card className="bg-white sticky top-24">
                        <CardHeader>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input 
                                    placeholder="Search patients..." 
                                    className="pl-10"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </CardHeader>
                        <CardContent className="p-2">
                           <div className="space-y-1">
                                {filteredPatients.map(patient => (
                                    <Button
                                        key={patient.id}
                                        variant={selectedPatient.id === patient.id ? 'secondary' : 'ghost'}
                                        className="w-full justify-start h-12"
                                        onClick={() => setSelectedPatient(patient)}
                                    >
                                        <Avatar className="w-8 h-8 mr-3">
                                            <AvatarImage src={patient.avatar} />
                                            <AvatarFallback>{patient.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                        </Avatar>
                                        {patient.name}
                                    </Button>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-3">
                    <Card className="bg-white">
                        <CardHeader>
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                <div>
                                    <CardTitle className="text-2xl">Records for {selectedPatient.name}</CardTitle>
                                    <CardDescription>A total of {selectedPatient.records.length} documents found.</CardDescription>
                                </div>
                                <Button>
                                    <UploadCloud className="mr-2 h-4 w-4" />
                                    Upload Document
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Document</TableHead>
                                        <TableHead className="hidden md:table-cell">Type</TableHead>
                                        <TableHead className="hidden sm:table-cell">Date</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {selectedPatient.records.map((record) => (
                                        <TableRow key={record.id}>
                                            <TableCell className="font-medium">{record.name}</TableCell>
                                            <TableCell className="hidden md:table-cell">{record.type}</TableCell>
                                            <TableCell className="hidden sm:table-cell">{format(new Date(record.date), 'PPP')}</TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="ghost" size="icon">
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                                <Button variant="ghost" size="icon">
                                                    <Download className="h-4 w-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            {selectedPatient.records.length === 0 && (
                                <div className="text-center py-16">
                                    <p className="text-lg text-muted-foreground">No records found for {selectedPatient.name}.</p>
                                     <Button variant="outline" className="mt-4">
                                        <UploadCloud className="mr-2 h-4 w-4" />
                                        Upload First Document
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
