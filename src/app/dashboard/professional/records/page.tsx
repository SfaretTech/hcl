
'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Eye, Download, Search, UploadCloud, FileUp } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { format } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { allPatients, addPatientRecord, type HealthRecord, type DocumentType, type Patient } from '@/lib/data';


const uploadSchema = z.object({
  documentName: z.string().min(3, 'Document name must be at least 3 characters.'),
  documentType: z.string().min(1, 'Please select a document type.'),
  documentFile: z.any().refine((files) => files?.length === 1, 'A file is required.'),
});

function ProfessionalUploadDocumentForm({ patient, onUpload }: { patient: Patient; onUpload: (data: z.infer<typeof uploadSchema>) => void; }) {
    const form = useForm<z.infer<typeof uploadSchema>>({
        resolver: zodResolver(uploadSchema),
        defaultValues: { documentName: '', documentType: '', documentFile: undefined },
    });
    const fileRef = form.register("documentFile");
    const documentFile = form.watch("documentFile");

    function onSubmit(values: z.infer<typeof uploadSchema>) {
        onUpload(values);
        form.reset();
    }
    
    return (
         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
                 <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg text-center relative cursor-pointer hover:bg-accent">
                    <FileUp className="h-12 w-12 text-muted-foreground mb-2" />
                     <p className="font-semibold">{documentFile?.[0]?.name || 'Drag & drop or click to upload'}</p>
                    <p className="text-xs text-muted-foreground">PDF, PNG, JPG up to 10MB</p>
                    <Input type="file" className="w-full h-full opacity-0 absolute inset-0 z-10 cursor-pointer" {...fileRef} />
                </div>
                 {form.formState.errors.documentFile && (
                    <p className="text-sm font-medium text-destructive">{form.formState.errors.documentFile.message as string}</p>
                )}
            </div>

            <FormField
                control={form.control}
                name="documentName"
                render={({ field }) => (
                    <div className="space-y-2">
                        <label>Document Name</label>
                        <Input placeholder="e.g. 'Lab Results Analysis'" {...field} />
                        {form.formState.errors.documentName && <p className="text-sm font-medium text-destructive">{form.formState.errors.documentName.message}</p>}
                    </div>
                )}
            />

            <FormField
                control={form.control}
                name="documentType"
                render={({ field }) => (
                     <div className="space-y-2">
                        <label>Document Type</label>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select document type" />
                            </SelectTrigger>
                            <SelectContent>
                                {['Lab Report', 'Prescription', 'Imaging Result', 'Consultation Note', 'Other'].map(type => (
                                    <SelectItem key={type} value={type}>{type}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                         {form.formState.errors.documentType && <p className="text-sm font-medium text-destructive">{form.formState.errors.documentType.message}</p>}
                    </div>
                )}
            />
             <DialogFooter>
                <DialogTrigger asChild>
                    <Button type="button" variant="ghost">Cancel</Button>
                </DialogTrigger>
                <Button type="submit">Upload for {patient.name.split(' ')[0]}</Button>
            </DialogFooter>
        </form>
    );
}


export default function ProfessionalRecordsPage() {
    const { toast } = useToast();
    const [patients, setPatients] = useState<Patient[]>(allPatients);
    const [selectedPatient, setSelectedPatient] = useState<Patient>(allPatients[0]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isUploadOpen, setUploadOpen] = useState(false);

    const filteredPatients = useMemo(() => {
        return patients.filter(patient =>
            patient.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [patients, searchTerm]);

    const handleUpload = (data: z.infer<typeof uploadSchema>) => {
        const newRecord: HealthRecord = {
            id: `rec-${Date.now()}`,
            name: data.documentName,
            type: data.documentType as DocumentType,
            date: new Date().toISOString(),
            uploadedBy: 'Me',
            fileUrl: '#'
        };
        addPatientRecord(selectedPatient.id, newRecord);
        setPatients([...allPatients]);
        setUploadOpen(false);
        toast({
            title: "Document Uploaded!",
            description: `${data.documentName} has been added for ${selectedPatient.name}.`,
        });
    }

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
                                 <Dialog open={isUploadOpen} onOpenChange={setUploadOpen}>
                                    <DialogTrigger asChild>
                                        <Button>
                                            <UploadCloud className="mr-2 h-4 w-4" />
                                            Upload Document
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-lg">
                                        <DialogHeader>
                                            <DialogTitle>Upload Document for {selectedPatient.name}</DialogTitle>
                                            <DialogDescription>
                                               Add a new file to the patient's secure health records. They will be notified.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <ProfessionalUploadDocumentForm patient={selectedPatient} onUpload={handleUpload} />
                                    </DialogContent>
                                </Dialog>
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
                                     <Dialog open={isUploadOpen} onOpenChange={setUploadOpen}>
                                        <DialogTrigger asChild>
                                            <Button variant="outline" className="mt-4">
                                                <UploadCloud className="mr-2 h-4 w-4" />
                                                Upload First Document
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-lg">
                                            <DialogHeader>
                                                <DialogTitle>Upload Document for {selectedPatient.name}</DialogTitle>
                                                <DialogDescription>
                                                Add a new file to the patient's secure health records. They will be notified.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <ProfessionalUploadDocumentForm patient={selectedPatient} onUpload={handleUpload} />
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
