'use client';

import { Button } from '@/shared/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/shared/components/ui/drawer';
import useMediaQuery from '@/shared/hooks/useMediaQuery';
import { useCartStore } from '@/shared/store/cartStore';
import { useWishlistStore } from '@/shared/store/wishlistStore';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function WishlistSidebar() {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const [mounted, setMounted] = useState(false);

  const wishlistItems = useWishlistStore((state) => state.items);
  const isOpen = useWishlistStore((state) => state.isOpen);
  const setIsOpen = useWishlistStore((state) => state.setIsOpen);
  const removeItem = useWishlistStore((state) => state.removeItem);
  const clearWishlist = useWishlistStore((state) => state.clearWishlist);

  const addToCart = useCartStore((state) => state.addItem);
  const setCartOpen = useCartStore((state) => state.setIsOpen);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className="group flex cursor-pointer items-center gap-3 text-left">
        <div className="bg-muted group-hover:bg-primary/10 relative rounded-full p-2 transition-colors">
          <Heart className="text-muted-foreground group-hover:text-primary h-5 w-5 transition-colors" />
          <span className="bg-primary text-primary-foreground absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full text-[10px]">
            0
          </span>
        </div>
        <div className="hidden xl:block">
          <p className="text-muted-foreground text-xs">Favorite</p>
          <p className="text-sm font-medium">My Wishlist</p>
        </div>
      </button>
    );
  }

  const totalItems = wishlistItems.length;

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen} direction={isDesktop ? 'right' : 'bottom'}>
      <DrawerTrigger asChild>
        <button className="group flex cursor-pointer items-center gap-3 text-left">
          <div className="bg-muted group-hover:bg-primary/10 relative rounded-full p-2 transition-colors">
            <Heart className="text-muted-foreground group-hover:text-primary h-5 w-5 transition-colors" />
            <span className="bg-primary text-primary-foreground absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full text-[10px]">
              {totalItems}
            </span>
          </div>
          <div className="hidden xl:block">
            <p className="text-muted-foreground text-xs">Favorite</p>
            <p className="text-sm font-medium">My Wishlist</p>
          </div>
        </button>
      </DrawerTrigger>

      <DrawerContent className={isDesktop ? 'h-full w-[400px] rounded-none sm:max-w-md' : 'h-[85vh]'}>
        <DrawerHeader className="flex flex-row items-baseline justify-between border-b px-6 py-4">
          <DrawerTitle className="flex flex-row items-baseline gap-2 text-xl font-bold">
            My Wishlist <span className="text-muted-foreground text-base font-normal">({totalItems} items)</span>
          </DrawerTitle>
          {wishlistItems.length > 0 && (
            <button
              onClick={() => clearWishlist()}
              className="text-sm font-medium text-red-500 transition-colors hover:text-red-600"
            >
              Clear Wishlist
            </button>
          )}
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {wishlistItems.length > 0 ? (
            <ul className="flex flex-col gap-6">
              {wishlistItems.map((item) => (
                <li key={item.id} className="border-border/50 flex gap-4 border-b pb-6 last:border-0 last:pb-0">
                  <div className="bg-muted relative h-24 w-24 shrink-0 overflow-hidden rounded-md border">
                    <div className="absolute top-0 left-0 z-10 rounded-br-md bg-black/80 px-1.5 py-0.5 text-[10px] leading-none text-white">
                      {item.brand || 'Brand'}
                    </div>
                    {item.image ? (
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    ) : (
                      <div className="bg-secondary/50 text-muted-foreground flex h-full w-full flex-col items-center justify-center p-2 text-center text-xs">
                        Product Image
                      </div>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      {item.slug ? (
                        <Link
                          href={`/products/${item.slug}`}
                          onClick={() => setIsOpen(false)}
                          className="hover:text-primary line-clamp-2 text-sm leading-normal font-medium transition-colors"
                        >
                          {item.name}
                        </Link>
                      ) : (
                        <h3 className="line-clamp-2 text-sm leading-normal font-medium">{item.name}</h3>
                      )}
                      <p className="mt-1 font-bold">
                        ${item.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </p>
                    </div>

                    <div className="mt-3 flex items-center justify-end gap-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        className="flex-1 gap-2 rounded-md font-semibold"
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
                          setIsOpen(false);
                          setCartOpen(true);
                        }}
                      >
                        <ShoppingCart className="h-4 w-4" />
                        Add to Cart
                      </Button>
                      <Button
                        onClick={() => removeItem(item.id)}
                        size="icon-sm"
                        variant="outline"
                        className="text-muted-foreground border-input flex items-center justify-center rounded-md border transition-colors hover:text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-muted-foreground flex h-full flex-col items-center justify-center gap-2">
              <Heart className="h-12 w-12 opacity-20" />
              <p>Your wishlist is empty.</p>
            </div>
          )}
        </div>

        <DrawerFooter className="bg-background border-t px-6 py-4">
          <div className="flex flex-col gap-3">
            {wishlistItems.length > 0 ? (
              <Link href="/wishlist" onClick={() => setIsOpen(false)} className="block w-full">
                <Button className="w-full font-bold" size="lg">
                  View Full Wishlist
                </Button>
              </Link>
            ) : null}
            <DrawerClose asChild>
              <Button variant="outline" className="w-full font-bold" size="lg">
                Continue Shopping
              </Button>
            </DrawerClose>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
