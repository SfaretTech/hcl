
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Stethoscope, Pill, Leaf, Search, ArrowRight, ShoppingCart, HeartPulse, Bot, Sparkles, Star } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { professionalProducts } from '@/lib/data';

const categories = [
    {
        name: 'Equipment',
        icon: HeartPulse,
        href: '#'
    },
    {
        name: 'Medications',
        icon: Pill,
        href: '#'
    },
    {
        name: 'Supplements',
        icon: Leaf,
        href: '#'
    },
    {
        name: 'AI Health Devices',
        icon: Bot,
        href: '#'
    },
    {
        name: 'Wellness Kits',
        icon: Sparkles,
        href: '#'
    }
];

export default function ShopPage() {
    const { toast } = useToast();

    const handleAddToCart = (productName: string) => {
        toast({
            title: "Added to Cart!",
            description: `${productName} has been added to your cart.`,
        });
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(amount);
    }

    return (
        <div className="space-y-12">
            <section className="bg-primary/5 rounded-xl p-8 text-center flex flex-col items-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mb-4 border-4 border-primary/20">
                    <ShoppingCart className="h-8 w-8" />
                </div>
                 <h1 className="text-3xl font-bold tracking-tight font-headline">HCOM Health Store</h1>
                <p className="text-muted-foreground mt-2 max-w-xl">Your one-stop shop for trusted medications, supplements, and medical equipment.</p>
                <div className="mt-6 w-full max-w-lg">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input 
                            placeholder="Search for products, brands, or health conditions..."
                            className="pl-12 h-12 rounded-full"
                        />
                    </div>
                </div>
            </section>
            
            <section>
                <h2 className="text-2xl font-bold font-headline mb-6">Shop by Category</h2>
                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                    {categories.map((category) => (
                       <Link href={category.href} key={category.name} className="group">
                           <Card className="bg-white hover:shadow-lg transition-all hover:border-primary/50 text-center p-6 flex flex-col items-center justify-center aspect-square">
                                 <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary mb-3 transition-transform group-hover:scale-110">
                                    <category.icon className="h-7 w-7" />
                                </div>
                                <p className="font-semibold text-sm group-hover:text-primary">{category.name}</p>
                           </Card>
                       </Link>
                    ))}
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-bold font-headline mb-6">Featured Products</h2>
                 <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {professionalProducts.map((product) => (
                       <Card key={product.name} className="bg-white hover:shadow-xl transition-shadow flex flex-col overflow-hidden group">
                            <CardContent className="p-0">
                                <div className="aspect-square overflow-hidden">
                                <Image 
                                    src={product.images[0]}
                                    alt={product.name}
                                    width={400} height={400}
                                    data-ai-hint={product.name.split(' ').slice(0,2).join(' ').toLowerCase()}
                                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                                />
                                </div>
                            </CardContent>
                           <div className="p-4 flex flex-col flex-grow">
                                <Badge variant="secondary" className="w-fit mb-2">{product.category}</Badge>
                                <CardTitle className="font-headline text-lg flex-grow">{product.name}</CardTitle>
                                 <div className="flex items-center gap-1 text-sm text-amber-500 mt-2">
                                    <Star className="w-4 h-4 fill-current"/>
                                    <span className="font-bold">{product.rating}</span>
                                    <span className="text-muted-foreground">({product.reviews} reviews)</span>
                                </div>
                                <div className="flex items-end justify-between mt-4">
                                   <p className="text-2xl font-bold text-primary">{formatCurrency(product.price)}</p>
                                   <Button onClick={() => handleAddToCart(product.name)}>
                                        <ShoppingCart className="mr-2 h-4 w-4" />
                                        Add to Cart
                                   </Button>
                                </div>
                           </div>
                       </Card>
                    ))}
                </div>
                 <div className="text-center mt-12">
                    <Button size="lg" variant="outline">
                        Explore All Products <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            </section>
        </div>
    );
}


