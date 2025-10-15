

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ThumbsUp, ThumbsDown, MessageSquare } from 'lucide-react';
import { AIAssistant } from '@/components/ai-assistant';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { generateArticles } from '@/ai/flows/generate-articles';

const outreachHighlights = [
  {
    image: 'https://images.unsplash.com/photo-1734139890055-d3353670b744?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxOXx8QW5udWFsJTIwSGVhbHRoJTIwfGVufDB8fHx8MTc1NTQ3MTI5NXww&ixlib=rb-4.1.0&q=80&w=1080',
    hint: 'community event',
    title: 'Annual Health Fair 2023',
    description: 'Our biggest event yet, providing free health screenings and wellness education to over 1,000 community members.',
  },
  {
    image: 'https://images.unsplash.com/photo-1628673178332-d268f98ef08a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxM3x8RGlnaXRhbCUyMExpdGVyYWN5JTIwZm9yJTIwU2VuaW9yc3xlbnwwfHx8fDE3NTU0NzEzNTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    hint: 'volunteers smiling',
    title: 'Digital Literacy for Seniors',
    description: 'Partnering with local centers to teach seniors how to use the HCOM app, connecting them with their health data like never before.',
  },
  {
    image: 'https://images.unsplash.com/photo-1708417134243-6d71770d82ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxSdXJhbCUyMEhlYWx0aCUyMEluaXRpYXRpdmV8ZW58MHx8fHwxNzU1NDcxNDE1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    hint: 'medical professionals',
    title: 'Rural Health Initiative',
    description: 'Deploying mobile health clinics to remote areas, bringing essential services and our technology to those who need it most.',
  },
   {
    image: 'https://images.unsplash.com/photo-1646579217809-7dbcd8120402?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxM3x8U2Nob29sJTIwSGVhbHRoJTIwUHJvZ3JhbXxlbnwwfHx8fDE3NTU0NzE0ODB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    hint: 'children health checkup',
    title: 'School Health Program',
    description: 'Conducting health checkups and awareness sessions in local schools to promote early wellness habits.',
  },
];

export default async function OutreachPage() {
  const { articles: latestArticles } = await generateArticles();

  return (
    <div className="relative min-h-dvh">
        <div className="absolute inset-0 -z-10">
            <Image
              src="https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3NHFyZXI1eDVjcjY5b2xwa2ZiOGJoaGFtb3hxZjc0YTN2cjh4dXJkOSZlcD12MV9naWZzX3JlbGF0ZWQmY3Q9Zw/IMNTpz8txJ6tmkTp7Q/giphy.gif"
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
            <section id="outreach-hero" className="bg-transparent pt-24 pb-16 sm:pt-32 sm:pb-24">
              <div className="container">
                <div className="max-w-4xl mx-auto text-center">
                   <Badge variant="secondary" className="mb-4">Our Mission in Action</Badge>
                  <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
                    Health Community Outreach Movement
                  </h1>
                  <p className="mt-6 text-lg tracking-wide text-muted-foreground">
                    We believe in the power of community. Our outreach programs are designed to educate, empower, and provide access to vital health resources to both rural and urban regions.
                  </p>
                </div>
              </div>
            </section>

            <section id="outreach-gallery" className="bg-transparent">
              <div className="container">
                 <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {outreachHighlights.map((highlight, index) => (
                    <Card key={index} className="overflow-hidden h-full flex flex-col transition-transform transform hover:-translate-y-2 hover:shadow-xl bg-white/80 backdrop-blur-md">
                      <Image src={highlight.image} width={600} height={400} alt={highlight.title} data-ai-hint={highlight.hint} className="w-full h-48 object-cover" />
                      <CardHeader>
                        <CardTitle className="font-headline">{highlight.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <p className="text-muted-foreground">{highlight.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </section>

            <section id="latest-news" className="bg-white/80 backdrop-blur-md">
              <div className="container">
                <div className="max-w-4xl mx-auto text-center mb-12">
                  <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">Latest News & Articles</h2>
                  <p className="mt-4 text-lg text-muted-foreground">Stay updated on our latest initiatives, stories, and impact.</p>
                </div>
                <div className="space-y-16">
                    {latestArticles.map((article, index) => (
                        <Card key={index} className="overflow-hidden shadow-lg border-none grid grid-cols-1 md:grid-cols-2 gap-0 items-center bg-background rounded-xl">
                             <div className={cn(index % 2 === 1 ? "md:order-last" : "md:order-first")}>
                               <Image src={article.image} width={800} height={450} alt={article.title} data-ai-hint={article.hint} className="w-full h-full object-cover rounded-l-xl md:rounded-l-none md:rounded-r-xl"/>
                            </div>
                            <div className="p-8">
                                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                                    <Badge variant="outline">{article.category}</Badge>
                                    <span>{article.date}</span>
                                </div>
                                <h3 className="font-headline text-2xl font-bold mb-4 text-foreground">{article.title}</h3>
                                <p className="text-muted-foreground mb-6">{article.excerpt}</p>
                                <div className="flex items-center justify-between">
                                    <Button>Read More</Button>
                                    <div className="flex items-center gap-4 text-muted-foreground">
                                        <div className="flex items-center gap-1.5">
                                            <Button variant="ghost" size="icon" className="h-8 w-8"><ThumbsUp className="h-4 w-4" /></Button>
                                            <span className="text-sm font-medium">{article.likes}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                           <Button variant="ghost" size="icon" className="h-8 w-8"><ThumbsDown className="h-4 w-4" /></Button>
                                            <span className="text-sm font-medium">{article.dislikes}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Button variant="ghost" size="icon" className="h-8 w-8"><MessageSquare className="h-4 w-4" /></Button>
                                            <span className="text-sm font-medium">{article.comments}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
                 <div className="text-center mt-16">
                    <Button size="lg" variant="outline">Load More Articles</Button>
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
