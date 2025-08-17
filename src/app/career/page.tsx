import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { AIAssistant } from '@/components/ai-assistant';
import { Button } from '@/components/ui/button';
import { Briefcase, Building, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

const jobOpenings = [
  {
    title: 'Senior Frontend Developer',
    location: 'Port Harcourt, Nigeria',
    type: 'Full-time',
    department: 'Technology',
    description: 'We are looking for an experienced Frontend Developer to build and maintain our cutting-edge HealthTech applications. You will work with React, Next.js, and TypeScript to create beautiful and performant user interfaces.'
  },
  {
    title: 'Community Health Officer',
    location: 'Remote, Nigeria',
    type: 'Contract',
    department: 'Outreach',
    description: 'Join our outreach team to lead health seminars, conduct diagnostic screenings, and bring vital health services to underserved communities across Nigeria.'
  },
  {
    title: 'AI/ML Engineer',
    location: 'Port Harcourt, Nigeria',
    type: 'Full-time',
    department: 'Technology',
    description: 'Develop and deploy machine learning models for our Personalized AI-Driven Health Companion (PAHC). Experience with NLP and predictive modeling is a plus.'
  },
  {
    title: 'Digital Marketing Specialist',
    location: 'Port Harcourt, Nigeria',
    type: 'Full-time',
    department: 'Marketing',
    description: 'Drive the growth of HCOM by developing and executing digital marketing campaigns across various channels. You will be responsible for SEO, SEM, and social media marketing.'
  }
]

export default function CareerPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <section id="career-hero" className="bg-white pt-24 pb-16 sm:pt-32 sm:pb-24">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <Badge variant="secondary" className="mb-4">Join Our Team</Badge>
              <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
                Build the Future of Healthcare with Us
              </h1>
              <p className="mt-6 text-lg tracking-wide text-muted-foreground">
                At HCOM, we are on a mission to make healthcare accessible to everyone. We are looking for passionate, talented individuals to join our team and make a real impact.
              </p>
            </div>
          </div>
        </section>

        <section id="open-positions" className="bg-background">
          <div className="container">
            <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl text-center mb-12">
              Current Openings
            </h2>
            <div className="grid gap-8 lg:grid-cols-2">
              {jobOpenings.map((job, index) => (
                <Card key={index} className="transition-shadow hover:shadow-xl bg-white">
                  <CardHeader>
                    <CardTitle className="font-headline text-2xl">{job.title}</CardTitle>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground pt-2">
                       <div className="flex items-center gap-1.5">
                        <Building className="h-4 w-4" />
                        <span>{job.department}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="h-4 w-4" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Briefcase className="h-4 w-4" />
                        <span>{job.type}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-6">{job.description}</p>
                    <Button>Apply Now</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
             {jobOpenings.length === 0 && (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">No open positions at the moment. Please check back later.</p>
              </div>
            )}
          </div>
        </section>
        
        <section id="why-join" className="bg-white">
            <div className="container">
                <div className="max-w-4xl mx-auto text-center mb-12">
                    <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">Why Join HCOM?</h2>
                    <p className="mt-4 text-lg text-muted-foreground">We offer a dynamic, inclusive, and innovative work environment where you can grow your career while making a difference.</p>
                </div>
                <div className="grid gap-8 md:grid-cols-3">
                    <div className="text-center p-6">
                        <h3 className="font-headline text-xl font-semibold mb-2">Meaningful Work</h3>
                        <p className="text-muted-foreground">Your work will directly contribute to improving healthcare access for millions of people in Nigeria.</p>
                    </div>
                    <div className="text-center p-6">
                        <h3 className="font-headline text-xl font-semibold mb-2">Growth Opportunities</h3>
                        <p className="text-muted-foreground">We are a fast-growing company with ample opportunities for professional development and career advancement.</p>
                    </div>
                    <div className="text-center p-6">
                        <h3 className="font-headline text-xl font-semibold mb-2">Collaborative Culture</h3>
                        <p className="text-muted-foreground">Join a team of passionate and talented individuals who are dedicated to working together to achieve our mission.</p>
                    </div>
                </div>
            </div>
        </section>
      </main>
      <Footer />
      <AIAssistant />
    </div>
  );
}
