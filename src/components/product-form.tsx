
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFormContext } from 'react-hook-form';
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
import { FileUp, Save, ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const categories = ['Equipment', 'Medications', 'Supplements', 'AI Health Devices', 'Wellness Kits', 'Other'];

export function ProductForm({ onSave, product, currentStep = 0, onStepChange }: { onSave: (data: z.infer<typeof productSchema>) => void, product?: z.infer<typeof productSchema>, currentStep?: number, onStepChange?: (step: number) => void }) {
  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: product || {
      name: '',
      description: '',
      price: 0,
      stock: 1,
      category: '',
    },
    mode: 'onChange',
  });
  
  const [step, setStep] = useState(currentStep);

  const goNext = async () => {
    let fieldsToValidate: any[] = [];
    if(step === 0) fieldsToValidate = ['name', 'description', 'category'];
    if(step === 1) fieldsToValidate = ['price', 'stock'];
    
    const isValid = await form.trigger(fieldsToValidate as any);
    if(isValid) {
        setStep(prev => prev + 1);
    }
  }
  const goBack = () => setStep(prev => prev - 1);
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSave)} className="space-y-8">

        {/* Step 1: Product Details */}
        <div className={cn(step !== 0 && "hidden")}>
             <div className="space-y-8">
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
        </div>

         {/* Step 2: Pricing & Inventory */}
        <div className={cn(step !== 1 && "hidden")}>
            <div className="grid md:grid-cols-2 gap-8">
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
            </div>
        </div>

        {/* Step 3: Images */}
         <div className={cn(step !== 2 && "hidden")}>
            <div>
                <FormLabel>Product Images</FormLabel>
                <div className="relative mt-2 flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg text-center cursor-pointer hover:bg-accent">
                    <FileUp className="h-12 w-12 text-muted-foreground mb-2" />
                    <p className="font-semibold">Drag & drop or click to upload</p>
                    <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 10MB</p>
                    <Input type="file" className="w-full h-full opacity-0 absolute inset-0 z-10 cursor-pointer" multiple />
                </div>
                <FormDescription className="mt-2">The first image will be used as the cover.</FormDescription>
            </div>
        </div>


        <div className="flex justify-end gap-4 pt-4">
             <Button type="button" variant="outline" asChild>
                <Link href="/dashboard/professional/marketplace/products">Cancel</Link>
             </Button>

            {step > 0 && (
                 <Button type="button" variant="ghost" onClick={goBack}>
                    <ArrowLeft className="mr-2 h-4 w-4"/> Back
                </Button>
            )}

            {step < 2 && (
                 <Button type="button" onClick={goNext}>
                    Next <ArrowRight className="ml-2 h-4 w-4"/>
                </Button>
            )}
             
            {step === 2 && (
                 <Button type="submit">
                    <Save className="mr-2 h-4 w-4"/>
                    {product ? 'Save Changes' : 'Save & List Product'}
                </Button>
            )}
        </div>
      </form>
    </Form>
  );
}
