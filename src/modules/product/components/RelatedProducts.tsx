'use client';

import ProductCard from '@/modules/product/components/ProductCard';

import { products } from '@/shared/constants/mockData';

const mockProducts = products.slice(0, 4);

export default function RelatedProducts() {
  return (
    <div className="flex w-full flex-col gap-6 text-left">
      <h2 className="text-foreground text-lg font-bold sm:text-2xl">Related Products</h2>

      <div className="xs:gap-4 grid grid-cols-2 gap-2 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
        {mockProducts.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}
