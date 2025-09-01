
'use client';

import { Card, CardContent } from '@/components/ui/card';
import { ProductForm } from '@/components/product-form';
import { useToast } from '@/hooks/use-toast';
import { useRouter, useParams } from 'next/navigation';
import { z } from 'zod';
import { professionalProducts, productSchema, type Product } from '@/lib/data';
import { useState, useEffect } from 'react';

export default function EditProductPage() {
    const { toast } = useToast();
    const router = useRouter();
    const params = useParams();
    const { id } = params;

    const [product, setProduct] = useState<Product | undefined>(undefined);

    useEffect(() => {
        const productToEdit = professionalProducts.find(p => p.id === id);
        if (productToEdit) {
            setProduct(productToEdit);
        } else {
            toast({
                title: "Product not found",
                description: "The product you are trying to edit does not exist.",
                variant: "destructive"
            });
            router.push('/dashboard/professional/marketplace/products');
        }
    }, [id, router, toast]);

    const handleEditProduct = (data: z.infer<typeof productSchema>) => {
        // In a real app, this would be an API call
        const productIndex = professionalProducts.findIndex(p => p.id === id);
        if (productIndex !== -1) {
            professionalProducts[productIndex] = { ...professionalProducts[productIndex], ...data };
        }
        
        toast({
            title: "Product Updated!",
            description: `${data.name} has been successfully updated.`
        });
        
        router.push('/dashboard/professional/marketplace/products');
    }

    if (!product) {
        return <div>Loading product...</div>;
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight font-headline">Edit Product</h1>
                <p className="text-muted-foreground">Update the details for "{product.name}".</p>
            </div>
            
            <Card className="bg-white max-w-4xl">
                <CardContent className="p-6">
                    <ProductForm onSave={handleEditProduct} product={product} />
                </CardContent>
            </Card>
        </div>
    );
}
