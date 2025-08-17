import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { AIAssistant } from '@/components/ai-assistant';
import { ContactForm } from '@/components/contact-form';
import { Badge } from '@/components/ui/badge';
import { Mail, MapPin, Phone } from 'lucide-react';

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
                <div className="max-w-3xl mx-auto">
                     <h2 className="font-headline text-3xl font-bold mb-6 text-center">Send us a Message</h2>
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
