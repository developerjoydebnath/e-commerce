'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/shared/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import * as React from 'react';

// Placeholder data - will be replaced with actual image paths
const heroSlides = [
  {
    id: 1,
    image: '/assets/hero_slide_1.png', // specific path will be updated after I see the file names
    alt: 'Electronics Sale',
  },
  {
    id: 2,
    image: '/assets/hero_slide_3.png',
    alt: 'Fashion Sale',
  },
];

const promoImages = [
  {
    id: 1,
    image: '/assets/promo_1.png',
    alt: 'Headphones',
  },
  {
    id: 2,
    image: '/assets/promo_2.png',
    alt: 'Smart Watch',
  },
  {
    id: 3,
    image: '/assets/promo_3.png',
    alt: 'Camera',
  },
  {
    id: 4,
    image: '/assets/promo_4.png',
    alt: 'Game Console',
  },
];

export default function HeroSection() {
  const plugin = React.useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));

  return (
    <section className="container mx-auto px-4 py-4 md:py-8">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-8">
        {/* Main Carousel - Spans full width on mobile, 8 cols on desktop */}
        <div className="col-span-1 lg:col-span-8">
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            plugins={[plugin.current]}
            className="h-full w-full"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent>
              {heroSlides.map((slide) => (
                <CarouselItem key={slide.id}>
                  <div className="relative aspect-16/6 w-full overflow-hidden rounded-xl md:aspect-16/7 lg:aspect-16/8">
                    <Image src={slide.image} alt={slide.alt} fill className="object-cover" priority={slide.id === 1} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        </div>

        {/* Promo Grid - Spans full width on mobile (2x2), 4 cols on desktop (2x2 or 1x4 stacked vertical? User said "other 4 will show static image") 
            Usually sidebar promos are 2x1 or 4x1. 
            Let's do a 2x2 grid on mobile and a 2x2 grid or stack on desktop.
            If desktop is col-span-4, we can fit 2x2 nicely or 4 stacked. 
            Let's try 2 cols on mobile, 1 col on desktop (stacked)? No, 2x2 is better for aspect ratio.
        */}
        <div className="col-span-1 grid grid-cols-4 gap-4 lg:col-span-4 lg:grid-cols-2">
          {promoImages.map((promo) => (
            <div
              key={promo.id}
              className="bg-muted relative aspect-square w-full overflow-hidden rounded-md sm:rounded-lg lg:rounded-xl"
            >
              <Image
                src={promo.image}
                alt={promo.alt}
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
