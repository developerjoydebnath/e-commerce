'use client';

import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/shared/components/ui/carousel';
import { cn } from '@/shared/lib/utils';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import * as React from 'react';

const AUTH_IMAGES = ['/assets/auth/auth_1.png', '/assets/auth/auth_2.png', '/assets/auth/auth_3.png'];

export function AuthCarousel() {
  const plugin = React.useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="group relative h-full w-full">
      <Carousel
        setApi={setApi}
        plugins={[plugin.current]}
        className="h-full w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        opts={{
          loop: true,
          align: 'start',
        }}
      >
        <CarouselContent className="h-full" containerClassName="h-full">
          {AUTH_IMAGES.map((src, index) => (
            <CarouselItem key={index} className="h-full">
              <div className="relative h-full w-full overflow-hidden">
                <Image
                  src={src}
                  alt={`Auth Image ${index + 1}`}
                  fill
                  className="h-full w-full object-cover"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-black/10" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Dot Navigation overlay */}
      <div className="absolute right-0 bottom-8 left-0 z-20 flex justify-center gap-2">
        {Array.from({ length: count }).map((_, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={cn(
              'h-2 rounded-full transition-all duration-300',
              current === index ? 'bg-primary w-6' : 'w-2 bg-white/60 hover:bg-white/90'
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
