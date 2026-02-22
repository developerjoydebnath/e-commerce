'use client';

import { cn } from '@/shared/lib/utils';
import { useCheckoutStore } from '@/shared/store/checkoutStore';
import { Banknote, CheckCircle2, CreditCard } from 'lucide-react';

const PAYMENT_METHODS = [
  { id: 'cod', name: 'Cash on Delivery', description: 'Pay when you receive the product', icon: Banknote },
  { id: 'bkash', name: 'bKash', description: 'Pay via bKash mobile banking', logo: 'bKash' },
  { id: 'nagad', name: 'Nagad', description: 'Pay via Nagad mobile banking', logo: 'Nagad' },
  { id: 'rocket', name: 'Rocket', description: 'Pay via Rocket mobile banking', logo: 'Rocket' },
  { id: 'sslcommerz', name: 'SSLCommerz', description: 'Stripe / SSLCommerz Secure', logo: 'SSL' },
  { id: 'card', name: 'Credit/Debit Card', description: 'Visa, MasterCard, Amex', icon: CreditCard },
];

export default function PaymentStep() {
  const store = useCheckoutStore();

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-bold">Select Payment Method</h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {PAYMENT_METHODS.map((method) => {
          const isSelected = store.selectedPaymentMethod === method.id;
          const Icon = method.icon;

          return (
            <div
              key={method.id}
              onClick={() => store.setSelectedPaymentMethod(method.id)}
              className={cn(
                'relative flex cursor-pointer flex-col gap-2 rounded-xl border p-5 transition-all hover:-translate-y-0.5',
                isSelected
                  ? 'border-primary bg-primary/5 ring-primary shadow-md ring-1'
                  : 'hover:border-primary/50 hover:shadow-sm'
              )}
            >
              <div className="flex items-center gap-4">
                {/* Method Logo or Icon */}
                <div className="bg-muted flex h-12 w-12 shrink-0 items-center justify-center rounded-lg text-lg font-bold">
                  {Icon ? (
                    <Icon className="text-muted-foreground h-6 w-6" />
                  ) : (
                    <span className="text-[#e2136e]">{method.logo && method.logo.charAt(0)}</span>
                  )}
                </div>

                <div className="flex flex-1 flex-col">
                  <span className="text-foreground font-semibold">{method.name}</span>
                  <span className="text-muted-foreground text-xs">{method.description}</span>
                </div>

                {/* Selection Indicator */}
                <div
                  className={cn(
                    'flex h-6 w-6 items-center justify-center rounded-full border-2 transition-colors',
                    isSelected
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-muted-foreground/30 bg-background'
                  )}
                >
                  {isSelected && <CheckCircle2 className="h-4 w-4" />}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
