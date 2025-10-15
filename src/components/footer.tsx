
import { Mail, MapPin, Phone, Facebook, Twitter, Linkedin } from 'lucide-react';
import Link from 'next/link';
import { Input } from './ui/input';
import { Button } from './ui/button';
import Image from 'next/image';
import { Separator } from './ui/separator';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-white border-t text-foreground">
      <div className="container pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
          {/* About HCOM */}
          <div className="space-y-4 lg:col-span-2 md:col-span-3">
             <Link href="/" className="flex items-center gap-2">
              <Image src="/img/HCOM logo.png" alt="HCOM Logo" width={28} height={28} />
              <span className="font-bold text-xl font-headline">HCOM</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm">
              Transforming access to quality healthcare in Nigeria through innovation, inclusivity, and digital connectivity.
            </p>
             <form className="flex gap-2 max-w-sm">
              <Input type="email" placeholder="Enter your email" className="flex-1" />
              <Button type="submit">Subscribe</Button>
            </form>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-headline font-semibold text-lg">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About</Link></li>
              <li><Link href="/services" className="text-sm text-muted-foreground hover:text-primary transition-colors">Services</Link></li>
              <li><Link href="/outreach" className="text-sm text-muted-foreground hover:text-primary transition-colors">Outreach</Link></li>
               <li><Link href="/career" className="text-sm text-muted-foreground hover:text-primary transition-colors">Career</Link></li>
            </ul>
          </div>
          
           {/* Legal */}
          <div className="space-y-4">
            <h3 className="font-headline font-semibold text-lg">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms & Conditions</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/faq" className="text-sm text-muted-foreground hover:text-primary transition-colors">FAQ</Link></li>
            </ul>
          </div>


          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-headline font-semibold text-lg">Contact Us</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
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

        </div>
        <Separator />
        <div className="mt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground">
           <p>&copy; {year} HCOM. All rights reserved.</p>
           <div className="flex space-x-4 mt-4 sm:mt-0">
              <a href="#" className="text-muted-foreground hover:text-primary"><Facebook className="h-5 w-5" /></a>
              <a href="#" className="text-muted-foreground hover:text-primary"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="text-muted-foreground hover:text-primary"><Linkedin className="h-5 w-5" /></a>
            </div>
        </div>
      </div>
    </footer>
  );
}
