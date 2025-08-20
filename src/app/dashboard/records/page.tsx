
'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UploadCloud, FileText, MoreVertical, Eye, Download, Search, FileUp } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { format } from 'date-fns';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type DocumentType = 'Lab Report' | 'Prescription' | 'Imaging Result' | 'Consultation Note' | 'Other';

type HealthRecord = {
    id: string;
    name: string;
    type: DocumentType;
    date: string;
    uploadedBy: 'Me' | 'Dr. Samuel Chen';
    fileUrl: string;
};

const initialRecords: HealthRecord[] = [
    { id: 'rec-1', name: 'Annual Blood Panel Results', type: 'Lab Report', date: '2024-08-15T10:00:00', uploadedBy: 'Dr. Samuel Chen', fileUrl: '#' },
    { id: 'rec-2', name: 'Vitamin D Prescription', type: 'Prescription', date: '2024-08-10T14:30:00', uploadedBy: 'Dr. Samuel Chen', fileUrl: '#' },
    { id: 'rec-3', name: 'Follow-up Notes - August', type: 'Consultation Note', date: '2024-08-10T15:00:00', uploadedBy: 'Me', fileUrl: '#' },
    { id: 'rec-4', name: 'Chest X-Ray', type: 'Imaging Result', date: '2024-07-22T09:00:00', uploadedBy: 'Me', fileUrl: '#' },
];

const uploadSchema = z.object({
  documentName: z.string().min(3, 'Document name must be at least 3 characters.'),
  documentType: z.string().min(1, 'Please select a document type.'),
  documentFile: z.any().refine((files) => files?.length === 1, 'A file is required.'),
});


function UploadDocumentForm({ onUpload }: { onUpload: (data: z.infer<typeof uploadSchema>) => void }) {
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
                 <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg text-center">
                    <FileUp className="h-12 w-12 text-muted-foreground mb-2" />
                     <p className="font-semibold">{documentFile?.[0]?.name || 'Drag & drop or click to upload'}</p>
                    <p className="text-xs text-muted-foreground">PDF, PNG, JPG up to 10MB</p>
                    <Input type="file" className="w-full h-full opacity-0 absolute inset-0 z-10 cursor-pointer" {...fileRef} />
                </div>
                 {form.formState.errors.documentFile && (
                    <p className="text-sm font-medium text-destructive">{form.formState.errors.documentFile.message as string}</p>
                )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <div className="sm:col-span-2">
                    <FormField
                        control={form.control}
                        name="documentName"
                        render={({ field }) => (
                           <Input placeholder="Document Name (e.g. 'August Blood Test')" {...field} />
                        )}
                    />
                 </div>
                 <div>
                    <FormField
                        control={form.control}
                        name="documentType"
                        render={({ field }) => (
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
                        )}
                    />
                 </div>
            </div>
             <DialogFooter>
                <DialogTrigger asChild>
                    <Button type="button" variant="ghost">Cancel</Button>
                </DialogTrigger>
                <Button type="submit">Upload Document</Button>
            </DialogFooter>
        </form>
    );
}


export default function HealthRecordsPage() {
    const { toast } = useToast();
    const [records, setRecords] = useState<HealthRecord[]>(initialRecords);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('All');
    const [isUploadOpen, setUploadOpen] = useState(false);

    const documentTypes: DocumentType[] = useMemo(() => ['Lab Report', 'Prescription', 'Imaging Result', 'Consultation Note', 'Other'], []);

    const filteredRecords = useMemo(() => {
        return records.filter(record => {
            const matchesType = filterType === 'All' || record.type === filterType;
            const matchesSearch = record.name.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesType && matchesSearch;
        });
    }, [records, searchTerm, filterType]);

    const handleUpload = (data: z.infer<typeof uploadSchema>) => {
        const newRecord: HealthRecord = {
            id: `rec-${Date.now()}`,
            name: data.documentName,
            type: data.documentType as DocumentType,
            date: new Date().toISOString(),
            uploadedBy: 'Me',
            fileUrl: '#' // This would be the URL from the file upload service
        };
        setRecords(prev => [newRecord, ...prev]);
        setUploadOpen(false);
        toast({
            title: "Document Uploaded!",
            description: `${data.documentName} has been added to your records.`,
        });
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                 <div>
                    <h1 className="text-3xl font-bold tracking-tight font-headline">Health Records</h1>
                    <p className="text-muted-foreground">Securely manage and access your medical documents.</p>
                </div>
                 <Dialog open={isUploadOpen} onOpenChange={setUploadOpen}>
                    <DialogTrigger asChild>
                        <Button size="lg">
                            <UploadCloud className="mr-2 h-5 w-5" />
                            Upload Document
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-lg">
                        <DialogHeader>
                            <DialogTitle>Upload New Document</DialogTitle>
                            <DialogDescription>
                                Add a new file to your secure health records. Only you and your authorized professionals can view it.
                            </DialogDescription>
                        </DialogHeader>
                        <UploadDocumentForm onUpload={handleUpload} />
                    </DialogContent>
                </Dialog>
            </div>
            
            <Card className="bg-white">
                <CardHeader>
                     <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="relative sm:col-span-3 lg:col-span-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input 
                                placeholder="Search records..."
                                className="pl-10"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <Select value={filterType} onValueChange={setFilterType}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Filter by type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="All">All Document Types</SelectItem>
                                {documentTypes.map(type => (
                                    <SelectItem key={type} value={type}>{type}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Document</TableHead>
                                <TableHead className="hidden md:table-cell">Type</TableHead>
                                <TableHead className="hidden sm:table-cell">Date Uploaded</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredRecords.map((record) => (
                                <TableRow key={record.id}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-primary/10 rounded-md text-primary">
                                               <FileText className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <p className="font-medium">{record.name}</p>
                                                <p className="text-xs text-muted-foreground md:hidden">{record.type}</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">{record.type}</TableCell>
                                    <TableCell className="hidden sm:table-cell">
                                        <div className="flex flex-col">
                                            <span>{format(new Date(record.date), 'PPP')}</span>
                                            <span className="text-xs text-muted-foreground">by {record.uploadedBy}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                         <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon">
                                                    <MoreVertical className="h-5 w-5" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                                            <Eye className="mr-2 h-4 w-4"/> View
                                                        </DropdownMenuItem>
                                                    </DialogTrigger>
                                                    <DialogContent className="max-w-4xl h-[90vh] flex flex-col">
                                                        <DialogHeader>
                                                            <DialogTitle>{record.name}</DialogTitle>
                                                            <DialogDescription>
                                                                Uploaded on {format(new Date(record.date), 'PPP')} by {record.uploadedBy}
                                                            </DialogDescription>
                                                        </DialogHeader>
                                                        <div className="flex-1 bg-muted/50 rounded-lg flex items-center justify-center">
                                                            <p className="text-muted-foreground">Document preview would be here.</p>
                                                        </div>
                                                    </DialogContent>
                                                </Dialog>
                                                <a href={record.fileUrl} download>
                                                    <DropdownMenuItem>
                                                        <Download className="mr-2 h-4 w-4"/> Download
                                                    </DropdownMenuItem>
                                                </a>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                     {filteredRecords.length === 0 && (
                        <div className="text-center py-16">
                            <p className="text-lg text-muted-foreground">No records found matching your criteria.</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

    