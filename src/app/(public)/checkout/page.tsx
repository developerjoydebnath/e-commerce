'use client';

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
import { useCheckoutStore } from '@/shared/store/checkoutStore';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// Step Components
import CheckoutStepper from '@/modules/checkout/components/CheckoutStepper';
import CartReviewStep from '@/modules/checkout/components/steps/CartReviewStep';
import CompletionStep from '@/modules/checkout/components/steps/CompletionStep';
import PaymentStep from '@/modules/checkout/components/steps/PaymentStep';
import ShippingStep from '@/modules/checkout/components/steps/ShippingStep';
import { ChevronLeft } from 'lucide-react';

export default function CheckoutPage() {
  const [mounted, setMounted] = useState(false);
  const cartItems = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);

  const { activeStep, nextStep, prevStep, selectedAddressId, selectedPaymentMethod, getShippingCost, setActiveStep } =
    useCheckoutStore();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    setActiveStep(1);

    return () => {
      setActiveStep(1);
    };
  }, [setActiveStep]);

  if (!mounted) return <div className="bg-muted/20 min-h-screen animate-pulse" />;

  const selectedItems = cartItems.filter((item) => item.selected);
  const subtotal = selectedItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Calculate dynamic shipping based on Zustand State if past step 1
  const shippingCost = selectedItems.length > 0 ? getShippingCost() : 0;
  const discount = selectedItems.length > 0 ? subtotal * 0.1 : 0; // Static 10% voucher mock
  const total = subtotal + shippingCost - discount;

  const handleNextAction = () => {
    // Basic validation locks before proceeding
    if (activeStep === 1 && selectedItems.length === 0) {
      alert('Please select items to checkout.');
      return;
    }
    if (activeStep === 2 && !selectedAddressId) {
      alert('Please select or add a shipping address.');
      return;
    }

    if (activeStep === 3) {
      if (!selectedPaymentMethod) {
        alert('Please select a payment method.');
        return;
      }

      // FINALIZE ORDER PROCESS
      // 1. Send data to backend -> (Mocked here)
      // 2. Redirect to Payment Gateway -> (Mocked here via quick active state shift)
      // 3. Clear cart
      if (clearCart) clearCart();
      nextStep(); // Goes to step 4 (Success)
      return;
    }

    nextStep();
  };

  // If we reached Success step, render full width success banner
  if (activeStep === 4) {
    return (
      <div className="bg-background min-h-screen pt-8 pb-20 sm:pt-12">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <CheckoutStepper />
          <div className="bg-card mt-10 rounded-2xl border p-4 shadow-sm md:p-10">
            <CompletionStep />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen pt-8 pb-20 sm:pt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h1 className="mb-4 text-2xl font-bold tracking-tight md:text-3xl">Checkout</h1>
            <Breadcrumb className="hidden sm:flex">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>
                    {activeStep === 1 ? 'Cart Details' : activeStep === 2 ? 'Shipping' : 'Payment'}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>

        {/* Multi-Step Main Layout */}
        <div className="relative flex flex-col gap-10 lg:flex-row lg:items-start">
          {/* Left Column: Dynamic Step Container */}
          <div className="min-w-0 flex-1">
            {/* The visual Stepper */}
            <div className="mt-2 mb-8 sm:mb-12">
              <CheckoutStepper />
            </div>

            {/* Render Active Step Contents */}
            <div className="bg-card rounded-2xl border p-6 shadow-sm">
              {activeStep === 1 && <CartReviewStep />}
              {activeStep === 2 && <ShippingStep />}
              {activeStep === 3 && <PaymentStep />}
            </div>

            {/* Mobile Footer Spacing padding */}
            <div className="h-10 lg:hidden" />
          </div>

          {/* Right Column: Order Summary - Sticky Globally */}
          <div className="w-full shrink-0 lg:sticky lg:top-32 lg:w-[380px] xl:w-[420px]">
            <div className="dark:bg-card rounded-2xl border bg-white p-6 shadow-sm">
              <h2 className="text-foreground mb-8 text-[20px] font-bold">Order Summary</h2>

              <div className="flex flex-col gap-4 text-[15px]">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Sub Total ({selectedItems.length} items)</span>
                  <span className="text-foreground font-bold">
                    ৳ {subtotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Shipping Cost</span>
                  <span className="text-foreground font-bold">
                    ৳ {shippingCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Voucher Discount - (10%)</span>
                    <span className="font-bold text-red-500">
                      - ৳ {discount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                )}

                <div className="border-border/60 my-2 border-t" />

                <div className="flex items-center justify-between text-xl font-bold">
                  <span className="text-foreground">Total Cost</span>
                  <span className="text-primary tracking-tight">
                    ৳ {total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              {activeStep === 1 && (
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
              )}

              {/* Dynamic Action Buttons based on Step */}
              <div className="mt-8 flex flex-col gap-3">
                <Button
                  size="lg"
                  onClick={handleNextAction}
                  disabled={selectedItems.length === 0}
                  className="w-full text-base font-bold text-white transition-colors"
                >
                  {activeStep === 1 && 'Proceed to Shipping'}
                  {activeStep === 2 && 'Continue to Payment'}
                  {activeStep === 3 && 'Confirm Order'}
                </Button>

                {activeStep > 1 && (
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={prevStep}
                    className="w-full gap-2 text-base font-semibold transition-colors"
                  >
                    <ChevronLeft className="h-5 w-5" /> Back to {activeStep === 2 ? 'Cart' : 'Shipping'}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
