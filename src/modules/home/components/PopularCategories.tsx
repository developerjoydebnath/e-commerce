'use client';

import Image from 'next/image';
import Link from 'next/link';

import CategoryCard, { CategoryCardProps } from '@/modules/category/components/CategoryCard';
import { categories as mockCategories } from '@/shared/constants/mockData';

const defaultCategories = mockCategories.slice(0, 6).map((c) => ({
  id: c.id,
  name: c.name,
  count: c.productCount || 100,
  href: `/categories/${c.slug}`,
  image: c.image || '/assets/promo_2.png',
}));

export interface PopularCategoriesProps {
  title?: string;
  data?: CategoryCardProps[];
  hideHeader?: boolean;
  className?: string;
}

export default function PopularCategories({
  title = 'Popular Categories',
  data = defaultCategories,
  hideHeader = false,
  className = 'container mx-auto px-4 py-8 md:py-12',
}: PopularCategoriesProps = {}) {
  return (
    <section className={className}>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold md:text-2xl">{title}</h2>
        {!hideHeader && (
          <Link prefetch={false} href="/categories" className="text-sm font-medium">
            View All Categories &gt;
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-12 lg:gap-6">
        {/* Main large category box */}
        <div className="group bg-muted relative col-span-1 flex min-h-[300px] flex-col overflow-hidden rounded-xl md:col-span-2 lg:col-span-5">
          <Image
            src="/assets/promo_1.png"
            alt={`${title} Background`}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            unoptimized
          />
          <div className="absolute inset-0 bg-black/40 transition-colors duration-300 group-hover:bg-black/50" />
          <div className="relative z-10 flex h-full items-center justify-center p-8 text-center text-white">
            <h3 className="text-3xl font-bold tracking-tight md:text-4xl">{title}</h3>
          </div>
        </div>

        {/* Small category grid */}
        <div className="col-span-1 grid grid-cols-1 gap-4 sm:grid-cols-2 md:col-span-2 lg:col-span-7 xl:grid-cols-3">
          {data.map((category) => (
            <CategoryCard key={category.id} {...category} />
          ))}
        </div>
      </div>
    </section>
  );
}
