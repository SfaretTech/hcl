
'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Package, Search, Truck, CheckCircle2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { professionalOrders, type Order, type OrderStatus } from '@/lib/data';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(amount);
}

export default function MarketplaceOrdersPage() {
    const { toast } = useToast();
    const [orders, setOrders] = useState<Order[]>(professionalOrders);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');

    const filteredOrders = useMemo(() => {
        return orders.filter(order => {
            const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
            const matchesSearch = order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                  order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                  order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
            return matchesStatus && matchesSearch;
        });
    }, [orders, searchTerm, statusFilter]);
    
    const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
        setOrders(prev => prev.map(o => o.id === orderId ? {...o, status: newStatus} : o));
        toast({
            title: "Order Status Updated",
            description: `Order ${orderId} has been marked as ${newStatus}.`
        });
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight font-headline">My Orders</h1>
                <p className="text-muted-foreground">View and manage incoming orders for your products.</p>
            </div>
            
            <Card className="bg-white">
                <CardHeader>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="relative sm:col-span-3 lg:col-span-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input 
                                placeholder="Search by Order ID, Customer, Product..."
                                className="pl-10"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Filter by status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="All">All Statuses</SelectItem>
                                <SelectItem value="Pending">Pending</SelectItem>
                                <SelectItem value="Shipped">Shipped</SelectItem>
                                <SelectItem value="Delivered">Delivered</SelectItem>
                                <SelectItem value="Canceled">Canceled</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Order</TableHead>
                                <TableHead className="hidden sm:table-cell">Date</TableHead>
                                <TableHead className="hidden md:table-cell">Customer</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Total</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredOrders.map((order) => (
                                <TableRow key={order.id}>
                                    <TableCell>
                                        <div className="font-medium text-primary">{order.id}</div>
                                        <div className="text-xs text-muted-foreground">{order.items.length} items</div>
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell">{format(new Date(order.date), 'PPP')}</TableCell>
                                    <TableCell className="hidden md:table-cell">{order.customerName}</TableCell>
                                    <TableCell>
                                         <Badge variant={order.status === 'Delivered' ? 'secondary' : (order.status === 'Shipped' ? 'default' : 'outline')}>{order.status}</Badge>
                                    </TableCell>
                                    <TableCell className="text-right font-semibold">{formatCurrency(order.total)}</TableCell>
                                    <TableCell className="text-right">
                                         <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon">
                                                    <MoreHorizontal className="h-5 w-5" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuItem>
                                                    <Package className="mr-2 h-4 w-4"/> View Details
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem onClick={() => handleStatusChange(order.id, 'Shipped')}>
                                                    <Truck className="mr-2 h-4 w-4"/> Mark as Shipped
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => handleStatusChange(order.id, 'Delivered')}>
                                                     <CheckCircle2 className="mr-2 h-4 w-4"/> Mark as Delivered
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                     {filteredOrders.length === 0 && (
                        <div className="text-center py-16">
                            <p className="text-lg text-muted-foreground">No orders found matching your criteria.</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

