'use client';

import CategoryFiltersSidebar from '@/modules/category/components/CategoryFiltersSidebar';
import ProductCard from '@/modules/product/components/ProductCard';
import { products } from '@/shared/constants/mockData';
import { ChevronRight, Home, Timer } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const flashSaleProducts = products.slice(0, 10).map((p) => ({
  ...p,
  discount: p.discount ? `${p.discount}% OFF` : '30% OFF',
  rating: p.rating || p.ratings?.rating || 4.5,
  reviews: p.reviews.length || Math.floor(Math.random() * 500) + 50,
  brand: p.brand.name,
}));

export default function FlashSalePage() {
  const [timeLeft, setTimeLeft] = useState({
    hours: '04',
    minutes: '10',
    seconds: '36',
  });

  useEffect(() => {
    const timer = setInterval(() => {
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
    <div className="bg-background min-h-screen pb-16">
      {/* Hero Banner Section */}
      <div className="relative h-60 w-full overflow-hidden md:h-80">
        <Image src="/assets/promo_4.png" alt="Flash Sale Banner" fill className="object-cover opacity-80" />
        <div className="absolute inset-0 bg-linear-to-r from-black/70 to-transparent" />
        <div className="relative z-10 container flex h-full flex-col justify-center px-4">
          <h1 className="text-4xl font-black tracking-tighter text-white uppercase italic sm:text-6xl md:text-7xl">
            Flash Sale
          </h1>
          <div className="mt-4 flex items-center gap-4">
            <div className="bg-primary flex items-center gap-2 rounded-full px-4 py-2 text-white shadow-lg">
              <Timer className="h-5 w-5 animate-pulse" />
              <span className="text-sm font-bold tracking-widest uppercase">Ends In:</span>
              <span className="text-lg font-black tabular-nums">
                {timeLeft.hours}:{timeLeft.minutes}:{timeLeft.seconds}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb Navigation */}
        <div className="mb-8">
          <nav className="text-muted-foreground flex items-center text-sm font-medium">
            <Link prefetch={false} href="/" className="hover:text-foreground">
              <Home className="h-4 w-4" />
            </Link>
            <ChevronRight className="mx-2 h-4 w-4" />
            <span className="text-foreground">Flash Sale</span>
          </nav>
        </div>

        {/* Main 2-Column Layout */}
        <div className="flex flex-col gap-8 md:flex-row">
          {/* Left Sidebar: Filters */}
          <aside className="hidden w-64 shrink-0 md:block">
            <div className="sticky top-24">
              <h3 className="mb-4 text-lg font-bold tracking-wider uppercase">Filters</h3>
              <CategoryFiltersSidebar />
            </div>
          </aside>

          {/* Right Main Content: Grid */}
          <main className="flex-1">
            <div className="mb-6 flex items-center justify-between border-b pb-4">
              <div>
                <h2 className="text-xl font-bold md:text-2xl">On Sale Now</h2>
                <p className="text-muted-foreground text-sm">Showing {flashSaleProducts.length} items</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground text-sm">Sort by:</span>
                <select className="bg-background focus:ring-primary cursor-pointer rounded-md border px-3 py-1 text-sm focus:ring-1 focus:outline-none">
                  <option>Newest</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Most Discounted</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {flashSaleProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
