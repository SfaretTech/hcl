
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingBag, DollarSign, Package, Briefcase, PlusCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { professionalProducts, professionalOrders } from '@/lib/data';


export default function MarketplaceDashboard() {
  const totalRevenue = professionalOrders.reduce((acc, order) => acc + order.total, 0);
  const totalProducts = professionalProducts.length;
  const totalOrders = professionalOrders.length;
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(amount);
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">Marketplace</h1>
          <p className="text-muted-foreground">Manage your products, orders, and view sales performance.</p>
        </div>
        <Button size="lg" asChild>
          <Link href="/dashboard/professional/marketplace/products/new">
            <PlusCircle className="mr-2 h-5 w-5" />
            Add New Product
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="bg-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(totalRevenue)}</div>
                <p className="text-xs text-muted-foreground">From {totalOrders} orders</p>
            </CardContent>
        </Card>
         <Card className="bg-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Listed Products</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{totalProducts}</div>
                <p className="text-xs text-muted-foreground">Active listings</p>
            </CardContent>
        </Card>
        <Card className="bg-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
                <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{professionalOrders.filter(o => o.status === 'Pending').length}</div>
                <p className="text-xs text-muted-foreground">Out of {totalOrders} total orders</p>
            </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        <Card className="bg-white">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle>Recent Orders</CardTitle>
                    <Button variant="link" asChild>
                      <Link href="/dashboard/professional/marketplace/orders">View All <ArrowRight className="ml-1 h-4 w-4"/></Link>
                    </Button>
                </div>
                <CardDescription>Your most recent sales.</CardDescription>
            </CardHeader>
            <CardContent>
               <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {professionalOrders.slice(0, 5).map(order => (
                      <TableRow key={order.id}>
                        <TableCell>
                          <div className="font-medium">{order.customerName}</div>
                          <div className="text-sm text-muted-foreground">{order.id}</div>
                        </TableCell>
                        <TableCell>
                           <Badge variant={order.status === 'Delivered' ? 'secondary' : (order.status === 'Shipped' ? 'default' : 'outline')}>{order.status}</Badge>
                        </TableCell>
                        <TableCell className="text-right">{formatCurrency(order.total)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
            </CardContent>
        </Card>
         <Card className="bg-white">
            <CardHeader>
                 <div className="flex items-center justify-between">
                    <CardTitle>Top Products</CardTitle>
                     <Button variant="link" asChild>
                      <Link href="/dashboard/professional/marketplace/products">View All <ArrowRight className="ml-1 h-4 w-4"/></Link>
                    </Button>
                </div>
                <CardDescription>Your best-selling items.</CardDescription>
            </CardHeader>
            <CardContent>
               <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead className="text-right">Sales</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                     {[...professionalProducts].sort((a,b) => b.sales - a.sales).slice(0, 5).map(product => (
                      <TableRow key={product.id}>
                        <TableCell>
                          <div className="font-medium">{product.name}</div>
                          <div className="text-sm text-muted-foreground">{formatCurrency(product.price)}</div>
                        </TableCell>
                        <TableCell className="text-right">{product.sales}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
