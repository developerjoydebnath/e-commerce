'use client';

import { Button } from '@/shared/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function PromoBanner() {
  return (
    <section className="container mx-auto px-4 py-8 md:py-12">
      <div className="group bg-muted relative flex min-h-[300px] w-full items-center overflow-hidden rounded-2xl md:min-h-[400px]">
        {/* Background Image */}
        <Image
          src="/assets/promo_1.png"
          alt="Mega Sale Promotional Banner"
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-105"
          unoptimized
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/50 to-transparent" />

        {/* Content */}
        <div className="relative z-10 w-full max-w-xl px-6 py-12 text-white sm:px-12 md:px-16 lg:px-24">
          <p className="text-primary mb-3 text-sm font-bold tracking-wider uppercase">Mega Sale Alert</p>
          <h2 className="mb-4 text-3xl leading-tight font-extrabold md:text-4xl lg:text-5xl">
            Upgrade Your Tech Arsenal Today
          </h2>
          <p className="mb-8 text-lg font-medium text-white/80">
            Get up to 40% off on selected laptops, gaming peripherals, and smart devices. Limited time offer!
          </p>
          <Button asChild size="lg" className="h-12 rounded-full px-8 text-base font-semibold">
            <Link prefetch={false} href="#">Shop the Sale</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
