'use client';

import CategoryCard from '@/modules/category/components/CategoryCard';
import CategoryHeroCarousel from '@/modules/category/components/CategoryHeroCarousel';
import PopularCategories from '@/modules/home/components/PopularCategories';
import AppPagination from '@/shared/components/ui/app-pagination';
import { categories as mockCategories } from '@/shared/constants/mockData';
import { ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function CategoriesPage() {
  const [currentPage, setCurrentPage] = useState(0);

  // Extract top trending (first 6)
  const topCategories = mockCategories.slice(0, 6).map((c) => ({
    ...c,
    count: c.productCount || 1200, // Placeholder matching layout
  }));

  const itemsPerPage = 8;
  const pageCount = Math.ceil(mockCategories.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;

  const currentItems = mockCategories.slice(offset, offset + itemsPerPage).map((c) => ({
    ...c,
    count: c.productCount || 1200,
  }));

  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected);
  };

  return (
    <div className="bg-background min-h-screen pb-16">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb Navigation */}
        <div className="mb-8">
          <nav className="text-muted-foreground flex items-center text-sm font-medium">
            <Link prefetch={false} href="/" className="hover:text-foreground">
              <Home className="h-4 w-4" />
            </Link>
            <ChevronRight className="mx-2 h-4 w-4" />
            <span className="text-foreground">Category Name</span>
            <ChevronRight className="mx-2 h-4 w-4" />
            <span className="text-foreground">Category Name</span>
          </nav>
        </div>

        {/* Hero Carousel Banner */}
        <div className="mb-12">
          <CategoryHeroCarousel />
        </div>

        {/* Top Trending Section */}
        <PopularCategories
          title="Top Trending Categories"
          data={topCategories.map((c) => ({
            id: c.id,
            name: c.name,
            count: c.count,
            href: `/categories/${c.slug}`,
            image: c.image || '/assets/promo_1.png',
          }))}
          hideHeader={true}
          className="mb-16"
        />

        {/* All Categories Section */}
        <section>
          <h2 className="text-foreground mb-6 text-xl font-bold md:text-2xl">All Category</h2>
          <div className="mb-12 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {currentItems.map((category) => (
              <CategoryCard
                key={category.id}
                id={category.id}
                name={category.name}
                count={category.count}
                href={`/categories/${category.slug}`}
                image={category.image || '/assets/promo_2.png'}
              />
            ))}
          </div>

          {/* Pagination */}
          <AppPagination pageCount={pageCount} onPageChange={handlePageClick} />
        </section>
      </div>
    </div>
  );
}
