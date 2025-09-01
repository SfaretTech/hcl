
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, ShoppingBag, LayoutGrid, ArrowLeft, Briefcase, FileText } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { useSearchParams } from 'next/navigation';

const orderedItems = [
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

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(amount);
}

const ClientConfirmation = () => {
    const subtotal = orderedItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shipping = 2000;
    const total = subtotal + shipping;

    return (
        <Card className="bg-white w-full max-w-2xl mx-auto">
            <CardHeader className="text-center items-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-green-100 text-green-600 border-4 border-green-200">
                    <CheckCircle2 className="h-8 w-8" />
                </div>
                <CardTitle className="text-2xl font-bold font-headline mt-4">Thank you for your order!</CardTitle>
                <CardDescription>
                    Your order #HCOM12345 has been placed successfully. A confirmation email has been sent to you.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Separator className="my-6" />
                <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
                <div className="space-y-4">
                    {orderedItems.map(item => (
                        <div key={item.id} className="flex justify-between items-center text-sm">
                            <div className="flex items-center gap-3">
                                    <Image src={item.image} alt={item.name} width={50} height={50} data-ai-hint={item.hint} className="rounded-md border" />
                                    <div>
                                    <p className="font-medium line-clamp-1">{item.name}</p>
                                    <p className="text-muted-foreground">Qty: {item.quantity}</p>
                                    </div>
                            </div>
                            <p>{formatCurrency(item.price * item.quantity)}</p>
                        </div>
                    ))}
                </div>
                <Separator className="my-6" />
                <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                        <p className="text-muted-foreground">Subtotal</p>
                        <p className="font-semibold">{formatCurrency(subtotal)}</p>
                    </div>
                    <div className="flex justify-between text-sm">
                        <p className="text-muted-foreground">Shipping</p>
                        <p className="font-semibold">{formatCurrency(shipping)}</p>
                    </div>
                        <div className="flex justify-between font-bold text-base">
                        <p>Total</p>
                        <p>{formatCurrency(total)}</p>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex-col sm:flex-row gap-4">
                    <Button asChild className="w-full">
                    <Link href="/dashboard/shop">
                        <ShoppingBag className="mr-2 h-4 w-4" />
                        Continue Shopping
                    </Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                        <Link href="/dashboard">
                        <LayoutGrid className="mr-2 h-4 w-4" />
                        Go to Dashboard
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    )
}

const ProfessionalConfirmation = () => {
    const subtotal = orderedItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shipping = 2000;
    const total = subtotal + shipping;

    return (
        <Card className="bg-white w-full max-w-3xl mx-auto">
             <CardHeader className="text-center items-center p-8 bg-primary/5">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600 border-4 border-blue-200">
                    <CheckCircle2 className="h-8 w-8" />
                </div>
                <CardTitle className="text-2xl font-bold font-headline mt-4">Purchase Successful</CardTitle>
                <CardDescription>
                   Your order #B2B-98765 has been successfully processed. An invoice will be sent to your registered email.
                </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
                 <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <h3 className="font-semibold mb-2">Shipping To:</h3>
                        <div className="text-sm text-muted-foreground">
                            <p className="font-medium text-foreground">Dr. Samuel Chen</p>
                            <p>HCOM International Clinic</p>
                            <p>23 Rumomoi, Port Harcourt, Nigeria</p>
                        </div>
                    </div>
                     <div>
                        <h3 className="font-semibold mb-2">Order Details:</h3>
                         <div className="text-sm text-muted-foreground space-y-1">
                            <p><span className="font-medium text-foreground">Order ID:</span> #B2B-98765</p>
                            <p><span className="font-medium text-foreground">Payment Method:</span> Credit Card</p>
                        </div>
                    </div>
                </div>

                <Separator className="my-6" />
                <h3 className="text-lg font-semibold mb-4">Items Purchased</h3>
                <div className="space-y-4">
                    {orderedItems.map(item => (
                        <div key={item.id} className="flex justify-between items-center text-sm p-3 bg-secondary/50 rounded-lg">
                            <div className="flex items-center gap-3">
                                    <Image src={item.image} alt={item.name} width={40} height={40} data-ai-hint={item.hint} className="rounded-md border bg-white" />
                                    <div>
                                    <p className="font-semibold line-clamp-1">{item.name}</p>
                                    <p className="text-muted-foreground">Qty: {item.quantity}</p>
                                    </div>
                            </div>
                            <p className="font-semibold">{formatCurrency(item.price * item.quantity)}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-6 flex justify-end">
                    <div className="w-full max-w-xs space-y-2">
                         <div className="flex justify-between text-sm">
                            <p className="text-muted-foreground">Subtotal</p>
                            <p className="font-semibold">{formatCurrency(subtotal)}</p>
                        </div>
                        <div className="flex justify-between text-sm">
                            <p className="text-muted-foreground">Shipping & Handling</p>
                            <p className="font-semibold">{formatCurrency(shipping)}</p>
                        </div>
                         <Separator />
                         <div className="flex justify-between font-bold text-base">
                            <p>Grand Total</p>
                            <p>{formatCurrency(total)}</p>
                        </div>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex-col sm:flex-row gap-4 bg-primary/5 p-6">
                 <Button asChild className="w-full">
                    <Link href="/dashboard/professional/marketplace/orders">
                        <Briefcase className="mr-2 h-4 w-4" />
                        View My Orders
                    </Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                        <Link href="/dashboard/professional">
                        <LayoutGrid className="mr-2 h-4 w-4" />
                        Go to Dashboard
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
};


export default function ConfirmationPage() {
    const searchParams = useSearchParams();
    const role = searchParams.get('role');

    if (role === 'professional') {
        return <ProfessionalConfirmation />;
    }
    
    return <ClientConfirmation />;
}
