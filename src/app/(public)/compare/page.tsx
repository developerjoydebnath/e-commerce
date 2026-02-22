'use client';

import { Button } from '@/shared/components/ui/button';
import { useCartStore } from '@/shared/store/cartStore';
import { useCompareStore } from '@/shared/store/compareStore';
import { ArrowLeft, ShoppingCart, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function ComparePage() {
  const [mounted, setMounted] = useState(false);
  const items = useCompareStore((state) => state.items);
  const removeItem = useCompareStore((state) => state.removeItem);
  const clearCompare = useCompareStore((state) => state.clearCompare);
  const addItemToCart = useCartStore((state) => state.addItem);
  const setCartOpen = useCartStore((state) => state.setIsOpen);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="bg-background min-h-screen p-10">Loading...</div>;
  }

  if (items.length === 0) {
    return (
      <div className="bg-background flex min-h-screen flex-col items-center justify-center p-6 text-center">
        <div className="bg-muted/50 mb-6 flex h-24 w-24 items-center justify-center rounded-full">
          <ArrowLeft className="text-muted-foreground h-10 w-10" />
        </div>
        <h1 className="mb-2 text-3xl font-bold">Comparison is Empty</h1>
        <p className="text-muted-foreground mb-8 max-w-md">
          You haven&apos;t selected any products to compare yet. Browse our catalog and click the compare icon on
          products you want to review side-by-side.
        </p>
        <Link href="/">
          <Button size="lg" className="rounded-full px-8">
            Return to Shop
          </Button>
        </Link>
      </div>
    );
  }

  // Pre-calculate grid columns strictly matching number of items for tabular precision
  const gridCols =
    items.length === 1
      ? 'grid-cols-1'
      : items.length === 2
        ? 'grid-cols-2'
        : items.length === 3
          ? 'grid-cols-3'
          : 'grid-cols-4';

  return (
    <div className="bg-background min-h-screen pt-10 pb-20 sm:pt-16">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">Product Comparison</h1>
            <p className="text-muted-foreground mt-2">
              Comparing {items.length} {items.length === 1 ? 'item' : 'items'} side-by-side
            </p>
          </div>
          <Button variant="outline" className="text-red-500 hover:bg-red-50 hover:text-red-600" onClick={clearCompare}>
            <Trash2 className="mr-2 h-4 w-4" />
            Clear All
          </Button>
        </div>

        {/* Mobile Warning - Horizontal Scroll Needed */}
        <div className="mb-4 flex items-center gap-2 rounded-lg bg-blue-50 p-3 text-sm text-blue-600 lg:hidden">
          <span>Swipe horizontally to view all mapped products.</span>
        </div>

        {/* Comparison Table/Grid Container */}
        <div className="w-full overflow-x-auto pb-6">
          <div className="bg-card min-w-[800px] overflow-hidden rounded-2xl border shadow-sm lg:min-w-full">
            {/* Headers / Images Grid */}
            <div className={`grid ${gridCols} bg-muted/10 divide-x border-b`}>
              {items.map((item) => (
                <div key={item.id} className="group relative flex flex-col items-center p-6">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground absolute top-4 right-4 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-red-50 hover:text-red-500"
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>

                  <Link
                    href={`/products/${item.slug || item.id}`}
                    className="mb-4 block aspect-square w-full max-w-[200px] overflow-hidden rounded-xl border bg-white"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={200}
                      height={200}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </Link>

                  <Link
                    href={`/products/${item.slug || item.id}`}
                    className="hover:text-primary text-center transition-colors"
                  >
                    <h3 className="line-clamp-2 text-lg leading-tight font-bold">{item.name}</h3>
                  </Link>

                  <div className="text-primary mt-3 text-2xl font-extrabold">৳{item.price.toLocaleString()}</div>

                  <Button
                    className="mt-6 w-full rounded-full"
                    onClick={() => {
                      addItemToCart({ ...item, quantity: 1, selected: true });
                      setCartOpen(true);
                    }}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
                  </Button>
                </div>
              ))}
            </div>

            {/* Spec: Brand */}
            <div className={`grid ${gridCols} divide-x border-b`}>
              {items.map((item) => (
                <div key={item.id} className="flex flex-col items-center justify-center p-4 text-center">
                  <span className="text-muted-foreground mb-1 text-xs font-semibold uppercase">Brand</span>
                  <span className="font-medium">{item.brand || 'Generic'}</span>
                </div>
              ))}
            </div>

            {/* Spec: Ratings */}
            <div className={`grid ${gridCols} divide-x border-b`}>
              {items.map((item) => (
                <div key={item.id} className="flex flex-col items-center justify-center p-4 text-center">
                  <span className="text-muted-foreground mb-1 text-xs font-semibold uppercase">Rating</span>
                  <div className="flex items-center gap-1">
                    <span className="text-lg font-bold">{item.rating || 0}</span>
                    <span className="text-sm text-yellow-500">★</span>
                    <span className="text-muted-foreground ml-1 text-xs">({item.reviews || 0})</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Spec: Availability/Category */}
            <div className={`grid ${gridCols} divide-x`}>
              {items.map((item) => (
                <div key={item.id} className="flex flex-col items-center justify-center p-4 text-center">
                  <span className="text-muted-foreground mb-1 text-xs font-semibold uppercase">Status</span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
                    In Stock
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
