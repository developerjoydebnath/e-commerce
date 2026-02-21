'use client';

import ProductCard from '@/modules/product/components/ProductCard';
import Link from 'next/link';

import { products } from '@/shared/constants/mockData';

// Duplicating to fill the 10-item grid
const trendingProducts = [...products, ...products, ...products].slice(0, 10).map((p, i) => ({
  ...p,
  id: `${p.id}_${i}`, // Ensure unique keys for duplicates
  discount: p.discount ? `${p.discount}% OFF` : undefined,
  rating: p.rating || p.ratings?.rating || 4.5, // Fallback to satisfy ProductCard
  reviews: p.reviews.length || Math.floor(Math.random() * 500) + 50, // Fallback random if empty for visual
  brand: p.brand.name,
}));

export default function HotTrendingProducts() {
  return (
    <section className="container mx-auto px-4 py-8 md:py-12">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-xl font-bold md:text-2xl">Hot Trending Products</h2>
        <Link href="#" className="hidden text-sm font-medium hover:underline sm:block">
          View All Products &gt;
        </Link>
      </div>

      <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {trendingProducts.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>

      <div className="flex justify-center">
        <Link
          href="#"
          className="bg-muted hover:bg-muted/80 text-foreground flex h-12 items-center justify-center rounded-lg px-8 font-medium transition-colors"
        >
          See All Products
        </Link>
      </div>
    </section>
  );
}
