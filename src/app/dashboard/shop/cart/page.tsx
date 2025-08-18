
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ShoppingCart, ArrowLeft, Trash2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';

const initialCartItems = [
  {
    id: 1,
    name: 'Digital Blood Pressure Monitor',
    price: 25000,
    quantity: 1,
    image: 'https://placehold.co/400x400.png',
    hint: 'blood pressure monitor',
  },
  {
    id: 2,
    name: 'Vitamin C (1000mg)',
    price: 5500,
    quantity: 2,
    image: 'https://placehold.co/400x400.png',
    hint: 'vitamin bottle',
  },
];

export default function CartPage() {
    const [cartItems, setCartItems] = useState(initialCartItems);

    const handleQuantityChange = (id: number, newQuantity: number) => {
        if (newQuantity < 1) return;
        setCartItems(cartItems.map(item => item.id === id ? { ...item, quantity: newQuantity } : item));
    }

    const handleRemoveItem = (id: number) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    }
    
    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shipping = 2000;
    const total = subtotal + shipping;

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(amount);
    }

    return (
        <div className="space-y-8">
             <div>
                <h1 className="text-3xl font-bold tracking-tight font-headline">Shopping Cart</h1>
                <p className="text-muted-foreground">Review your items and proceed to checkout.</p>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2">
                    <Card className="bg-white">
                        <CardContent className="p-0">
                           {cartItems.length > 0 ? (
                                <div className="divide-y">
                                    {cartItems.map(item => (
                                        <div key={item.id} className="flex items-center gap-4 p-4">
                                            <Image src={item.image} alt={item.name} width={80} height={80} data-ai-hint={item.hint} className="rounded-md object-cover" />
                                            <div className="flex-1">
                                                <h3 className="font-semibold">{item.name}</h3>
                                                <p className="text-sm text-muted-foreground">{formatCurrency(item.price)}</p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                 <Input 
                                                    type="number" 
                                                    value={item.quantity}
                                                    onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                                                    className="w-16 h-9 text-center"
                                                    min="1"
                                                />
                                            </div>
                                             <p className="w-24 text-right font-semibold">{formatCurrency(item.price * item.quantity)}</p>
                                            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive" onClick={() => handleRemoveItem(item.id)}>
                                                <Trash2 className="w-5 h-5" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-12 text-center">
                                    <ShoppingCart className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                                    <h2 className="text-xl font-semibold">Your cart is empty</h2>
                                    <p className="text-muted-foreground mt-2">Looks like you haven't added anything to your cart yet.</p>
                                    <Button asChild className="mt-6">
                                        <Link href="/dashboard/shop">
                                            <ArrowLeft className="mr-2 h-4 w-4" />
                                            Start Shopping
                                        </Link>
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
                 <div className="lg:col-span-1">
                     <Card className="bg-white sticky top-24">
                        <CardHeader>
                            <CardTitle>Order Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                             <div className="flex justify-between">
                                <p className="text-muted-foreground">Subtotal</p>
                                <p className="font-semibold">{formatCurrency(subtotal)}</p>
                            </div>
                            <div className="flex justify-between">
                                <p className="text-muted-foreground">Shipping</p>
                                <p className="font-semibold">{formatCurrency(shipping)}</p>
                            </div>
                            <Separator />
                             <div className="flex justify-between text-lg font-bold">
                                <p>Total</p>
                                <p>{formatCurrency(total)}</p>
                            </div>
                        </CardContent>
                        <CardFooter className="flex-col gap-2">
                            <Button size="lg" className="w-full" disabled={cartItems.length === 0}>
                                Proceed to Checkout
                            </Button>
                             <Button asChild variant="outline" className="w-full">
                                <Link href="/dashboard/shop">
                                     <ArrowLeft className="mr-2 h-4 w-4" /> Continue Shopping
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                 </div>
            </div>
        </div>
    )
}
