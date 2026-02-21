'use client';

import CartItemCard from '@/modules/cart/components/CartItemCard';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/shared/components/ui/breadcrumb';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { useCartStore } from '@/shared/store/cartStore';
import { ChevronLeft, ChevronRight, ShoppingCart, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

export default function CartPage() {
  const [mounted, setMounted] = useState(false);
  const cartItems = useCartStore((state) => state.items);
  const selectAll = useCartStore((state) => state.selectAll);
  const removeSelectedItems = useCartStore((state) => state.removeSelectedItems);

  // Pagination State
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return <div className="bg-muted/20 min-h-screen animate-pulse" />;

  const selectedItems = cartItems.filter((item) => item.selected);
  const subtotal = selectedItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingCost = selectedItems.length > 0 ? 25 : 0;
  const discount = selectedItems.length > 0 ? subtotal * 0.1 : 0; // Static 10% discount example mapping UI mockup
  const total = subtotal + shippingCost - discount;

  // Pagination Logic
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = cartItems.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(cartItems.length / itemsPerPage);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % cartItems.length;
    setItemOffset(newOffset);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-background min-h-screen pt-8 pb-20 sm:pt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="mb-4 text-2xl font-bold tracking-tight md:text-3xl">My Cart</h1>

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
              <BreadcrumbPage>My Cart</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Main Layout */}
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start">
          {/* Left Column: Cart Items */}
          <div className="flex-1">
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
                  className="text-muted-foreground gap-2 text-xs font-semibold"
                >
                  <span className="bg-foreground/10 flex h-5 w-5 items-center justify-center rounded p-0.5">
                    <Trash2 className="h-3 w-3" />
                  </span>
                  Remove Selected
                </Button>
              </div>
            </div>

            {cartItems.length > 0 ? (
              <>
                <div className="flex flex-col">
                  {currentItems.map((item) => (
                    <CartItemCard key={item.id} item={item} />
                  ))}
                </div>

                {/* Pagination */}
                {pageCount > 1 && (
                  <div className="mt-10 flex justify-center lg:justify-end">
                    <ReactPaginate
                      breakLabel={
                        <span className="bg-muted flex h-10 w-10 items-center justify-center rounded-md text-sm font-medium">
                          ...
                        </span>
                      }
                      nextLabel={
                        <span className="bg-muted hover:bg-muted/80 flex h-10 items-center justify-center gap-1 rounded-md px-4 text-sm font-semibold transition-colors">
                          Next <ChevronRight className="h-4 w-4" />
                        </span>
                      }
                      onPageChange={handlePageClick}
                      pageRangeDisplayed={3}
                      marginPagesDisplayed={1}
                      pageCount={pageCount}
                      previousLabel={
                        <span className="bg-muted hover:bg-muted/80 flex h-10 items-center justify-center gap-1 rounded-md px-4 text-sm font-semibold transition-colors">
                          <ChevronLeft className="h-4 w-4" /> Prev
                        </span>
                      }
                      containerClassName="flex items-center gap-2"
                      pageLinkClassName="flex h-10 w-10 items-center justify-center rounded-md bg-muted text-sm font-medium transition-colors hover:bg-muted/80"
                      activeLinkClassName="!bg-primary text-primary-foreground pointer-events-none"
                      disabledLinkClassName="opacity-50 cursor-not-allowed hidden"
                    />
                  </div>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="bg-muted mb-4 flex h-20 w-20 items-center justify-center rounded-full">
                  <ShoppingCart className="text-muted-foreground h-10 w-10" />
                </div>
                <h3 className="text-xl font-bold">Your cart is empty</h3>
                <p className="text-muted-foreground mt-2 mb-6">
                  Looks like you haven&apos;t added anything to your cart yet.
                </p>
                <Link href="/">
                  <Button>Start Shopping</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Right Column: Order Summary */}
          <div className="w-full shrink-0 lg:sticky lg:top-32 lg:w-[380px] xl:w-[420px]">
            <div className="dark:bg-card rounded-xl border bg-white p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
              <h2 className="text-foreground mb-8 text-[22px] font-bold">Order Summary</h2>

              <div className="flex flex-col gap-5 text-[15px]">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Sub Total ({selectedItems.length} items)</span>
                  <span className="text-foreground font-bold">
                    ${subtotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Shipping Cost</span>
                  <span className="text-foreground font-bold">
                    ${shippingCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Voucher Discount - (10%)</span>
                    <span className="font-bold text-red-500">
                      - ${discount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                )}

                <div className="border-border/60 my-2 border-t" />

                <div className="flex items-center justify-between text-xl font-bold">
                  <span className="text-foreground">Total Cost</span>
                  <span className="text-foreground">
                    ${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-2">
                <span className="text-foreground text-[13px] font-semibold">Gift Card/Voucher code</span>
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Enter code"
                    className="border-muted bg-background h-11 flex-1 focus-visible:ring-1"
                  />
                  <Button
                    variant="secondary"
                    className="bg-muted hover:bg-muted/80 text-foreground h-11 px-6 font-semibold"
                  >
                    Apply
                  </Button>
                </div>
              </div>

              {selectedItems.length > 0 ? (
                <Link href="/checkout" className="mt-8 block w-full">
                  <Button
                    size="lg"
                    className="w-full bg-[#ff5500] text-base font-bold text-white transition-colors hover:bg-[#e64d00]"
                  >
                    Proceed to Checkout
                  </Button>
                </Link>
              ) : (
                <Button size="lg" disabled className="mt-8 w-full bg-[#ff5500]/50 text-base font-bold text-white">
                  Proceed to Checkout
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
