'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/shared/components/ui/accordion';
import { Badge } from '@/shared/components/ui/badge';
import { Card, CardContent } from '@/shared/components/ui/card';
import { Input } from '@/shared/components/ui/input';
import { cn } from '@/shared/lib/utils';
import { CreditCard, HelpCircle, RefreshCw, Search, ShieldCheck, ShoppingBag, Truck } from 'lucide-react';
import { useState } from 'react';

const FAQ_CATEGORIES = [
  { id: 'all', name: 'All', icon: HelpCircle },
  { id: 'orders', name: 'Orders', icon: ShoppingBag },
  { id: 'delivery', name: 'Delivery', icon: Truck },
  { id: 'payment', name: 'Payment', icon: CreditCard },
  { id: 'returns', name: 'Returns', icon: RefreshCw },
  { id: 'account', name: 'Account', icon: ShieldCheck },
];

const FAQS = [
  {
    category: 'orders',
    question: 'How do I track my order?',
    answer:
      'You can track your order by clicking the "Order Tracking" link in the top bar or footer. You will need your order ID and billing email.',
  },
  {
    category: 'delivery',
    question: 'What are the delivery charges?',
    answer:
      'Standard delivery is free for all orders above $50. For orders below $50, a standard shipping fee of $5.99 applies.',
  },
  {
    category: 'payment',
    question: 'What payment methods do you accept?',
    answer:
      'We accept all major credit/debit cards (Visa, Mastercard, American Express), PayPal, and Apple/Google Pay.',
  },
  {
    category: 'returns',
    question: 'How do I return an item?',
    answer:
      'You can initiate a return within 30 days of receiving your order through the Returns Portal in your account dashboard.',
  },
  {
    category: 'orders',
    question: 'Can I cancel my order?',
    answer:
      'Orders can be cancelled within 1 hour of placement. After that, we begin processing and shipping, making cancellation difficult.',
  },
  {
    category: 'delivery',
    question: 'Do you ship internationally?',
    answer:
      'Yes, we currently ship to over 50 countries worldwide. International shipping rates and times vary by location.',
  },
  {
    category: 'account',
    question: 'How do I reset my password?',
    answer:
      'Click the "Forgot Password" link on the login page, enter your email address, and follow the instructions sent to your inbox.',
  },
];

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredFaqs = FAQS.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      {/* Header Section */}
      <div className="mb-16 text-center">
        <Badge variant="outline" className="border-primary/20 bg-primary/5 text-primary mb-4 px-4 py-1 font-bold">
          SUPPORT CENTER
        </Badge>
        <h1 className="mb-4 text-4xl font-black tracking-tight text-zinc-900 md:text-5xl lg:text-6xl">
          Frequently Asked <span className="text-primary">Questions</span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-zinc-500">
          Have a question? We&apos;re here to help. Search our FAQs or select a category below to find the answers you
          need.
        </p>

        {/* Search Bar */}
        <div className="relative mx-auto mt-10 max-w-xl">
          <Input
            type="text"
            placeholder="Search for answers..."
            className="focus:ring-primary focus:border-primary h-14 rounded-2xl border-zinc-200 bg-white pr-4 pl-12 text-base shadow-xl shadow-zinc-200/50 transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-zinc-400" />
        </div>
      </div>

      <div className="flex flex-col gap-12 lg:flex-row">
        {/* Categories Sidebar */}
        <div className="w-full lg:w-1/4">
          <div className="sticky top-24 flex flex-col gap-2">
            <h3 className="mb-4 text-sm font-black tracking-widest text-zinc-400 uppercase">Categories</h3>
            {FAQ_CATEGORIES.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  'flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition-all',
                  activeCategory === category.id
                    ? 'bg-primary shadow-primary/25 text-white shadow-lg'
                    : 'text-zinc-500 hover:bg-zinc-100'
                )}
              >
                <category.icon className="h-5 w-5" />
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="w-full lg:w-3/4">
          {filteredFaqs.length > 0 ? (
            <Accordion type="single" collapsible className="flex flex-col gap-4">
              {filteredFaqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="overflow-hidden rounded-2xl border border-zinc-200 bg-white transition-all data-[state=open]:shadow-xl data-[state=open]:shadow-zinc-200/50"
                >
                  <AccordionTrigger className="hover:text-primary px-6 py-5 text-left text-lg font-bold transition-colors hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6 text-base leading-relaxed text-zinc-500">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <Card className="border-dashed py-20 text-center">
              <CardContent>
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-zinc-100">
                  <Search className="h-8 w-8 text-zinc-400" />
                </div>
                <h3 className="text-xl font-bold text-zinc-900">No results found</h3>
                <p className="mt-2 text-zinc-500">Try adjusting your search query or selecting a different category.</p>
              </CardContent>
            </Card>
          )}

          {/* Contact Support CTA */}
          <div className="mt-16 overflow-hidden rounded-3xl bg-zinc-900 p-8 md:p-12">
            <div className="relative z-10 flex flex-col items-center justify-between gap-8 md:flex-row">
              <div className="text-center md:text-left">
                <h2 className="text-3xl font-black text-white">Still have questions?</h2>
                <p className="mt-2 text-zinc-400">
                  Can&apos;t find the answer you&apos;re looking for? Please chat to our friendly team.
                </p>
              </div>
              <button className="bg-primary shadow-primary/20 h-14 rounded-2xl px-10 text-sm font-black tracking-widest text-white uppercase shadow-xl transition-all hover:scale-105 active:scale-95">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
