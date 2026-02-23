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
import { Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function CartSidebar() {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const [mounted, setMounted] = useState(false);

  const cartItems = useCartStore((state) => state.items);
  const isOpen = useCartStore((state) => state.isOpen);
  const setIsOpen = useCartStore((state) => state.setIsOpen);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const totalItems = cartItems.length; // Number of unique items, not total quantity as requested
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Prevent hydration mismatch for the cart count trigger since it reads from localStorage
  if (!mounted) {
    return (
      <button className="group flex cursor-pointer items-center gap-3 text-left">
        <div className="bg-muted group-hover:bg-primary/10 relative rounded-full p-2 transition-colors">
          <ShoppingCart className="text-muted-foreground group-hover:text-primary h-5 w-5 transition-colors" />
          <span className="bg-primary text-primary-foreground absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full text-[10px]">
            0
          </span>
        </div>
        <div className="hidden xl:block">
          <p className="text-muted-foreground text-xs">Cart</p>
          <p className="text-sm font-medium">$0.00</p>
        </div>
      </button>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen} direction={isDesktop ? 'right' : 'bottom'}>
      <DrawerTrigger asChild>
        <button
          aria-label={`Shopping Cart, ${totalItems} items, total price $${totalPrice.toFixed(2)}`}
          className="group flex cursor-pointer items-center gap-3 text-left"
        >
          <div className="bg-muted group-hover:bg-primary/10 relative rounded-full p-2 transition-colors">
            <ShoppingCart className="text-muted-foreground group-hover:text-primary h-5 w-5 transition-colors" />
            <span className="bg-primary text-primary-foreground absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full text-[10px]">
              {totalItems}
            </span>
          </div>
          <div className="hidden xl:block">
            <p className="text-muted-foreground text-xs font-semibold">Cart</p>
            <p className="text-sm font-medium">
              ${totalPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
        </button>
      </DrawerTrigger>

      <DrawerContent className={isDesktop ? 'h-full w-[400px] rounded-none sm:max-w-md' : 'h-[85vh]'}>
        <DrawerHeader className="flex flex-row items-baseline justify-between border-b px-6 py-4">
          <DrawerTitle className="flex flex-row items-baseline gap-2 text-xl font-bold">
            Shopping Cart <span className="text-muted-foreground text-base font-normal">({totalItems} items)</span>
          </DrawerTitle>
          {cartItems.length > 0 && (
            <button
              onClick={() => clearCart()}
              className="text-sm font-medium text-red-500 transition-colors hover:text-red-600"
            >
              Clear Cart
            </button>
          )}
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {cartItems.length > 0 ? (
            <ul className="flex flex-col gap-6">
              {cartItems.map((item) => (
                <li key={item.cartItemId} className="border-border/50 flex gap-4 border-b pb-6 last:border-0 last:pb-0">
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

                    <div className="mt-3 flex items-center justify-between">
                      <div className="border-input flex h-8 items-center rounded-md border bg-transparent">
                        <button
                          onClick={() => decreaseQuantity(item.cartItemId)}
                          disabled={item.quantity <= 1}
                          aria-label="Decrease quantity"
                          className="text-muted-foreground hover:bg-muted hover:text-foreground flex h-full w-8 items-center justify-center transition-colors disabled:opacity-50"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="border-input flex h-full w-8 items-center justify-center border-x text-sm font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => increaseQuantity(item.cartItemId)}
                          aria-label="Increase quantity"
                          className="text-muted-foreground hover:bg-muted hover:text-foreground flex h-full w-8 items-center justify-center transition-colors"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.cartItemId)}
                        aria-label="Remove item"
                        className="text-muted-foreground transition-colors hover:text-red-500"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-muted-foreground flex h-full flex-col items-center justify-center gap-2">
              <ShoppingCart className="h-12 w-12 opacity-20" />
              <p>Your cart is empty.</p>
            </div>
          )}
        </div>

        <DrawerFooter className="bg-background border-t px-6 py-4">
          <div className="mb-4 space-y-3">
            <div className="text-muted-foreground flex items-center justify-between text-sm">
              <span>Subtotal</span>
              <span>
                ${totalPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex items-center justify-between text-lg font-bold">
              <span>Total</span>
              <span>
                ${totalPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            {cartItems.length === 0 ? (
              <Button className="w-full font-bold" size="lg" disabled>
                Checkout Now
              </Button>
            ) : (
              <Link href="/checkout" onClick={() => setIsOpen(false)} className="block w-full">
                <Button className="w-full font-bold" size="lg">
                  Checkout Now
                </Button>
              </Link>
            )}
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
