'use client';

import { cn } from '@/shared/lib/utils';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

const CAROUSEL_SLIDES = [
  { id: 1, image: '/assets/promo_1.png', alt: 'Category Promo 1' },
  { id: 2, image: '/assets/promo_2.png', alt: 'Category Promo 2' },
  { id: 3, image: '/assets/promo_1.png', alt: 'Category Promo 3' },
];

export default function CategoryHeroCarousel({ className }: { className?: string }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000, stopOnInteraction: false })]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index);
    },
    [emblaApi]
  );

  return (
    <div className={cn('group relative w-full overflow-hidden rounded-xl', className)}>
      {/* Carousel Track */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y">
          {CAROUSEL_SLIDES.map((slide) => (
            <div key={slide.id} className="relative aspect-21/9 min-w-0 flex-[0_0_100%] sm:aspect-24/7">
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                className="object-cover"
                unoptimized
                priority={slide.id === 1}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Dot Navigation Overlay */}
      <div className="absolute right-0 bottom-4 left-0 flex justify-center gap-2">
        {CAROUSEL_SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={cn(
              'h-2 rounded-full transition-all duration-300',
              selectedIndex === index ? 'bg-primary w-6' : 'w-2 bg-white/60 hover:bg-white/90'
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
