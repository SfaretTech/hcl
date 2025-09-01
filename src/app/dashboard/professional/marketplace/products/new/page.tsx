
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ProductForm } from '@/components/product-form';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { addProfessionalProduct, productSchema } from '@/lib/data';


export default function NewProductPage() {
    const { toast } = useToast();
    const router = useRouter();

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

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight font-headline">Add New Product</h1>
                <p className="text-muted-foreground">Fill out the form below to list a new item in the marketplace.</p>
            </div>
            
            <Card className="bg-white max-w-4xl">
                <CardContent className="p-6">
                    <ProductForm onSave={handleCreateProduct} />
                </CardContent>
            </Card>
        </div>
    );
}
