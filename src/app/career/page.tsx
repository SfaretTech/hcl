import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { AIAssistant } from '@/components/ai-assistant';
import { Button } from '@/components/ui/button';
import { Briefcase, Building, MapPin, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ApplicationForm } from '@/components/application-form';

const jobOpenings = [
  {
    title: 'Senior Frontend Developer',
    location: 'Port Harcourt, Nigeria',
    type: 'Full-time',
    department: 'Technology',
    deadline: 'August 31, 2024',
    description: 'We are looking for an experienced Frontend Developer to build and maintain our cutting-edge HealthTech applications. You will work with React, Next.js, and TypeScript to create beautiful and performant user interfaces.',
    responsibilities: [
      'Develop and maintain user-facing features using React.js and Next.js.',
      'Build reusable components and front-end libraries for future use.',
      'Translate designs and wireframes into high-quality code.',
      'Optimize components for maximum performance across a vast array of web-capable devices and browsers.',
    ],
    qualifications: [
      'Strong proficiency in JavaScript, including DOM manipulation and the JavaScript object model.',
      'Thorough understanding of React.js and its core principles.',
      'Experience with popular React.js workflows (such as Flux or Redux).',
      'Familiarity with newer specifications of EcmaScript.',
      'Experience with data structure libraries (e.g., Immutable.js).',
      'Knowledge of modern authorization mechanisms, such as JSON Web Token.',
    ]
  },
  {
    title: 'Community Health Officer',
    location: 'Remote, Nigeria',
    type: 'Contract',
    department: 'Outreach',
    deadline: 'September 15, 2024',
    description: 'Join our outreach team to lead health seminars, conduct diagnostic screenings, and bring vital health services to underserved communities across Nigeria.',
    responsibilities: [
        'Organize and conduct health education and awareness campaigns in designated communities.',
        'Perform basic health screenings and refer cases to appropriate healthcare facilities.',
        'Collect and manage data on community health needs and services provided.',
        'Liaise with community leaders and stakeholders to promote HCOM\'s initiatives.',
    ],
    qualifications: [
        'Certificate or Diploma in Community Health or a related field.',
        'Proven experience in community mobilization and health education.',
        'Excellent communication and interpersonal skills.',
        'Ability to work independently and travel to remote areas.',
    ]
  },
  {
    title: 'AI/ML Engineer',
    location: 'Port Harcourt, Nigeria',
    type: 'Full-time',
    department: 'Technology',
    deadline: 'September 5, 2024',
    description: 'Develop and deploy machine learning models for our Personalized AI-Driven Health Companion (PAHC). Experience with NLP and predictive modeling is a plus.',
     responsibilities: [
      'Design, build, and maintain scalable machine learning systems.',
      'Research and implement appropriate ML algorithms and tools.',
      'Develop machine learning applications according to requirements.',
      'Perform statistical analysis and fine-tuning using test results.',
    ],
    qualifications: [
      'Proven experience as an AI/ML Engineer or similar role.',
      'Deep knowledge of math, probability, statistics, and algorithms.',
      'Expertise in Python, Java, and R.',
      'Familiarity with machine learning frameworks (like Keras or PyTorch) and libraries (like scikit-learn).',
    ]
  },
  {
    title: 'Digital Marketing Specialist',
    location: 'Port Harcourt, Nigeria',
    type: 'Full-time',
    department: 'Marketing',
    deadline: 'August 25, 2024',
    description: 'Drive the growth of HCOM by developing and executing digital marketing campaigns across various channels. You will be responsible for SEO, SEM, and social media marketing.',
     responsibilities: [
      'Plan and execute all digital marketing, including SEO/SEM, marketing database, email, social media, and display advertising campaigns.',
      'Design, build, and maintain our social media presence.',
      'Measure and report performance of all digital marketing campaigns and assess against goals (ROI and KPIs).',
      'Identify trends and insights, and optimize spend and performance based on the insights.',
    ],
    qualifications: [
      'Proven working experience in digital marketing.',
      'Demonstrable experience leading and managing SEO/SEM, marketing database, email, social media and/or display advertising campaigns.',
      'Highly creative with experience in identifying target audiences and devising digital campaigns that engage, inform, and motivate.',
      'Solid knowledge of website analytics tools (e.g., Google Analytics, NetInsight, WebTrends).',
    ]
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
                <Card key={index} className="transition-shadow hover:shadow-xl bg-white flex flex-col">
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
                       <div className="flex items-center gap-1.5">
                        <Calendar className="h-4 w-4" />
                        <span>Apply by {job.deadline}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground mb-6">{job.description}</p>
                     <div className="flex items-center gap-4">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button>Apply Now</Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>Apply for {job.title}</DialogTitle>
                              <DialogDescription>
                                Fill out the form below to submit your application. We look forward to hearing from you!
                              </DialogDescription>
                            </DialogHeader>
                            <ApplicationForm />
                          </DialogContent>
                        </Dialog>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="outline">Read More</Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-2xl max-h-[90vh] flex flex-col">
                                <DialogHeader>
                                    <DialogTitle className="font-headline text-2xl">{job.title}</DialogTitle>
                                    <DialogDescription className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm pt-2">
                                        <div className="flex items-center gap-1.5"><Building className="h-4 w-4" /><span>{job.department}</span></div>
                                        <div className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /><span>{job.location}</span></div>
                                        <div className="flex items-center gap-1.5"><Briefcase className="h-4 w-4" /><span>{job.type}</span></div>
                                        <div className="flex items-center gap-1.5"><Calendar className="h-4 w-4" /><span>Apply by {job.deadline}</span></div>
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="flex-grow overflow-y-auto pr-4 -mr-4">
                                  <div className="space-y-6 mt-4">
                                      <div>
                                          <h3 className="font-headline text-lg font-semibold mb-2">Job Description</h3>
                                          <p className="text-muted-foreground">{job.description}</p>
                                      </div>
                                      <div>
                                          <h3 className="font-headline text-lg font-semibold mb-2">Responsibilities</h3>
                                          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                                              {job.responsibilities.map((resp, i) => <li key={i}>{resp}</li>)}
                                          </ul>
                                      </div>
                                      <div>
                                          <h3 className="font-headline text-lg font-semibold mb-2">Qualifications</h3>
                                          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                                              {job.qualifications.map((qual, i) => <li key={i}>{qual}</li>)}
                                          </ul>
                                      </div>
                                  </div>
                                </div>
                                <Dialog>
                                  <DialogTrigger asChild>
                                      <Button className="mt-6 w-full">Apply Now</Button>
                                  </DialogTrigger>
                                  <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                      <DialogTitle>Apply for {job.title}</DialogTitle>
                                      <DialogDescription>
                                        Fill out the form below to submit your application. We look forward to hearing from you!
                                      </DialogDescription>
                                    </DialogHeader>
                                    <ApplicationForm />
                                  </DialogContent>
                                </Dialog>
                            </DialogContent>
                        </Dialog>
                     </div>
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
