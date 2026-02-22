'use client';

import AppPagination from '@/shared/components/ui/app-pagination';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/shared/components/ui/breadcrumb';
import { Button } from '@/shared/components/ui/button';
import { useCartStore } from '@/shared/store/cartStore';
import { useWishlistStore } from '@/shared/store/wishlistStore';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function WishlistPage() {
  const [mounted, setMounted] = useState(false);
  const wishlistItems = useWishlistStore((state) => state.items);
  const removeItem = useWishlistStore((state) => state.removeItem);
  const clearWishlist = useWishlistStore((state) => state.clearWishlist);

  const addToCart = useCartStore((state) => state.addItem);
  const setCartOpen = useCartStore((state) => state.setIsOpen);

  // Pagination State
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 6;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return <div className="bg-muted/20 min-h-screen animate-pulse" />;

  // Pagination Logic
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = wishlistItems.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(wishlistItems.length / itemsPerPage);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % wishlistItems.length;
    setItemOffset(newOffset);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalItems = wishlistItems.length;

  return (
    <div className="bg-background min-h-screen pt-8 pb-20 sm:pt-12">
      <div className="container mx-auto px-4 lg:max-w-[1000px] xl:max-w-[1200px]">
        <h1 className="mb-4 text-2xl font-bold tracking-tight md:text-3xl">Wishlist</h1>

        {/* Breadcrumb */}
        <Breadcrumb className="mb-8 hidden sm:flex">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Wishlist</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4 border-b pb-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-xl font-bold">Favorite Items ({totalItems})</h2>

            {totalItems > 0 && (
              <Button
                variant="secondary"
                size="sm"
                onClick={clearWishlist}
                className="text-muted-foreground w-fit gap-2 text-sm font-semibold hover:text-red-500"
              >
                <span className="bg-foreground/10 flex h-6 w-6 items-center justify-center rounded p-1">
                  <Trash2 className="h-4 w-4" />
                </span>
                Remove All
              </Button>
            )}
          </div>

          {totalItems > 0 ? (
            <>
              <div className="flex flex-col gap-6">
                {currentItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col gap-4 border-b pb-6 last:border-0 last:pb-0 sm:flex-row sm:items-start sm:gap-6"
                  >
                    {/* Image */}
                    <div className="bg-muted relative h-[120px] w-full shrink-0 overflow-hidden rounded-md sm:h-[140px] sm:w-[140px]">
                      {item.image ? (
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      ) : (
                        <div className="bg-secondary/50 text-muted-foreground flex h-full w-full flex-col items-center justify-center p-2 text-center text-xs">
                          Image
                        </div>
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex flex-1 flex-col sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex w-full flex-col sm:max-w-[400px] lg:max-w-[500px]">
                        {item.slug ? (
                          <Link
                            href={`/products/${item.slug}`}
                            className="hover:text-primary line-clamp-2 text-base font-semibold transition-colors sm:text-lg"
                          >
                            {item.name}
                          </Link>
                        ) : (
                          <h3 className="line-clamp-2 text-base font-semibold sm:text-lg">{item.name}</h3>
                        )}
                        <p className="text-muted-foreground mt-2 line-clamp-2 text-sm">
                          {item.description || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'}
                        </p>

                        <div className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
                          <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                          {item.stockStatus || 'In Stock'}
                        </div>
                      </div>

                      {/* Pricing & Actions mapped to right */}
                      <div className="mt-4 flex flex-row items-baseline justify-between gap-4 sm:mt-0 sm:flex-col sm:items-end sm:gap-2">
                        <div className="flex items-center gap-3 sm:flex-row-reverse sm:gap-2">
                          {item.originalPrice && (
                            <span className="text-muted-foreground text-sm line-through sm:text-base">
                              $
                              {item.originalPrice.toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}
                            </span>
                          )}
                          <span className="text-foreground text-lg font-bold sm:text-xl">
                            $
                            {item.price.toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </span>
                        </div>

                        <div className="mt-auto flex items-center gap-2 sm:mt-4">
                          <Button
                            variant="outline"
                            size="icon"
                            className="text-muted-foreground hover:bg-muted/80 border-input h-10 w-10 transition-colors hover:text-red-500"
                            onClick={() => removeItem(item.id)}
                            title="Remove Item"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="secondary"
                            size="icon"
                            className="bg-muted hover:bg-muted/80 text-foreground border-input h-10 w-10 transition-colors"
                            onClick={() => {
                              addToCart({
                                id: item.id,
                                name: item.name,
                                price: item.price,
                                brand: item.brand,
                                image: item.image,
                                slug: item.slug,
                              });
                              removeItem(item.id);
                              setCartOpen(true);
                            }}
                            title="Add to Cart"
                          >
                            <ShoppingCart className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <AppPagination pageCount={pageCount} onPageChange={handlePageClick} />
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="bg-muted mb-4 flex h-20 w-20 items-center justify-center rounded-full">
                <Heart className="text-muted-foreground h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold">Your wishlist is empty</h3>
              <p className="text-muted-foreground mt-2 mb-6">Looks like you haven&apos;t added any favorites yet.</p>
              <Link href="/">
                <Button>Start Browsing</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
