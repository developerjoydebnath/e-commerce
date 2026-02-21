'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/shared/components/ui/accordion';
import { Checkbox } from '@/shared/components/ui/checkbox';
import { Slider } from '@/shared/components/ui/slider';
import { Star } from 'lucide-react';

const CATEGORY_FILTERS = {
  availability: [
    { label: 'In Stock', count: 120, value: 'in-stock' },
    { label: 'Out of Stock', count: 12, value: 'out-of-stock' },
  ],
  colors: [
    { label: 'Red', count: 120, value: 'red' },
    { label: 'Green', count: 121, value: 'green' },
    { label: 'Blue', count: 120, value: 'blue' },
    { label: 'White', count: 120, value: 'white' },
    { label: 'Yellow', count: 120, value: 'yellow' },
    { label: 'Violet', count: 120, value: 'violet' },
  ],
  sizes: [
    { label: 'S', count: 120, value: 's' },
    { label: 'M', count: 120, value: 'm' },
    { label: 'L', count: 121, value: 'l' },
    { label: 'XL', count: 120, value: 'xl' },
    { label: 'XXL', count: 121, value: 'xxl' },
    { label: 'XXXL', count: 120, value: 'xxxl' },
  ],
  brands: [
    { label: 'Brand Name', count: 120, value: 'brand-1' },
    { label: 'Brand Name', count: 121, value: 'brand-2' },
    { label: 'Brand Name', count: 120, value: 'brand-3' },
    { label: 'Brand Name', count: 120, value: 'brand-4' },
    { label: 'Brand Name', count: 121, value: 'brand-5' },
    { label: 'Brand Name', count: 120, value: 'brand-6' },
  ],
  ratings: [
    { stars: 5, count: 120, value: '5' },
    { stars: 4, count: 121, value: '4' },
    { stars: 3, count: 120, value: '3' },
    { stars: 2, count: 120, value: '2' },
    { stars: 1, count: 121, value: '1' },
  ],
};

import { cn } from '@/shared/lib/utils';

export default function CategoryFiltersSidebar({ className }: { className?: string }) {
  return (
    <aside className={cn('w-full shrink-0 md:w-64', className)}>
      <Accordion
        type="multiple"
        defaultValue={['price', 'availability', 'color', 'size', 'brand', 'rating']}
        className="space-y-4"
      >
        {/* Price Filter */}
        <AccordionItem value="price" className="bg-muted/30 rounded-md border">
          <AccordionTrigger className="px-4 py-3 text-sm font-semibold uppercase hover:no-underline data-[state=open]:border-b">
            Price
          </AccordionTrigger>
          <AccordionContent className="bg-background p-4">
            <Slider defaultValue={[0, 1000]} max={2000} step={1} className="my-6" />
            <div className="flex items-center justify-between gap-4">
              <div className="border-input flex h-9 w-full items-center justify-between rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm">
                <span className="text-muted-foreground">Min</span>
                <span>$ 1</span>
              </div>
              <span className="text-muted-foreground">-</span>
              <div className="border-input flex h-9 w-full items-center justify-between rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm">
                <span className="text-muted-foreground">Max</span>
                <span>$ 1k</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Availability Filter */}
        <AccordionItem value="availability" className="bg-muted/30 rounded-md border">
          <AccordionTrigger className="px-4 py-3 text-sm font-semibold uppercase hover:no-underline data-[state=open]:border-b">
            Availability
          </AccordionTrigger>
          <AccordionContent className="bg-background p-4">
            <ul className="space-y-3">
              {CATEGORY_FILTERS.availability.map((item) => (
                <li key={item.value} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Checkbox id={`avail-${item.value}`} />
                    <label htmlFor={`avail-${item.value}`} className="cursor-pointer text-sm whitespace-nowrap">
                      {item.label}
                    </label>
                  </div>
                  <span className="bg-foreground text-background inline-flex h-5 items-center justify-center rounded-sm px-1.5 text-[10px] font-bold">
                    {item.count}
                  </span>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>

        {/* Color Filter */}
        <AccordionItem value="color" className="bg-muted/30 rounded-md border">
          <AccordionTrigger className="px-4 py-3 text-sm font-semibold uppercase hover:no-underline data-[state=open]:border-b">
            Color
          </AccordionTrigger>
          <AccordionContent className="bg-background p-4">
            <ul className="space-y-3">
              {CATEGORY_FILTERS.colors.map((item) => (
                <li key={item.value} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Checkbox id={`color-${item.value}`} />
                    <label
                      htmlFor={`color-${item.value}`}
                      className="flex cursor-pointer items-center gap-2 text-sm whitespace-nowrap"
                    >
                      <span
                        className="inline-block h-3 w-3 rounded-sm border"
                        style={{ backgroundColor: item.label.toLowerCase() }}
                      ></span>
                      {item.label}
                    </label>
                  </div>
                  <span className="bg-foreground text-background inline-flex h-5 items-center justify-center rounded-sm px-1.5 text-[10px] font-bold">
                    {item.count}
                  </span>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>

        {/* Size Filter */}
        <AccordionItem value="size" className="bg-muted/30 rounded-md border">
          <AccordionTrigger className="px-4 py-3 text-sm font-semibold uppercase hover:no-underline data-[state=open]:border-b">
            Size
          </AccordionTrigger>
          <AccordionContent className="bg-background p-4">
            <ul className="space-y-3">
              {CATEGORY_FILTERS.sizes.map((item) => (
                <li key={item.value} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Checkbox id={`size-${item.value}`} />
                    <label htmlFor={`size-${item.value}`} className="cursor-pointer text-sm whitespace-nowrap">
                      {item.label}
                    </label>
                  </div>
                  <span className="bg-foreground text-background inline-flex h-5 items-center justify-center rounded-sm px-1.5 text-[10px] font-bold">
                    {item.count}
                  </span>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>

        {/* Brand Filter */}
        <AccordionItem value="brand" className="bg-muted/30 rounded-md border">
          <AccordionTrigger className="px-4 py-3 text-sm font-semibold uppercase hover:no-underline data-[state=open]:border-b">
            Brand
          </AccordionTrigger>
          <AccordionContent className="bg-background p-4">
            <ul className="space-y-3">
              {CATEGORY_FILTERS.brands.map((item) => (
                <li key={item.value} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Checkbox id={`brand-${item.value}`} />
                    <label htmlFor={`brand-${item.value}`} className="cursor-pointer text-sm whitespace-nowrap">
                      {item.label}
                    </label>
                  </div>
                  <span className="bg-foreground text-background inline-flex h-5 items-center justify-center rounded-sm px-1.5 text-[10px] font-bold">
                    {item.count}
                  </span>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>

        {/* Rating Filter */}
        <AccordionItem value="rating" className="bg-muted/30 rounded-md border">
          <AccordionTrigger className="px-4 py-3 text-sm font-semibold uppercase hover:no-underline data-[state=open]:border-b">
            Rating
          </AccordionTrigger>
          <AccordionContent className="bg-background p-4">
            <ul className="space-y-3">
              {CATEGORY_FILTERS.ratings.map((item) => (
                <li key={item.value} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Checkbox id={`rating-${item.value}`} />
                    <label htmlFor={`rating-${item.value}`} className="flex cursor-pointer items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < item.stars ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground/30'}`}
                        />
                      ))}
                    </label>
                  </div>
                  <span className="bg-foreground text-background inline-flex h-5 items-center justify-center rounded-sm px-1.5 text-[10px] font-bold">
                    {item.count}
                  </span>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  );
}
