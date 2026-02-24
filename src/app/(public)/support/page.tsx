'use client';

import { Button } from '@/shared/components/ui/button';
import { Card, CardContent } from '@/shared/components/ui/card';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { Textarea } from '@/shared/components/ui/textarea';
import { cn } from '@/shared/lib/utils';
import {
  Clock,
  FileText,
  HelpCircle,
  LifeBuoy,
  Mail,
  MapPin,
  MessageCircle,
  MessageSquare,
  Phone,
  Send,
} from 'lucide-react';

const CONTACT_METHODS = [
  {
    icon: Mail,
    title: 'Email Us',
    description: 'Our team can help you via email.',
    contact: 'support@cartzilla.com',
    action: 'mailto:support@cartzilla.com',
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp',
    description: 'Chat with us on WhatsApp.',
    contact: '+880 1700 000000',
    action: 'https://wa.me/8801700000000',
    color: 'text-green-500',
    bgColor: 'bg-green-50',
  },
  {
    icon: Phone,
    title: 'Call Us',
    description: 'Mon-Fri from 8am to 5pm.',
    contact: '+880 1700 111111',
    action: 'tel:+8801700111111',
    color: 'text-orange-500',
    bgColor: 'bg-orange-50',
  },
];

const HELP_TOPICS = [
  { icon: FileText, title: 'Guide & Tutorials' },
  { icon: LifeBuoy, title: 'Technical Support' },
  { icon: HelpCircle, title: 'Order Status' },
  { icon: MessageSquare, title: 'Feedback' },
];

export default function SupportPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      {/* Header section */}
      <div className="mb-16 text-center">
        <h1 className="mb-4 text-4xl font-black tracking-tight text-zinc-900 md:text-5xl lg:text-6xl">
          How can we <span className="text-primary">help you?</span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-zinc-500">
          We&apos;re here to assist you with any questions or issues you may have. Reach out through any of the channels
          below or send us a message directly.
        </p>
      </div>

      {/* Help Topics Grid */}
      <div className="mb-20 grid grid-cols-2 gap-4 md:grid-cols-4 lg:gap-8">
        {HELP_TOPICS.map((topic, index) => (
          <button
            key={index}
            className="group hover:border-primary/20 flex flex-col items-center gap-4 rounded-3xl border border-zinc-200 bg-white p-6 transition-all hover:shadow-xl hover:shadow-zinc-200/50"
          >
            <div className="group-hover:bg-primary/10 group-hover:text-primary flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-50 text-zinc-400 transition-colors">
              <topic.icon className="h-7 w-7" />
            </div>
            <span className="text-sm font-black tracking-wider text-zinc-600 uppercase transition-colors group-hover:text-zinc-900">
              {topic.title}
            </span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
        {/* Contact Information */}
        <div className="flex flex-col gap-10">
          <div>
            <h2 className="text-3xl font-black tracking-tight text-zinc-900">Contact Us</h2>
            <p className="mt-4 text-zinc-500">
              Choose your preferred way to get in touch. Our dedicated support team is ready to provide you with the
              best experience.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {CONTACT_METHODS.map((method, index) => (
              <a
                key={index}
                href={method.action}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-6 rounded-3xl border border-zinc-100 bg-zinc-50/50 p-6 transition-all hover:bg-white hover:shadow-lg hover:shadow-zinc-200/30"
              >
                <div
                  className={cn(
                    'flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl',
                    method.bgColor,
                    method.color
                  )}
                >
                  <method.icon className="h-7 w-7" />
                </div>
                <div>
                  <h4 className="text-sm font-black tracking-widest text-zinc-400 uppercase">{method.title}</h4>
                  <p className="mt-1 font-bold text-zinc-900">{method.contact}</p>
                  <p className="text-xs text-zinc-500">{method.description}</p>
                </div>
              </a>
            ))}
          </div>

          <div className="rounded-3xl bg-zinc-900 p-8 text-white">
            <h3 className="mb-6 flex items-center gap-2 text-xl font-bold">
              <Clock className="text-primary h-5 w-5" />
              Support Hours
            </h3>
            <div className="space-y-3 text-sm text-zinc-400">
              <div className="flex justify-between border-b border-zinc-800 pb-2">
                <span>Monday - Friday</span>
                <span className="font-medium text-white">8:00 AM - 5:00 PM</span>
              </div>
              <div className="flex justify-between border-b border-zinc-800 pb-2">
                <span>Saturday</span>
                <span className="font-medium text-white">9:00 AM - 2:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday</span>
                <span className="text-primary font-bold">Closed</span>
              </div>
            </div>
            <div className="mt-8 flex items-start gap-4">
              <div className="bg-primary/20 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
                <MapPin className="text-primary h-5 w-5" />
              </div>
              <div>
                <h4 className="font-bold text-white">Store Location</h4>
                <p className="mt-1 text-sm leading-relaxed text-zinc-400">
                  102/C Green Road, Dhanmondi,
                  <br />
                  Dhaka-1212, Bangladesh
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <Card className="overflow-hidden rounded-3xl border-zinc-200 bg-white p-2 shadow-2xl shadow-zinc-200/50 lg:p-4">
          <CardContent className="p-8">
            <h2 className="text-3xl font-black tracking-tight text-zinc-900">Send a message</h2>
            <p className="mt-2 mb-8 text-zinc-500">
              Got a specific inquiry? Fill out the form below and we&apos;ll get back to you as soon as possible.
            </p>

            <form className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First Name</Label>
                  <Input id="first-name" placeholder="John" className="focus:ring-primary h-12 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input id="last-name" placeholder="Doe" className="focus:ring-primary h-12 rounded-xl" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  className="focus:ring-primary h-12 rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="How can we help?" className="focus:ring-primary h-12 rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Describe your issue in detail..."
                  className="focus:ring-primary min-h-[150px] rounded-xl"
                />
              </div>
              <Button className="bg-primary shadow-primary/20 h-14 w-full rounded-2xl text-sm font-black tracking-widest text-white uppercase shadow-xl transition-all hover:scale-105 active:scale-95">
                <Send className="mr-2 h-4 w-4" />
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
