'use client';

import ProductCard from '@/modules/product/components/ProductCard';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import { products } from '@/shared/constants/mockData';

const flashSaleProducts = products.slice(0, 5).map((p) => ({
  ...p,
  discount: p.discount ? `${p.discount}% OFF` : undefined,
  rating: p.rating || p.ratings?.rating || 4.5, // Fallback to satisfy ProductCard
  reviews: p.reviews.length || Math.floor(Math.random() * 500) + 50, // Fallback random if empty for visual
  brand: p.brand.name,
}));

export default function FlashSale() {
  const [timeLeft, setTimeLeft] = useState({
    hours: '04',
    minutes: '22',
    seconds: '56',
  });

  useEffect(() => {
    const timer = setInterval(() => {
      // Simple logic to decrement seconds for demo
      setTimeLeft((prev) => {
        let s = parseInt(prev.seconds) - 1;
        let m = parseInt(prev.minutes);
        let h = parseInt(prev.hours);

        if (s < 0) {
          s = 59;
          m -= 1;
        }
        if (m < 0) {
          m = 59;
          h -= 1;
        }
        if (h < 0) h = 0;

        return {
          hours: h.toString().padStart(2, '0'),
          minutes: m.toString().padStart(2, '0'),
          seconds: s.toString().padStart(2, '0'),
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="container mx-auto px-4 py-8 md:py-12">
      {/* Banner Section */}
      <div className="relative mb-10 overflow-hidden rounded-2xl bg-black">
        {/* Background Image Placeholder or Real Asset */}
        <div className="absolute inset-0">
          <Image
            src="/assets/promo_4.png"
            alt="Flash Sale Background"
            fill
            className="object-cover opacity-60 transition-transform duration-1000 hover:scale-105"
          />
          {/* Overlay for better text legibility */}
          <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/40 to-transparent" />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center px-6 py-16 text-center md:py-20">
          <h2 className="text-primary mb-4 text-3xl font-black tracking-tighter uppercase italic sm:text-5xl md:text-6xl">
            Flash Sale
          </h2>

          <div className="flex flex-col items-center gap-6">
            <p className="text-lg font-medium tracking-widest text-white/90 uppercase sm:text-xl">Limited Time Offer</p>

            <div className="flex items-center gap-3 sm:gap-4">
              <span className="text-sm font-bold tracking-wider text-white/60 uppercase">Ends In</span>
              <div className="flex gap-2 sm:gap-3">
                {[timeLeft.hours, timeLeft.minutes, timeLeft.seconds].map((unit, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="bg-primary/95 flex h-12 w-12 items-center justify-center rounded-lg shadow-lg sm:h-16 sm:w-16">
                      <span className="text-primary-foreground text-2xl font-black tabular-nums sm:text-4xl">
                        {unit}
                      </span>
                    </div>
                    {i < 2 && <span className="text-primary text-2xl font-black sm:text-4xl">:</span>}
                  </div>
                ))}
              </div>
            </div>

            <button className="bg-primary text-primary-foreground hover:bg-primary/90 mt-4 rounded-full px-10 py-4 text-sm font-black tracking-widest uppercase shadow-xl transition-all hover:scale-105 active:scale-95">
              Shop Now
            </button>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6 lg:grid-cols-4 xl:grid-cols-5">
        {flashSaleProducts.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </section>
  );
}
