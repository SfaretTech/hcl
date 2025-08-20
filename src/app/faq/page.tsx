
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { AIAssistant } from '@/components/ai-assistant';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const faqData = [
    {
        question: "What is HCOM International?",
        answer: "HCOM International Limited is a Nigeria-based, technology-driven telemedical and healthcare consultancy company dedicated to transforming access to quality healthcare through innovation, inclusivity, and digital connectivity."
    },
    {
        question: "What services does HCOM offer?",
        answer: "HCOM offers a comprehensive ecosystem of services, including virtual consultations (telemedicine), remote diagnostics, AI-assisted health monitoring, electronic prescriptions, tele-delivery of medications, and healthcare referrals through its flagship platforms: the HCOM HealthTech App and the Personalized AI-Driven Health Companion (PAHC)."
    },
    {
        question: "What is the Health Community Outreach Movement?",
        answer: "It is a public health initiative led by HCOM aimed at providing low-cost or free healthcare seminars, diagnostics, therapy, and medical product distribution to underserved populations in both rural and urban areas."
    },
    {
        question: "What is the RAFFIM program?",
        answer: "RAFFIM is an innovative health investment and referral system that enables individuals to invest in high-demand health products and earn returns. It combines social entrepreneurship with health impact, creating a sustainable model for expanding healthcare access."
    },
    {
        question: "How does HCOM ensure the quality of care?",
        answer: "HCOM ensures quality through its specialized departments in Radiology, Medicine, Pharmacy, and Occupational Health. We onboard licensed health professionals and organizations, and our platforms are built with secure, encrypted APIs to ensure patient data privacy and reliable service delivery."
    },
    {
        question: "Is HCOM available throughout Nigeria?",
        answer: "Our goal is to expand telemedicine access to all 36 Nigerian states and the FCT. We are continuously working to increase our reach, with a particular focus on underserved rural communities."
    }
];

export default function FAQPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <section id="faq-hero" className="bg-white pt-24 pb-16 sm:pt-32 sm:pb-24">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <Badge variant="secondary" className="mb-4">How can we help?</Badge>
              <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
                Frequently Asked Questions
              </h1>
              <p className="mt-6 text-lg tracking-wide text-muted-foreground">
                Find quick answers to common questions about HCOM's mission, services, and platform.
              </p>
            </div>
          </div>
        </section>

        <section id="faq-accordion" className="bg-background">
          <div className="container max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="w-full space-y-4">
                {faqData.map((faq, index) => (
                    <AccordionItem value={`item-${index}`} key={index} className="bg-white rounded-lg shadow-sm px-6">
                        <AccordionTrigger className="font-headline text-lg hover:no-underline text-left">
                            {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-base text-muted-foreground pt-2 pb-4">
                            {faq.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
          </div>
        </section>

        <section id="more-help" className="bg-white">
            <div className="container">
                <Card className="bg-primary/5 border-primary/20 text-center max-w-3xl mx-auto">
                    <CardHeader>
                        <CardTitle className="font-headline text-2xl">Still have questions?</CardTitle>
                        <CardDescription>
                            If you can't find the answer you're looking for, feel free to reach out to our support team or try our AI Assistant.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button asChild>
                            <Link href="/contact">Contact Support</Link>
                        </Button>
                        <p className="text-sm text-muted-foreground">or use our AI Assistant</p>
                    </CardContent>
                </Card>
            </div>
        </section>

      </main>
      <Footer />
      <AIAssistant />
    </div>
  );
}
