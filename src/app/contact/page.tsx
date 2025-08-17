
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { AIAssistant } from '@/components/ai-assistant';
import { ContactForm } from '@/components/contact-form';
import { Badge } from '@/components/ui/badge';
import { Mail, MapPin, Phone } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const contactDetails = [
    {
        icon: Mail,
        title: "Email",
        value: "info@Hci.com.ng",
        href: "mailto:info@Hci.com.ng"
    },
    {
        icon: Phone,
        title: "Phone",
        value: "+234-9134311576",
        href: "tel:+2349134311576"
    },
    {
        icon: MapPin,
        title: "Office",
        value: "Our Office 23 Rumomoi, Port Harcourt, Nigeria",
        href: "#"
    }
];

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <section id="contact-hero" className="bg-white pt-24 pb-16 sm:pt-32 sm:pb-24">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <Badge variant="secondary" className="mb-4">Connect With Us</Badge>
              <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
                Get in Touch
              </h1>
              <p className="mt-6 text-lg tracking-wide text-muted-foreground">
                We're here to answer any questions you may have. Reach out to us and we'll respond as soon as we can.
              </p>
            </div>
          </div>
        </section>

        <section id="contact-form-section" className="pb-16 sm:pb-24">
            <div className="container">
                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    <div>
                         <h2 className="font-headline text-3xl font-bold mb-6">Send us a Message</h2>
                        <ContactForm />
                    </div>
                     <div>
                        <h2 className="font-headline text-3xl font-bold mb-6">Contact Information</h2>
                        <div className="space-y-6">
                            {contactDetails.map(detail => (
                                 <a key={detail.title} href={detail.href} className="flex items-start gap-4 group">
                                     <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                        <detail.icon className="h-6 w-6" />
                                     </div>
                                     <div>
                                        <h3 className="font-headline text-lg font-semibold">{detail.title}</h3>
                                        <p className="text-muted-foreground group-hover:text-primary transition-colors">{detail.value}</p>
                                     </div>
                                 </a>
                            ))}
                        </div>
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
