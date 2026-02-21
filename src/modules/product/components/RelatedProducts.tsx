'use client';

import ProductCard from '@/modules/product/components/ProductCard';

import { products } from '@/shared/constants/mockData';

const mockProducts = products.slice(0, 4).map((p, i) => ({
  id: `rel_${p.id}_${i}`,
  name: p.name,
  slug: p.slug,
  price: p.price,
  originalPrice: p.originalPrice,
  discount: p.discount ? `${p.discount}% OFF` : undefined,
  rating: p.rating || p.ratings?.rating || 4.5,
  reviews: p.reviews.length || p.ratings?.total || 150,
  brand: p.brand.name,
  image: p.image || '/images/products/product-6.png',
}));

export default function RelatedProducts() {
  return (
    <div className="flex w-full flex-col gap-6 text-left">
      <h2 className="text-foreground text-2xl font-bold">Related Products</h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {mockProducts.map((product) => (
          <ProductCard key={product.id} {...product} images={[product.image]} />
        ))}
      </div>
    </div>
  );
}
