'use client';

import { Button } from '@/shared/components/ui/button';
import { useCheckoutStore } from '@/shared/store/checkoutStore';
import { CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function CompletionStep() {
  const selectedPaymentMethod = useCheckoutStore((state) => state.selectedPaymentMethod);

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
        <CheckCircle2 className="h-12 w-12" strokeWidth={2.5} />
      </div>

      <h2 className="mb-2 text-3xl font-extrabold tracking-tight">Your order is placed successfully!</h2>
      <p className="text-muted-foreground mb-8 max-w-md">
        Thank you for your purchase. We have received your order {selectedPaymentMethod !== 'cod' && 'and payment '}
        and are currently processing it.
      </p>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Link prefetch={false} href="/">
          <Button variant="outline" size="lg" className="w-full font-semibold sm:w-auto">
            Continue Shopping
          </Button>
        </Link>
        <Link prefetch={false} href="/">
          {' '}
          {/* Placeholder for an orders page */}
          <Button size="lg" className="w-full font-semibold sm:w-auto">
            View Order Status
          </Button>
        </Link>
      </div>
    </div>
  );
}
