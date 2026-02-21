'use client';

import ProductCard from '@/modules/product/components/ProductCard';

import { products } from '@/shared/constants/mockData';

const FEATURED_PRODUCTS = [...products, ...products].slice(0, 5).map((p, i) => ({
  ...p,
  id: `${p.id}_f${i}`,
  discount: p.discount ? `${p.discount}% OFF` : undefined,
  rating: p.rating || p.ratings?.rating || 4.5, // Fallback to satisfy ProductCard
  reviews: p.reviews.length || Math.floor(Math.random() * 500) + 50, // Fallback random if empty for visual
  brand: p.brand.name,
}));

export default function CategoryFeaturedProducts() {
  return (
    <section className="mb-12">
      <h2 className="mb-6 text-xl font-bold md:text-2xl">Featured Products</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {FEATURED_PRODUCTS.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </section>
  );
}
