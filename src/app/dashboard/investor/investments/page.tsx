
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DollarSign, TrendingUp, HeartHandshake, Percent, Calendar, PlusCircle, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

const investmentOpportunities = [
    {
        title: "RAFFIM Product Stakeholding",
        category: "Product Investment",
        image: "https://images.unsplash.com/photo-1690787229559-5ca66ec89826?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxN3x8aGVhbHRoJTIwSW52ZXN0bWVudCUyMFByb2dyYW18ZW58MHx8fHwxNzU1NDY5NDY5fDA&ixlib=rb-4.1.0&q=80&w=1080",
        hint: "investment product",
        description: "Invest directly in high-demand medical products and earn returns from sales. A direct way to support healthcare access while growing your capital.",
        stats: [
            { icon: Percent, label: "Est. Return", value: "15-25% Annually" },
            { icon: Calendar, label: "Term", value: "6-12 Months" },
        ],
        status: 'Open'
    },
    {
        title: "HCOM Company Equity (Series A)",
        category: "Equity",
        image: "https://images.unsplash.com/photo-1579621970795-87f91d258143?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxpbnZlc3RvcnxlbnwwfHx8fDE3NTU0NzU4MjF8MA&ixlib=rb-4.1.0&q=80&w=1080",
        hint: "financial growth",
        description: "Become a shareholder in HCOM International. This funding round supports our expansion into new states and the enhancement of our AI platform.",
        stats: [
            { icon: DollarSign, label: "Min. Investment", value: "₦5,000,000" },
            { icon: TrendingUp, label: "Type", value: "Growth Equity" },
        ],
        status: 'Open'
    },
    {
        title: "Community Outreach Sponsorship",
        category: "Donation/Sponsorship",
        image: "https://images.unsplash.com/photo-1695462131544-7f3928ee9159?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyMHx8eW91JTIwYW5kJTIweW91ciUyMGhlYWx0aHxlbnwwfHx8fDE3NTU0NzEwNjd8MA&ixlib=rb-4.1.0&q=80&w=1080",
        hint: "community giving",
        description: "Sponsor a specific community health initiative. Your contribution directly funds medical camps, free screenings, and health education in underserved areas.",
        stats: [
            { icon: HeartHandshake, label: "Impact", value: "Direct Community Support" },
            { icon: DollarSign, label: "Contribution", value: "From ₦50,000" },
        ],
        status: 'Open'
    },
    {
        title: "Technology Development Fund",
        category: "Product Investment",
        image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxoZWFsdGhjYXJlJTIwdGVjaG5vbG9neSUyMGFic3RyYWN0fGVufDB8fHx8MTc1NTQ3MDI3N3ww&ixlib=rb-4.1.0&q=80&w=1080",
        hint: "healthcare technology",
        description: "Fund the next wave of innovation for our HealthTech app and AI companion. This is a high-impact opportunity to shape the future of digital health in Nigeria.",
        stats: [
            { icon: Percent, label: "Est. Return", value: "Variable" },
            { icon: TrendingUp, label: "Type", value: "Venture Debt" },
        ],
        status: 'Closed'
    }
];

export default function InvestmentsPage() {
    const { toast } = useToast();

    const handleInvest = (title: string) => {
        toast({
            title: "Investment Request Submitted",
            description: `Your interest in "${title}" has been recorded. Our team will contact you with the next steps.`,
        });
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight font-headline">Investment Opportunities</h1>
                    <p className="text-muted-foreground">Browse and invest in initiatives that drive health and growth.</p>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {investmentOpportunities.map((opp, index) => (
                    <Card key={index} className="bg-white hover:shadow-xl transition-shadow flex flex-col">
                        <CardHeader className="p-0">
                             <Image 
                                src={opp.image}
                                alt={opp.title}
                                width={600}
                                height={300}
                                data-ai-hint={opp.hint}
                                className="rounded-t-lg aspect-video object-cover"
                            />
                        </CardHeader>
                        <div className="p-6 flex flex-col flex-grow">
                             <div className="flex justify-between items-start mb-2">
                                <Badge variant="secondary">{opp.category}</Badge>
                                <Badge variant={opp.status === 'Open' ? 'default' : 'destructive'} className={opp.status === 'Open' ? 'bg-green-600' : ''}>{opp.status}</Badge>
                            </div>
                            <CardTitle className="font-headline text-xl mb-2">{opp.title}</CardTitle>
                            <CardDescription className="flex-grow">{opp.description}</CardDescription>
                            
                            <div className="my-6 space-y-3">
                                {opp.stats.map(stat => (
                                    <div key={stat.label} className="flex items-center gap-2 text-sm">
                                        <stat.icon className="w-4 h-4 text-primary"/>
                                        <span className="text-muted-foreground">{stat.label}:</span>
                                        <span className="font-semibold">{stat.value}</span>
                                    </div>
                                ))}
                            </div>
                            
                            <div className="flex items-center gap-2">
                                <Input type="number" placeholder="Enter amount (NGN)" className="bg-background" disabled={opp.status === 'Closed'} />
                                <Button className="w-full sm:w-auto" onClick={() => handleInvest(opp.title)} disabled={opp.status === 'Closed'}>
                                   Invest Now
                                </Button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
