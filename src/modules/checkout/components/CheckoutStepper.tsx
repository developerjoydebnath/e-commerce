'use client';

import { cn } from '@/shared/lib/utils';
import { useCheckoutStore } from '@/shared/store/checkoutStore';
import { motion } from 'framer-motion';
import { Check, CreditCard, MapPin, ShoppingCart } from 'lucide-react';

const STEPS = [
  { id: 1, label: 'Cart', icon: ShoppingCart },
  { id: 2, label: 'Shipping', icon: MapPin },
  { id: 3, label: 'Payment', icon: CreditCard },
];

export default function CheckoutStepper() {
  const activeStep = useCheckoutStore((state) => state.activeStep);

  // If we are at step 4 (Success), we show all 3 steps as completed.
  const displayStep = activeStep > 3 ? 3 : activeStep;

  return (
    <div className="mb-6 w-full px-2 sm:px-6">
      <div className="relative flex items-center justify-between">
        {/* Background Connecting Line */}
        <div className="bg-muted absolute top-1/2 left-0 z-0 h-[6px] w-full -translate-y-1/2 rounded-full" />

        {/* Dynamic Progress Line Using Framer Motion */}
        <motion.div
          className="bg-primary absolute top-1/2 left-0 z-0 h-[6px] origin-left -translate-y-1/2 rounded-full"
          initial={{ width: '0%' }}
          animate={{ width: `${((displayStep - 1) / (STEPS.length - 1)) * 100}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />

        {STEPS.map((step) => {
          const isCompleted = activeStep > step.id;
          const isCurrent = displayStep === step.id;
          const Icon = step.icon;

          return (
            <div key={step.id} className="group relative z-10 flex flex-col items-center">
              <motion.div
                initial={false}
                animate={{ scale: isCurrent ? 1.05 : 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className={cn(
                  'flex h-10 w-10 items-center justify-center rounded-full border-[3px] transition-colors duration-300 sm:h-12 sm:w-12',
                  isCompleted
                    ? 'border-primary bg-primary text-primary-foreground'
                    : isCurrent
                      ? 'border-primary text-primary bg-background ring-primary/20 ring-4'
                      : 'border-muted-foreground/30 text-muted-foreground bg-background'
                )}
              >
                {isCompleted ? (
                  <Check className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={3} />
                ) : (
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                )}
              </motion.div>

              <span
                className={cn(
                  'absolute -bottom-7 text-xs font-semibold whitespace-nowrap transition-colors duration-300 sm:-bottom-8 sm:text-sm',
                  isCompleted || isCurrent ? 'text-foreground' : 'text-muted-foreground'
                )}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
