'use client';

import CategoryFiltersSidebar from '@/modules/category/components/CategoryFiltersSidebar';
import ProductCard from '@/modules/product/components/ProductCard';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/shared/components/ui/sheet';
import { ChevronLeft, ChevronRight, LayoutGrid, List, SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';

import { products } from '@/shared/constants/mockData';

// Generates multiple products from the base mock data array
const ALL_PRODUCTS = Array.from({ length: 45 }).map((_, i) => {
  const p = products[i % products.length];
  return {
    ...p,
    id: `${p.id}_grid_${i}`,
    discount: p.discount ? `${p.discount}% OFF` : undefined,
    rating: p.rating || p.ratings?.rating || 4.5,
    reviews: p.reviews.length || Math.floor(Math.random() * 500) + 50,
    brand: p.brand.name,
  };
});

export default function CategoryProductGrid() {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 12;
  const pageCount = Math.ceil(ALL_PRODUCTS.length / itemsPerPage);

  const offset = currentPage * itemsPerPage;
  const currentItems = ALL_PRODUCTS.slice(offset, offset + itemsPerPage);

  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex-1">
      {/* Top Bar */}
      <div className="bg-muted scrollbar-hide mb-6 flex flex-row items-center justify-between gap-2 overflow-x-auto rounded-lg px-3 py-2 sm:px-4 sm:py-3">
        <div className="flex items-center gap-2">
          {/* Mobile Filter Sheet */}
          <Sheet>
            <SheetTrigger asChild>
              <button className="border-input text-foreground flex h-9 w-9 shrink-0 items-center justify-center rounded-md border bg-white shadow-sm md:hidden">
                <SlidersHorizontal className="h-4 w-4" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="flex w-[300px] flex-col p-0 sm:w-[350px]">
              <div className="border-b p-4">
                <SheetTitle>Filters</SheetTitle>
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                <CategoryFiltersSidebar className="md:w-full" />
              </div>
            </SheetContent>
          </Sheet>

          <div className="text-muted-foreground flex shrink-0 items-center gap-2 text-sm">
            <span className="hidden shrink-0 sm:inline-block">Sort By:</span>
            <Select defaultValue="name-asc">
              <SelectTrigger className="text-foreground border-input h-9 w-[120px] bg-white shadow-sm sm:w-[180px]">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="name-asc">Name (A - Z)</SelectItem>
                <SelectItem value="name-desc">Name (Z - A)</SelectItem>
                <SelectItem value="price-asc">Price (Low to High)</SelectItem>
                <SelectItem value="price-desc">Price (High to Low)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="text-muted-foreground flex shrink-0 items-center gap-2 text-sm sm:gap-4">
          <div className="flex items-center gap-2">
            <span className="hidden shrink-0 sm:inline-block">Items:</span>
            <Select defaultValue="12">
              <SelectTrigger className="text-foreground border-input h-9 w-[65px] bg-white px-2 text-center shadow-sm sm:w-[70px]">
                <SelectValue placeholder="Items" />
              </SelectTrigger>
              <SelectContent position="popper" className="min-w-[70px]">
                <SelectItem value="12">12</SelectItem>
                <SelectItem value="24">24</SelectItem>
                <SelectItem value="36">36</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="hidden shrink-0 items-center gap-1 sm:flex">
            <button className="text-primary bg-primary/10 rounded p-1.5 transition-colors">
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button className="hover:text-primary hover:bg-primary/10 rounded p-1.5 transition-colors">
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {currentItems.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>

      {/* Pagination */}
      <ReactPaginate
        breakLabel="..."
        nextLabel={
          <span className="flex items-center gap-1">
            Next <ChevronRight className="h-4 w-4" />
          </span>
        }
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel={
          <span className="flex items-center gap-1">
            <ChevronLeft className="h-4 w-4" /> Prev
          </span>
        }
        renderOnZeroPageCount={null}
        containerClassName="flex flex-wrap items-center justify-end gap-2 text-sm font-medium"
        pageLinkClassName="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-md bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
        activeLinkClassName="bg-primary text-primary-foreground shadow-sm"
        previousLinkClassName="flex h-7 px-2 sm:h-8 sm:px-3 items-center justify-center rounded-md bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
        nextLinkClassName="flex h-7 px-2 sm:h-8 sm:px-3 items-center justify-center rounded-md bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
        disabledLinkClassName="opacity-50 cursor-not-allowed hover:bg-muted hover:text-muted-foreground"
      />
    </div>
  );
}
