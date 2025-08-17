import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Rocket, Eye, Gem } from 'lucide-react';
import { AIAssistant } from '@/components/ai-assistant';

const missionData = {
  mission: {
    icon: Rocket,
    title: 'Our Mission',
    description: 'To ensure that everyone has access to the care they need, regardless of geographical barriers through Tele Medical and Holistic Delivery.',
  },
  vision: {
    icon: Eye,
    title: 'Our Vision',
    description: 'To create a future where healthcare is truly accessible to all individuals, irrespective of their location or socio-economic status through Holistic care and Technology.',
  },
  values: {
    icon: Gem,
    title: 'Core Values',
    description: 'Accessibility, Innovation, Compassion, and Integrity. These values guide every decision we make and every interaction we have.',
  },
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <section id="about" className="bg-white pt-24 pb-16 sm:pt-32 sm:pb-24">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h1 className="font-headline text-4xl font-bold tracking-tight text-center text-foreground sm:text-5xl md:text-6xl">
                About HCOM International
              </h1>
              <p className="mt-8 text-lg text-muted-foreground">
                HCOM International Limited is a Nigeria-based, technology-driven telemedical and healthcare consultancy Health Startups company dedicated to transforming access to quality healthcare through innovation, inclusivity, and digital connectivity. Positioned at the intersection of healthcare delivery and technological advancement, HCOM offers a comprehensive ecosystem of services designed to meet the evolving needs of individuals, professionals, and healthcare institutions across both rural and urban regions.
              </p>
              <p className="mt-4 text-lg text-muted-foreground">
                more coming...
              </p>
            </div>
          </div>
        </section>
        
        <section id="mission" className="bg-background">
          <div className="container">
            <div className="grid gap-8 md:grid-cols-3">
              {Object.values(missionData).map((item) => (
                <Card key={item.title} className="text-center transition-transform transform hover:-translate-y-2 hover:shadow-xl">
                  <CardHeader>
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <item.icon className="h-8 w-8" />
                    </div>
                    <CardTitle className="font-headline mt-4">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{item.description}</p>
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
