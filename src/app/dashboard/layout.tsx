
import { ReactNode } from 'react';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';


export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
        <Header />
        <div className="container flex-1 flex items-start py-8">
            <Sidebar />
            <main className="flex-1 lg:pl-8">
                {children}
            </main>
        </div>
    </div>
  );
}
