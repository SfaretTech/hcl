
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Video, Bot, Truck, Users, Smartphone, HeartHandshake, TrendingUp } from 'lucide-react';
import { AIAssistant } from '@/components/ai-assistant';
import { Badge } from '@/components/ui/badge';

const servicesData = [
  {
    icon: Video,
    title: 'Telemedicine Consultations',
    description: [
      'On-demand virtual consultations with licensed healthcare professionals across various specialties.',
      'Accessible via mobile app, web platform, SMS, or voice call.',
    ],
  },
  {
    icon: Bot,
    title: 'Personalized AI-Driven Health Companion (PAHC)',
    description: [
      'A smart health assistant that uses AI, wearables, and mobile inputs to monitor vital signs, predict health risks, and provide custom health advice.',
    ],
  },
  {
    icon: Truck,
    title: 'Tele-Delivery & Logistics',
    description: [
      'Seamless fulfillment and delivery of prescribed medications directly to patients’ locations.',
      'Integration with partner pharmacies and logistics services.',
    ],
  },
  {
    icon: Users,
    title: 'Healthcare Referrals and Specialist Matching',
    description: [
      'Smart referral engine to connect patients with the right specialists locally or internationally.',
      'AI-assisted recommendation based on symptoms and history.',
    ],
  },
  {
    icon: Smartphone,
    title: 'HCOM HealthTech App',
    description: [
      'All-in-one mobile and web-based healthcare platform with chat, video, booking, and document upload features.',
    ],
  },
  {
    icon: HeartHandshake,
    title: 'HCOM-OUTREACH Movement',
    description: [
      'Community-focused health awareness campaigns, diagnostics, consultation camps, and subsidized services.',
    ],
  },
  {
    icon: TrendingUp,
    title: 'RAFFIM Investment Platform',
    description: [
      'Health product investment and retail distribution model allowing users to earn from medical product sales.',
    ],
  },
];

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <section id="services-hero" className="bg-white pt-24 pb-16 sm:pt-32 sm:pb-24">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
               <Badge variant="secondary" className="mb-4">Our Offerings</Badge>
              <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
                Comprehensive Digital Health Services
              </h1>
              <p className="mt-6 text-lg tracking-wide text-muted-foreground">
                We provide a holistic ecosystem of services designed to make healthcare accessible, intelligent, and patient-centric.
              </p>
            </div>
          </div>
        </section>
        
        <section id="services-list" className="bg-background">
          <div className="container">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {servicesData.map((service) => (
                <Card key={service.title} className="flex flex-col transition-transform transform hover:-translate-y-2 hover:shadow-xl bg-white">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <service.icon className="h-6 w-6" />
                      </div>
                      <CardTitle className="font-headline text-xl">{service.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <ul className="space-y-2 text-muted-foreground list-disc pl-5">
                      {service.description.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <AIAssistant />
    </div>
  );
}
