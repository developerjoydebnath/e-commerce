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
    <footer className="bg-[#0f1115] pt-16 text-zinc-300">
      <div className="container mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          {/* Column 1: About */}
          <div className="flex flex-col gap-6">
            <h3 className="text-lg font-bold tracking-wider text-white uppercase">About</h3>
            <p className="text-sm leading-relaxed text-zinc-400">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
              industry&apos;s standard dummy text ever since the 1500s
            </p>

            <div className="flex flex-col gap-4">
              {/* Payment Methods */}
              <div className="flex gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-8 w-12 rounded border border-zinc-700/50 bg-zinc-800/50 object-cover" />
                ))}
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-zinc-400">
                <Lock className="h-4 w-4" />
                Secure Online Payment
              </div>

              {/* App Stores */}
              <div className="flex gap-4 pt-2">
                <div className="h-10 w-32 rounded border border-zinc-700/50 bg-zinc-800/50 object-cover" />
                <div className="h-10 w-32 rounded border border-zinc-700/50 bg-zinc-800/50 object-cover" />
              </div>
            </div>
          </div>

          {/* Column 2: Informations */}
          <div className="flex flex-col gap-6">
            <h3 className="text-lg font-bold tracking-wider text-white uppercase">Informations</h3>
            <ul className="flex flex-col gap-3 text-sm">
              {[
                { name: 'About Us', href: '#' },
                { name: 'Contact Us', href: '/support' },
                { name: 'Order Tracking', href: '/order-tracking' },
                { name: 'Terms & Conditions', href: '#' },
                { name: 'Returns & Refunds Policy', href: '#' },
                { name: 'Shipping & Delivery', href: '#' },
                { name: 'Privacy Policy', href: '#' },
                { name: 'FAQ', href: '/faqs' },
                { name: 'Blogs', href: '#' },
              ].map((item, index) => (
                <li key={index}>
                  <Link
                    prefetch={false}
                    href={item.href}
                    className="hover:text-primary text-zinc-400 transition-colors hover:underline"
                  >
                    <span className="mr-2 text-zinc-600">•</span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Categories */}
          <div className="flex flex-col gap-6">
            <h3 className="text-lg font-bold tracking-wider text-white uppercase">Categories</h3>
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
                  <Link
                    prefetch={false}
                    href="#"
                    className="hover:text-primary text-zinc-400 transition-colors hover:underline"
                  >
                    <span className="mr-2 text-zinc-600">•</span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contacts & Newsletter */}
          <div className="flex flex-col gap-6">
            <h3 className="text-lg font-bold tracking-wider text-white uppercase">Contacts</h3>
            <ul className="flex flex-col gap-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="text-primary mt-0.5 h-5 w-5 shrink-0" />
                <span className="text-zinc-400">
                  102/C Green Road, Dhanmondi,
                  <br />
                  Dhaka-1212
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-primary h-4 w-4 shrink-0" />
                <span className="text-zinc-400">contact@gmail.com</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-primary h-4 w-4 shrink-0" />
                <span className="text-zinc-400">+8801700000000</span>
              </li>
            </ul>

            {/* Social Icons */}
            <div className="flex gap-2 pt-2">
              {[
                { icon: Facebook, label: 'Facebook' },
                { icon: Instagram, label: 'Instagram' },
                { icon: Twitter, label: 'Twitter' },
                { icon: Youtube, label: 'Youtube' },
                { icon: MessageCircle, label: 'WhatsApp' },
                { icon: Linkedin, label: 'Linkedin' },
              ].map((social, idx) => (
                <Link
                  key={idx}
                  prefetch={false}
                  href="#"
                  aria-label={social.label}
                  className="hover:bg-primary hover:border-primary flex h-9 w-9 items-center justify-center rounded-full border border-zinc-700/50 bg-zinc-800/50 transition-all hover:-translate-y-1 hover:text-white"
                >
                  <social.icon className="h-4 w-4" />
                </Link>
              ))}
            </div>

            {/* Newsletter */}
            <div className="mt-2 flex w-full max-w-sm items-center space-x-2">
              <div className="relative flex-1">
                <Input
                  type="email"
                  placeholder="Type Your Email"
                  className="focus-visible:ring-primary focus-visible:border-primary h-11 rounded-full border-zinc-700/50 bg-zinc-800/20 pr-28 text-white placeholder:text-zinc-500"
                />
                <Button
                  type="submit"
                  size="sm"
                  className="bg-primary hover:bg-primary/90 absolute top-1 right-1 h-9 rounded-full px-6 font-medium text-white"
                >
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-zinc-800/50 bg-black/30 py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-zinc-500">
            Copyright &copy; 2024 All rights reserved by{' '}
            <span className="text-primary cursor-pointer hover:underline">Codenixx.com</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
