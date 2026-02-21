'use client';

import ProductCard from '@/modules/product/components/ProductCard';
import Link from 'next/link';

import { products } from '@/shared/constants/mockData';

// Duplicating slightly to fill the grid if we only have 4 mock products
const newArrivals = [...products, ...products].slice(0, 4).map((p) => ({
  ...p,
  discount: p.discount ? `${p.discount}% OFF` : undefined,
  rating: p.rating || p.ratings?.rating || 4.5, // Fallback to satisfy ProductCard
  reviews: p.reviews.length || Math.floor(Math.random() * 500) + 50, // Fallback random if empty for visual
  brand: p.brand.name,
}));

export default function NewArrivals() {
  return (
    <section className="container mx-auto px-4 py-8 md:py-12">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-xl font-bold md:text-2xl">New Arrivals</h2>
        <Link href="#" className="hidden text-sm font-medium hover:underline sm:block">
          View All New Arrivals &gt;
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {newArrivals.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </section>
  );
}
