
import { ReactNode } from 'react';
import { Sidebar } from '@/components/sidebar';
import { DashboardHeader } from '@/components/dashboard-header';
import Image from 'next/image';


export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
        <DashboardHeader />
        <div className="flex flex-1">
             <Sidebar />
             <main className="flex-1 relative">
                <div className="absolute inset-0 -z-10">
                    <Image 
                        src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
                        alt="Abstract background"
                        fill
                        className="object-cover opacity-10"
                    />
                     <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/50"></div>
                </div>
                <div className="container py-8">
                   {children}
                </div>
            </main>
        </div>
    </div>
  );
}
