'use client';

import CartItemCard from '@/modules/cart/components/CartItemCard';
import AppPagination from '@/shared/components/ui/app-pagination';
import { Button } from '@/shared/components/ui/button';
import { useCartStore } from '@/shared/store/cartStore';
import { useCheckoutStore } from '@/shared/store/checkoutStore';
import { ShoppingCart, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function CartReviewStep() {
  const [mounted, setMounted] = useState(false);
  const cartItems = useCartStore((state) => state.items);
  const selectAll = useCartStore((state) => state.selectAll);
  const removeSelectedItems = useCartStore((state) => state.removeSelectedItems);
  const nextStep = useCheckoutStore((state) => state.nextStep);

  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return <div className="bg-muted/20 min-h-[400px] w-full animate-pulse" />;

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = cartItems.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(cartItems.length / itemsPerPage);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % cartItems.length;
    setItemOffset(newOffset);
  };

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="bg-muted mb-4 flex h-20 w-20 items-center justify-center rounded-full">
          <ShoppingCart className="text-muted-foreground h-10 w-10" />
        </div>
        <h3 className="text-xl font-bold">Your cart is empty</h3>
        <p className="text-muted-foreground mt-2 mb-6">Looks like you haven&apos;t added anything to checkout yet.</p>
        <Link prefetch={false} href="/">
          <Button>Start Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-bold">Cart Items ({cartItems.length})</h2>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={() => selectAll(true)} className="text-xs font-semibold">
            Select All
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={removeSelectedItems}
            className="text-muted-foreground flex gap-2 text-xs font-semibold"
          >
            <span className="bg-foreground/10 flex h-5 w-5 items-center justify-center rounded p-0.5">
              <Trash2 className="h-3 w-3" />
            </span>
            Remove Selected
          </Button>
        </div>
      </div>

      <div className="flex flex-col">
        {currentItems.map((item) => (
          <CartItemCard key={item.cartItemId} item={item} />
        ))}
      </div>

      <AppPagination pageCount={pageCount} onPageChange={handlePageClick} />
    </div>
  );
}
