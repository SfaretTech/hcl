
'use client';

import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Lock, CreditCard, Landmark, Truck } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const cartItems = [
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

export default function CheckoutPage() {
    const { toast } = useToast();
    const router = useRouter();
    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shipping = 2000;
    const total = subtotal + shipping;

    const handlePlaceOrder = () => {
        toast({
            title: 'Order Placed!',
            description: 'Thank you for your purchase. You will receive a confirmation email shortly.',
        });
        router.push('/dashboard/shop/confirmation');
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight font-headline">Checkout</h1>
                <p className="text-muted-foreground">Please review your order and complete the payment.</p>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2 space-y-8">
                     <Card className="bg-white">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Truck className="w-5 h-5 text-primary"/> Shipping Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                             <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input id="name" defaultValue="Jessica Peterson" />
                                </div>
                                <div>
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <Input id="phone" defaultValue="+234 801 234 5678" />
                                </div>
                                <div className="sm:col-span-2">
                                    <Label htmlFor="address">Address</Label>
                                    <Input id="address" defaultValue="123 Healthway Drive" />
                                </div>
                                <div>
                                    <Label htmlFor="city">City</Label>
                                    <Input id="city" defaultValue="Port Harcourt" />
                                </div>
                                <div>
                                    <Label htmlFor="state">State</Label>
                                    <Input id="state" defaultValue="Rivers" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-white">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><CreditCard className="w-5 h-5 text-primary"/> Payment Method</CardTitle>
                             <CardDescription>All transactions are secure and encrypted.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <RadioGroup defaultValue="card" className="grid sm:grid-cols-2 gap-4">
                                <Label htmlFor="card" className="flex items-center gap-4 rounded-md border p-4 cursor-pointer hover:bg-accent has-[:checked]:bg-primary/10 has-[:checked]:border-primary">
                                    <RadioGroupItem value="card" id="card" />
                                    <div className="flex items-center gap-2">
                                        <CreditCard className="w-5 h-5"/>
                                        <span>Card</span>
                                    </div>
                                </Label>
                                <Label htmlFor="bank" className="flex items-center gap-4 rounded-md border p-4 cursor-pointer hover:bg-accent has-[:checked]:bg-primary/10 has-[:checked]:border-primary">
                                    <RadioGroupItem value="bank" id="bank" />
                                    <div className="flex items-center gap-2">
                                        <Landmark className="w-5 h-5"/>
                                        <span>Bank Transfer</span>
                                    </div>
                                </Label>
                            </RadioGroup>
                             <div className="grid sm:grid-cols-2 gap-4 mt-6">
                                <div className="sm:col-span-2">
                                    <Label htmlFor="card-number">Card Number</Label>
                                    <Input id="card-number" placeholder="0000 0000 0000 0000" />
                                </div>
                                <div>
                                    <Label htmlFor="expiry">Expiry Date</Label>
                                    <Input id="expiry" placeholder="MM / YY" />
                                </div>
                                <div>
                                    <Label htmlFor="cvc">CVC</Label>
                                    <Input id="cvc" placeholder="123" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-1">
                     <Card className="bg-white sticky top-24">
                        <CardHeader>
                            <CardTitle>Order Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                             {cartItems.map(item => (
                                <div key={item.id} className="flex justify-between items-center text-sm">
                                    <div className="flex items-center gap-2">
                                         <Image src={item.image} alt={item.name} width={40} height={40} data-ai-hint={item.hint} className="rounded-md" />
                                         <div>
                                            <p className="font-medium line-clamp-1">{item.name}</p>
                                            <p className="text-muted-foreground">Qty: {item.quantity}</p>
                                         </div>
                                    </div>
                                    <p>{formatCurrency(item.price * item.quantity)}</p>
                                </div>
                            ))}
                            <Separator />
                            <div className="flex justify-between text-sm">
                                <p className="text-muted-foreground">Subtotal</p>
                                <p className="font-semibold">{formatCurrency(subtotal)}</p>
                            </div>
                            <div className="flex justify-between text-sm">
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
                            <Button size="lg" className="w-full" onClick={handlePlaceOrder}>
                                <Lock className="mr-2 h-4 w-4"/> Place Order
                            </Button>
                             <Button asChild variant="link" className="w-full text-muted-foreground">
                                <Link href="/dashboard/shop/cart">
                                     <ArrowLeft className="mr-2 h-4 w-4" /> Back to Cart
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                 </div>
            </div>
        </div>
    )
}
