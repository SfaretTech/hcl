
import { ReactNode } from 'react';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';


export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
        <Header />
        <div className="flex flex-1">
            <Sidebar />
            <main className="flex-1 p-6 md:p-8 lg:p-10">
                {children}
            </main>
        </div>
    </div>
  );
}
