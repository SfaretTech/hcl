
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ArrowDownCircle, ArrowUpCircle, Download, Landmark, CreditCard, Banknote } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

const transactions = [
    { id: 'txn-1', date: '2024-08-28', type: 'Deposit', amount: 500000, status: 'Completed' },
    { id: 'txn-2', date: '2024-08-25', type: 'Investment', description: 'RAFFIM Product Stake', amount: -250000, status: 'Completed' },
    { id: 'txn-3', date: '2024-08-22', type: 'Withdrawal', amount: -50000, status: 'Pending' },
    { id: 'txn-4', date: '2024-08-20', type: 'Dividend', description: 'RAFFIM Q3 Payout', amount: 12500, status: 'Completed' },
    { id: 'txn-5', date: '2024-07-30', type: 'Deposit', amount: 100000, status: 'Completed' },
    { id: 'txn-6', date: '2024-07-15', type: 'Investment', description: 'HCOM Equity', amount: -100000, status: 'Completed' },
];

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(amount);
}

export default function WalletPage() {
    const { toast } = useToast();
    const [isDepositOpen, setDepositOpen] = useState(false);
    const [isWithdrawOpen, setWithdrawOpen] = useState(false);

    const handleDeposit = (amount: number) => {
        setDepositOpen(false);
        toast({
            title: 'Deposit Initiated',
            description: `Your deposit of ${formatCurrency(amount)} is being processed.`,
        });
    }

    const handleWithdraw = (amount: number) => {
        setWithdrawOpen(false);
        toast({
            title: 'Withdrawal Requested',
            description: `Your withdrawal request for ${formatCurrency(amount)} has been submitted for review.`,
        });
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight font-headline">My Wallet</h1>
                    <p className="text-muted-foreground">Manage your funds, deposits, and withdrawals.</p>
                </div>
                <div className="flex gap-2">
                    <Dialog open={isDepositOpen} onOpenChange={setDepositOpen}>
                        <DialogTrigger asChild><Button><ArrowDownCircle className="mr-2 h-4 w-4"/> Deposit Funds</Button></DialogTrigger>
                        <DialogContent>
                            <DialogHeader><DialogTitle>Deposit Funds</DialogTitle><DialogDescription>Select a method to add funds to your wallet.</DialogDescription></DialogHeader>
                            {/* Deposit Form would go here */}
                            <p className="text-center text-muted-foreground py-8">Deposit form placeholder</p>
                            <Button onClick={() => handleDeposit(50000)}>Simulate Deposit</Button>
                        </DialogContent>
                    </Dialog>
                    <Dialog open={isWithdrawOpen} onOpenChange={setWithdrawOpen}>
                        <DialogTrigger asChild><Button variant="outline"><ArrowUpCircle className="mr-2 h-4 w-4"/> Withdraw Funds</Button></DialogTrigger>
                         <DialogContent>
                            <DialogHeader><DialogTitle>Withdraw Funds</DialogTitle><DialogDescription>Request a withdrawal to your linked bank account.</DialogDescription></DialogHeader>
                             {/* Withdrawal Form would go here */}
                             <p className="text-center text-muted-foreground py-8">Withdrawal form placeholder</p>
                            <Button onClick={() => handleWithdraw(20000)}>Simulate Withdrawal</Button>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

             <Card className="bg-white">
                <CardHeader>
                    <CardTitle>Current Balance</CardTitle>
                    <CardDescription>The total amount of funds available in your wallet.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-4xl font-bold text-primary">{formatCurrency(250000)}</p>
                </CardContent>
            </Card>

            <Card className="bg-white">
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle>Transaction History</CardTitle>
                        <Button variant="outline" size="sm"><Download className="mr-2 h-4 w-4"/> Export CSV</Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead className="text-right">Amount</TableHead>
                                <TableHead className="text-right">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {transactions.map(tx => (
                                <TableRow key={tx.id}>
                                    <TableCell>{format(new Date(tx.date), 'PPP')}</TableCell>
                                    <TableCell><Badge variant="outline">{tx.type}</Badge></TableCell>
                                    <TableCell>{tx.description || '---'}</TableCell>
                                    <TableCell className={cn("text-right font-medium", tx.amount > 0 ? 'text-green-600' : 'text-foreground')}>{formatCurrency(tx.amount)}</TableCell>
                                    <TableCell className="text-right"><Badge variant={tx.status === 'Completed' ? 'secondary' : 'default'}>{tx.status}</Badge></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
