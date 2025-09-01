
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ProductForm } from '@/components/product-form';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { addProfessionalProduct, productSchema } from '@/lib/data';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, Save, Check } from 'lucide-react';

const steps = [
    { name: 'Product Details', fields: ['name', 'description', 'category'] },
    { name: 'Pricing & Inventory', fields: ['price', 'stock'] },
    { name: 'Images', fields: ['images'] },
];

export default function NewProductPage() {
    const { toast } = useToast();
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(0);

    const handleCreateProduct = (data: z.infer<typeof productSchema>) => {
        const newProduct = {
            id: `prod-${Date.now()}`,
            ...data,
            rating: 0,
            reviews: 0,
            sales: 0,
            images: ['https://placehold.co/600x600.png']
        }
        addProfessionalProduct(newProduct);
        
        toast({
            title: "Product Listed!",
            description: `${data.name} is now available on the marketplace.`
        });
        
        router.push('/dashboard/professional/marketplace/products');
    }
    
    const goNext = () => setCurrentStep(prev => prev + 1);
    const goBack = () => setCurrentStep(prev => prev - 1);

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight font-headline">Add New Product</h1>
                <p className="text-muted-foreground">Follow the steps to list a new item in the marketplace.</p>
            </div>
            
            <Card className="bg-white max-w-4xl">
                <CardHeader>
                    <div className="flex items-center justify-between">
                         <div>
                            <CardTitle>Step {currentStep + 1}: {steps[currentStep].name}</CardTitle>
                            <CardDescription>Fill in the details for your new product.</CardDescription>
                         </div>
                         <div className="text-sm font-medium text-muted-foreground">Step {currentStep + 1} of {steps.length}</div>
                    </div>
                    <Progress value={((currentStep + 1) / steps.length) * 100} className="mt-4" />
                </CardHeader>
                <CardContent className="p-6">
                    <ProductForm 
                        onSave={handleCreateProduct} 
                        currentStep={currentStep}
                    />
                </CardContent>
            </Card>
        </div>
    );
}
