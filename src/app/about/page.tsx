
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Rocket, Eye, Gem, Linkedin, Twitter } from 'lucide-react';
import { AIAssistant } from '@/components/ai-assistant';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

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

const teamMembers = [
  {
    name: 'Dr. Evelyn Reed',
    role: 'CEO & Founder',
    image: 'https://placehold.co/200x200.png',
    hint: 'professional headshot',
    socials: {
      linkedin: '#',
      twitter: '#',
    },
  },
  {
    name: 'Samuel Chen',
    role: 'Chief Technology Officer',
    image: 'https://placehold.co/200x200.png',
    hint: 'developer portrait',
    socials: {
      linkedin: '#',
      twitter: '#',
    },
  },
  {
    name: 'Amina Khan',
    role: 'Head of Community Outreach',
    image: 'https://placehold.co/200x200.png',
    hint: 'community leader',
    socials: {
      linkedin: '#',
      twitter: '#',
    },
  },
  {
    name: 'Ben Carter',
    role: 'Lead UX Designer',
    image: 'https://placehold.co/200x200.png',
    hint: 'designer smiling',
    socials: {
      linkedin: '#',
      twitter: '#',
    },
  },
  {
    name: 'Maria Garcia',
    role: 'Director of RAFFIM Program',
    image: 'https://placehold.co/200x200.png',
    hint: 'finance professional',
    socials: {
      linkedin: '#',
      twitter: '#',
    },
  },
    {
    name: 'John Doe',
    role: 'Project Manager',
    image: 'https://placehold.co/200x200.png',
    hint: 'professional smiling',
    socials: {
      linkedin: '#',
      twitter: '#',
    },
  },
];


export default function AboutPage() {
  return (
    <div className="relative min-h-dvh">
        <div className="absolute inset-0 -z-10">
            <Image
              src="https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3NHFyZXI1eDVjcjY5b2xwa2ZiOGJoaGFtb3hxZjc0YTN2cjh4dXJkOSZlcD12MV9naWZzX3JlbGF0ZWQmY3Q9Zw/IVWrXDIfjLT77Ly6Kp/giphy.gif"
              alt="Abstract background"
              fill
              objectFit="cover"
              className="opacity-80"
              data-ai-hint="abstract animation"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/90 to-background"></div>
        </div>
        <div className="flex flex-col min-h-dvh bg-transparent text-foreground">
            <Header />
            <main className="flex-1">
                <section id="about" className="bg-transparent pt-24 pb-16 sm:pt-32 sm:pb-24">
                <div className="container">
                    <div className="max-w-4xl mx-auto">
                    <h1 className="font-headline text-4xl font-bold tracking-tight text-center text-foreground sm:text-5xl md:text-6xl">
                        About HCOM International
                    </h1>
                    <p className="mt-8 text-lg text-muted-foreground">
                        HCOM International Limited is a Nigeria-based, technology-driven telemedical and healthcare consultancy Health Startups company dedicated to transforming access to quality healthcare through innovation, inclusivity, and digital connectivity. Positioned at the intersection of healthcare delivery and technological advancement, HCOM offers a comprehensive ecosystem of services designed to meet the evolving needs of individuals, professionals, and healthcare institutions across both rural and urban regions.
                    </p>
                    </div>
                </div>
                </section>
                
                <section id="mission" className="bg-transparent py-16 sm:py-24">
                <div className="container">
                    <div className="grid gap-8 md:grid-cols-3">
                    {Object.values(missionData).map((item) => (
                        <Card key={item.title} className="text-center transition-transform transform hover:-translate-y-2 hover:shadow-xl bg-white/80 backdrop-blur-md">
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

                <section id="team" className="bg-white/80 backdrop-blur-md py-16 sm:py-24">
                <div className="container">
                    <div className="max-w-4xl mx-auto text-center">
                    <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">Meet Our Team</h2>
                    <p className="mt-4 text-lg text-muted-foreground">The passionate minds driving the HCOM mission forward.</p>
                    </div>
                    <div className="mt-12">
                    <Carousel className="w-full" opts={{ loop: true, align: 'start' }}>
                        <CarouselContent>
                        {teamMembers.map((member, index) => (
                            <CarouselItem key={index} className="sm:basis-1/2 md:basis-1/3 lg:basis-1/5">
                            <div className="p-4">
                                <div className="text-center">
                                <Image src={member.image} data-ai-hint={member.hint} alt={`Photo of ${member.name}`} width={200} height={200} className="rounded-full mx-auto w-40 h-40 object-cover shadow-lg border-4 border-white" />
                                <h3 className="font-headline mt-4 text-xl font-semibold">{member.name}</h3>
                                <p className="text-primary">{member.role}</p>
                                <div className="mt-2 flex justify-center gap-4">
                                    <Link href={member.socials.linkedin}>
                                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                                        <Linkedin className="h-5 w-5" />
                                        <span className="sr-only">LinkedIn</span>
                                    </Button>
                                    </Link>
                                    <Link href={member.socials.twitter}>
                                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                                        <Twitter className="h-5 w-5" />
                                        <span className="sr-only">Twitter</span>
                                    </Button>
                                    </Link>
                                </div>
                                </div>
                            </div>
                            </CarouselItem>
                        ))}
                        </CarouselContent>
                        <CarouselPrevious className="-left-4 sm:-left-6 md:-left-8"/>
                        <CarouselNext className="-right-4 sm:-right-6 md:-right-8"/>
                    </Carousel>
                    </div>
                </div>
                </section>
            </main>
            <Footer />
            <AIAssistant />
        </div>
    </div>
  );
}
