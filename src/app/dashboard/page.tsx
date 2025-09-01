
'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ClientDashboard from './client-dashboard';
import ProfessionalDashboard from './professional-dashboard';
import InvestorDashboard from './investor/page';


const DashboardPageContent = () => {
    const searchParams = useSearchParams();
    const role = searchParams.get('role');

    if (role === 'professional') {
        return <ProfessionalDashboard />;
    }
    if (role === 'investor') {
        return <InvestorDashboard />;
    }
    return <ClientDashboard />;
}

export default function DashboardPage() {
    return (
        <Suspense fallback={<div>Loading dashboard...</div>}>
            <DashboardPageContent />
        </Suspense>
    );
}
