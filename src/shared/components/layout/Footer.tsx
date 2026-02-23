import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import {
  Facebook,
  Instagram,
  Linkedin,
  Lock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Twitter,
  Youtube,
} from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-primary pt-16 text-white">
      <div className="container mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          {/* Column 1: About */}
          <div className="flex flex-col gap-6">
            <h3 className="text-lg font-bold tracking-wider uppercase">About</h3>
            <p className="text-sm leading-relaxed text-white/90">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
              industry&apos;s standard dummy text ever since the 1500s
            </p>

            <div className="flex flex-col gap-4">
              {/* Payment Methods */}
              <div className="flex gap-2">
                {/* Placeholders for payment methods (e.g., bkash, ssl commerz, visa, nagad) */}
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-8 w-12 rounded bg-white/20 object-cover" />
                ))}
              </div>
              <div className="flex items-center gap-2 text-sm font-medium">
                <Lock className="h-4 w-4" />
                Secure Online Payment
              </div>

              {/* App Stores */}
              <div className="flex gap-4 pt-2">
                {/* Placeholders for Google Play and App Store */}
                <div className="h-10 w-32 rounded bg-white/20 object-cover" />
                <div className="h-10 w-32 rounded bg-white/20 object-cover" />
              </div>
            </div>
          </div>

          {/* Column 2: Informations */}
          <div className="flex flex-col gap-6">
            <h3 className="text-lg font-bold tracking-wider uppercase">Informations</h3>
            <ul className="flex flex-col gap-3 text-sm">
              {[
                'About Us',
                'Contact Us',
                'Terms & Conditions',
                'Returns & Refunds Policy',
                'Shipping & Delivery',
                'Privet Policy',
                'FAQ',
                'Blogs',
                'About Us',
              ].map((item, index) => (
                <li key={index}>
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-colors hover:underline">
                    <span className="mr-2">•</span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Categories */}
          <div className="flex flex-col gap-6">
            <h3 className="text-lg font-bold tracking-wider uppercase">Categories</h3>
            <ul className="flex flex-col gap-3 text-sm">
              {[
                'About Us',
                'Contact Us',
                'Terms & Conditions',
                'Returns & Refunds Policy',
                'Shipping & Delivery',
                'Privet Policy',
                'FAQ',
                'Blogs',
                'About Us',
              ].map((item, index) => (
                <li key={index}>
                  <Link href="#" className="text-white/90 transition-colors hover:text-white hover:underline">
                    <span className="mr-2">•</span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contacts & Newsletter */}
          <div className="flex flex-col gap-6">
            <h3 className="text-lg font-bold tracking-wider uppercase">Contacts</h3>
            <ul className="flex flex-col gap-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0" />
                <span className="text-white/90">
                  102/C Green Road, Dhanmondi,
                  <br />
                  Dhaka-1212
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0" />
                <span className="text-white/90">contact@gmail.com</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0" />
                <span className="text-white/90">+8801700000000</span>
              </li>
            </ul>

            {/* Social Icons */}
            <div className="flex gap-2 pt-2">
              <Link
                href="#"
                aria-label="Facebook"
                className="flex h-8 w-8 items-center justify-center rounded bg-white/10 transition-colors hover:bg-white/20"
              >
                <Facebook className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                aria-label="Instagram"
                className="flex h-8 w-8 items-center justify-center rounded bg-white/10 transition-colors hover:bg-white/20"
              >
                <Instagram className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                aria-label="Twitter"
                className="flex h-8 w-8 items-center justify-center rounded bg-white/10 transition-colors hover:bg-white/20"
              >
                <Twitter className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                aria-label="Youtube"
                className="flex h-8 w-8 items-center justify-center rounded bg-white/10 transition-colors hover:bg-white/20"
              >
                <Youtube className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                aria-label="WhatsApp"
                className="flex h-8 w-8 items-center justify-center rounded bg-white/10 transition-colors hover:bg-white/20"
              >
                <MessageCircle className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                aria-label="Linkedin"
                className="flex h-8 w-8 items-center justify-center rounded bg-white/10 transition-colors hover:bg-white/20"
              >
                <Linkedin className="h-4 w-4" />
              </Link>
            </div>

            {/* Newsletter */}
            <div className="mt-2 flex w-full max-w-sm items-center space-x-2">
              <div className="relative flex-1">
                <Input
                  type="email"
                  placeholder="Type Your Email"
                  className="h-10 rounded-full border-white/20 bg-transparent pr-24 text-white placeholder:text-white/50 focus-visible:ring-white"
                />
                <Button
                  type="submit"
                  className="absolute top-0 right-0 h-10 rounded-full border border-l-0 border-white/20 bg-white/15 px-6 font-medium text-white hover:bg-white/25 hover:text-white"
                  variant="ghost"
                >
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-white/10 bg-black/10 py-4">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-white/90">Copyright @ 2024 All rights reserves by Codenixx.com</p>
        </div>
      </div>
    </footer>
  );
}
