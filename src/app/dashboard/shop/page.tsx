
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Stethoscope, Pill, Leaf, Search, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const categories = [
    {
        name: 'Medical Equipment',
        icon: Stethoscope,
        description: 'Browse our selection of professional-grade medical equipment for home and clinical use.',
        products: 45,
        href: '#'
    },
    {
        name: 'Medications',
        icon: Pill,
        description: 'Find prescription and over-the-counter medications from trusted pharmaceutical brands.',
        products: 1200,
        href: '#'
    },
    {
        name: 'Supplements',
        icon: Leaf,
        description: 'Explore a wide range of vitamins, supplements, and wellness products to support your health goals.',
        products: 250,
        href: '#'
    }
];

export default function ShopPage() {
    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight font-headline">Shop</h1>
                    <p className="text-muted-foreground">Your one-stop shop for health products.</p>
                </div>
            </div>

            <Card className="bg-white p-6 shadow-sm">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input 
                            placeholder="Search for products, brands, or categories..."
                            className="pl-10 h-11"
                        />
                    </div>
                    <Button size="lg" className="w-full sm:w-auto">Search</Button>
                </div>
            </Card>

            <section>
                <h2 className="text-2xl font-bold font-headline mb-6">Product Categories</h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {categories.map((category) => (
                       <Card key={category.name} className="bg-white hover:shadow-lg transition-shadow flex flex-col">
                           <CardHeader>
                                <div className="flex items-center gap-4">
                                     <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                        <category.icon className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <CardTitle className="font-headline text-xl">{category.name}</CardTitle>
                                        <CardDescription>{category.products} products</CardDescription>
                                    </div>
                                </div>
                           </CardHeader>
                           <CardContent className="flex-grow">
                               <p className="text-sm text-muted-foreground">{category.description}</p>
                           </CardContent>
                           <CardFooter>
                               <Button asChild variant="outline" className="w-full">
                                   <Link href={category.href}>
                                       Browse Category <ArrowRight className="ml-2 h-4 w-4" />
                                   </Link>
                               </Button>
                           </CardFooter>
                       </Card>
                    ))}
                </div>
            </section>
        </div>
    );
}
