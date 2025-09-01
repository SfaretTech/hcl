
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { productSchema } from '@/lib/data';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { FileUp, Save } from 'lucide-react';
import Link from 'next/link';

const categories = ['Equipment', 'Medications', 'Supplements', 'AI Health Devices', 'Wellness Kits', 'Other'];

export function ProductForm({ onSave, product }: { onSave: (data: z.infer<typeof productSchema>) => void, product?: z.infer<typeof productSchema> }) {
  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: product || {
      name: '',
      description: '',
      price: 0,
      stock: 1,
      category: '',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSave)} className="space-y-8">
        <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                        <Input placeholder="e.g., Digital Thermometer" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
        <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Product Description</FormLabel>
                    <FormControl>
                        <Textarea placeholder="Detailed description of the product..." className="min-h-32" {...field} />
                    </FormControl>
                    <FormDescription>
                        Use markdown for formatting. Be descriptive about features and specifications.
                    </FormDescription>
                    <FormMessage />
                </FormItem>
            )}
        />
        <div className="grid md:grid-cols-3 gap-8">
             <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Price (NGN)</FormLabel>
                        <FormControl>
                            <Input type="number" placeholder="25000" {...field} onChange={e => field.onChange(parseFloat(e.target.value) || 0)}/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
             <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Stock Quantity</FormLabel>
                        <FormControl>
                            <Input type="number" placeholder="100" {...field} onChange={e => field.onChange(parseInt(e.target.value, 10) || 0)}/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Category</FormLabel>
                         <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {categories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>

        <div>
            <FormLabel>Product Images</FormLabel>
            <div className="mt-2 flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg text-center cursor-pointer hover:bg-accent">
                <FileUp className="h-12 w-12 text-muted-foreground mb-2" />
                <p className="font-semibold">Drag & drop or click to upload</p>
                <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 10MB</p>
                <Input type="file" className="w-full h-full opacity-0 absolute inset-0 z-10 cursor-pointer" multiple />
            </div>
            <FormDescription className="mt-2">The first image will be used as the cover.</FormDescription>
        </div>

        <div className="flex justify-end gap-4 pt-4">
             <Button type="button" variant="outline" asChild>
                <Link href="/dashboard/professional/marketplace/products">Cancel</Link>
             </Button>
             <Button type="submit">
                <Save className="mr-2 h-4 w-4"/>
                {product ? 'Save Changes' : 'Save & List Product'}
            </Button>
        </div>
      </form>
    </Form>
  );
}
