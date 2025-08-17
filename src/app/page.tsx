import Image from 'next/image';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ContactForm } from '@/components/contact-form';
import { AIAssistant } from '@/components/ai-assistant';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { HeartHandshake, Microscope, Target, TrendingUp, Download, Bot, DollarSign, Rocket, Eye, Gem } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { cn } from '@/lib/utils';

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

const departments = [
  {
    name: "Technology & Innovation",
    icon: Microscope,
    description: "This department is the engine of HCOM, responsible for developing and maintaining our cutting-edge HealthTech App and Personalized AI-Driven Health Companion (PAHC). Our team creates seamless tools that put health in the hands of our users, integrating specialized fields like Radiology, Medicine, and Pharmacy into our digital services."
  },
  {
    name: "Community Outreach",
    icon: HeartHandshake,
    description: "The Health Community Outreach Movement is the heart of our company. This department provides low-cost or free seminars, diagnostics, and therapy to underserved populations, making vital health resources accessible to all."
  },
  {
    name: "Research & Development",
    icon: Target,
    description: "Focused on the future of health, our R&D department explores emerging technologies to pioneer new approaches to personalized medicine and ensure HCOM remains at the forefront of the HealthTech industry."
  },
  {
    name: "RAFFIM Program",
    icon: TrendingUp,
    description: "The RAFFIM department manages our innovative health investment and referral system, enabling individuals to invest in high-demand health products and earn returns, combining social entrepreneurship with health impact."
  }
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <section id="home" className="relative bg-white pt-24 pb-16 sm:pt-32 sm:pb-24">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-48 left-0 h-[40rem] w-[40rem] rounded-full bg-primary/5 blur-[100px]"></div>
            <div className="absolute -bottom-48 right-0 h-[40rem] w-[40rem] rounded-full bg-accent/10 blur-[100px]"></div>
          </div>
          <div className="container relative text-center">
            <Badge variant="outline" className="mb-4 border-primary/50 text-primary">Innovating for a Healthier Nigeria</Badge>
            <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              Transforming Healthcare Access Across Nigeria
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-lg tracking-wide text-muted-foreground">
              HCOM International is a technology-driven company dedicated to making quality healthcare universally accessible, affordable, and efficient through our innovative platforms and community outreach.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button size="lg" asChild className="font-bold">
                <Link href="/services">Our Services</Link>
              </Button>
              <Button size="lg" variant="ghost" asChild className="font-bold group">
                <a href="#contact">Get In Touch <span className="ml-2 transition-transform group-hover:translate-x-1" aria-hidden="true">&rarr;</span></a>
              </Button>
            </div>
          </div>
        </section>

        <section id="mission-summary" className="bg-background">
          <div className="container">
            <div className="grid gap-8 md:grid-cols-3">
              {Object.values(missionData).map((item) => (
                <Card key={item.title} className="text-center transition-transform transform hover:-translate-y-2 hover:shadow-xl bg-white">
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
            <div className="text-center mt-12">
              <Button size="lg" asChild className="font-bold">
                <Link href="/about">Learn More About Us</Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="platform" className="bg-white">
          <div className="container">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <Badge variant="secondary" className="mb-4">Our Technology</Badge>
                <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">Our Digital Health Ecosystem</h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  HCOM technology infrastructure is built on a secure, scalable, and cloud-based architecture that integrates AI-powered diagnostics, real-time consultation modules, encrypted communication channels, and automated backend workflows
                </p>
                <div className="mt-8 space-y-6">
                  <Card className="bg-background/50 transition-transform transform hover:-translate-y-2 hover:shadow-xl">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3 font-headline"><Download className="h-6 w-6 text-primary"/> HCOM HealthTech App</CardTitle>
                      <CardDescription>Your central hub for virtual consultations, remote diagnostics, e-prescriptions, and health records. Secure, user-friendly, and powerful.</CardDescription>
                    </CardHeader>
                  </Card>
                   <Card className="bg-background/50 transition-transform transform hover:-translate-y-2 hover:shadow-xl">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3 font-headline"><Bot className="h-6 w-6 text-primary"/> PAHC Health Companion</CardTitle>
                      <CardDescription>Your Personalized AI-Driven Health Companion offers real-time advice, health monitoring, and support based on your unique health profile.</CardDescription>
                    </CardHeader>
                  </Card>
                </div>
                 <Button size="lg" className="mt-8 font-bold" asChild>
                    <Link href="/product">Learn More about our App</Link>
                  </Button>
              </div>
              <div className="flex justify-center">
                 <Image src="https://images.unsplash.com/photo-1674049406107-f5c1e8258d4a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxIZWFsdGglMjB0ZWNofGVufDB8fHx8MTc1NTQ2OTIwMXww&ixlib=rb-4.1.0&q=80&w=1080" width={500} height={500} alt="HCOM App interface" data-ai-hint="app interface" className="rounded-2xl shadow-2xl" />
              </div>
            </div>
          </div>
        </section>
        
        <section id="departments" className="bg-background">
          <div className="container max-w-4xl mx-auto">
            <div className="text-center">
              <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">Our Core Services</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                The pillars of our organization, working in synergy to deliver comprehensive healthcare solutions.
              </p>
            </div>
            <Accordion type="single" collapsible className="w-full mt-12">
              {departments.map((dept) => (
                <AccordionItem value={dept.name} key={dept.name} className="bg-white rounded-lg mb-4 shadow-sm px-6">
                  <AccordionTrigger className="font-headline text-lg hover:no-underline">
                    <div className="flex items-center gap-4">
                      <dept.icon className="h-6 w-6 text-primary" />
                      {dept.name}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground pt-2 pb-4">
                    {dept.description}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <section id="outreach" className="bg-background">
           <div className="container">
            <div className="grid items-center gap-12 lg:grid-cols-2">
               <div className="flex justify-center lg:order-last">
                 <Image src="/hcom-outreach-hub.png" width={500} height={500} alt="Community outreach event" data-ai-hint="community health fair" className="rounded-2xl shadow-2xl" />
              </div>
              <div>
                <Badge variant="secondary" className="mb-4">Making a Difference</Badge>
                <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">Health Community Outreach</h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Our commitment extends beyond digital platforms. We actively engage with communities to provide on-the-ground support, education, and free health services to those in need.
                </p>
                 <Button size="lg" variant="outline" className="mt-8 font-bold" asChild>
                    <Link href="/outreach">Explore Our Initiatives</Link>
                  </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="raffim" className="bg-white">
          <div className="container">
             <div className="grid items-center gap-12 lg:grid-cols-2">
               <div className="flex justify-center">
                 <Image src="https://images.unsplash.com/photo-1690787229559-5ca66ec89826?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxN3x8aGVhbHRoJTIwSW52ZXN0bWVudCUyMFByb2dyYW18ZW58MHx8fHwxNzU1NDY5NDY5fDA&ixlib=rb-4.1.0&q=80&w=1080" width={500} height={500} alt="RAFFIM program chart" data-ai-hint="investment chart" className="rounded-2xl shadow-2xl" />
              </div>
              <div>
                <Badge variant="secondary" className="mb-4">Invest in Health</Badge>
                <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">The RAFFIM Investment Program</h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  RAFFIM (Revolutionary AI-For-Financial-&-Investment-in-Medicine) is our groundbreaking initiative that allows you to invest in the future of healthcare while earning returns.
                </p>
                <ul className="mt-8 space-y-4 text-muted-foreground">
                  <li className="flex items-start gap-3"><DollarSign className="h-6 w-5 text-primary flex-shrink-0 mt-1" /><span><strong>Invest &amp; Earn:</strong> Invest in high-demand health products and earn returns through our stakeholding programs.</span></li>
                  <li className="flex items-start gap-3"><TrendingUp className="h-6 w-5 text-primary flex-shrink-0 mt-1" /><span><strong>Drive Social Impact:</strong> Your investment combines social entrepreneurship with health impact, funding vital services.</span></li>
                  <li className="flex items-start gap-3"><HeartHandshake className="h-6 w-5 text-primary flex-shrink-0 mt-1" /><span><strong>Join a Community:</strong> Be part of a movement that's improving health outcomes and creating economic opportunity.</span></li>
                </ul>
                 <Button size="lg" variant="outline" className="mt-8 font-bold">
                    Become a Partner
                  </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="bg-background">
          <div className="container max-w-4xl mx-auto">
             <div className="text-center">
              <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">Connect With Us</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                We're always looking for partners, investors, and healthcare professionals to join our mission. Let's build the future of healthcare together.
              </p>
            </div>
            <div className="mt-12">
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <AIAssistant />
    </div>
  );
}
