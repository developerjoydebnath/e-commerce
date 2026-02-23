'use client';

import ProductCard from '@/modules/product/components/ProductCard';

import { products } from '@/shared/constants/mockData';

const mockProducts = products.slice(0, 4);

export default function RelatedProducts() {
  return (
    <div className="flex w-full flex-col gap-6 text-left">
      <h2 className="text-foreground text-2xl font-bold">Related Products</h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {mockProducts.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}
