
import { HeartPulse, Mail, MapPin, Phone, Facebook, Twitter, Linkedin } from 'lucide-react';
import Link from 'next/link';
import { Input } from './ui/input';
import { Button } from './ui/button';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-white border-t text-foreground">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About HCOM */}
          <div className="space-y-4">
             <Link href="/" className="flex items-center gap-2">
              <HeartPulse className="h-7 w-7 text-primary" />
              <span className="font-bold text-xl font-headline">HCOM</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Transforming access to quality healthcare in Nigeria through innovation, inclusivity, and digital connectivity.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary"><Facebook className="h-5 w-5" /></a>
              <a href="#" className="text-muted-foreground hover:text-primary"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="text-muted-foreground hover:text-primary"><Linkedin className="h-5 w-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-headline font-semibold text-lg">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About</Link></li>
              <li><Link href="/services" className="text-sm text-muted-foreground hover:text-primary transition-colors">Services</Link></li>
              <li><Link href="/product" className="text-sm text-muted-foreground hover:text-primary transition-colors">Product</Link></li>
               <li><Link href="/outreach" className="text-sm text-muted-foreground hover:text-primary transition-colors">Outreach</Link></li>
               <li><Link href="/career" className="text-sm text-muted-foreground hover:text-primary transition-colors">Career</Link></li>
              <li><Link href="#contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-headline font-semibold text-lg">Contact Us</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Our Office 23 Rumomoi, Port Harcourt, Nigeria</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>+234-9134311576</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>info@Hci.com.ng</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="font-headline font-semibold text-lg">Newsletter</h3>
            <p className="text-sm text-muted-foreground">Be the First to get our update.</p>
            <form className="flex gap-2">
              <Input type="email" placeholder="Enter your email" className="flex-1" />
              <Button type="submit">Subscribe</Button>
            </form>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {year} HCOM. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
