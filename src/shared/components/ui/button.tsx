import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';
import * as React from 'react';

import { cn } from '@/shared/lib/utils';

const buttonVariants = cva(
  "inline-flex items-center cursor-pointer justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary',
        primary: 'bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary',
        destructive: 'bg-destructive text-white hover:bg-destructive/80 active:bg-destructive',
        success: 'bg-success text-white hover:bg-success/90 active:bg-success',
        warning: 'bg-warning text-white hover:bg-warning/90 active:bg-warning',
        info: 'bg-info text-white hover:bg-info/90 active:bg-info',
        outline:
          'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground active:bg-accent/50 dark:bg-accent dark:border-input dark:hover:bg-accent/80 dark:active:bg-accent',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
        link: 'text-primary',
      },
      size: {
        default: 'h-10 px-4 py-2 has-[>svg]:px-3',
        xs: "h-6 gap-1 rounded px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: 'h-8 rounded-[6px] gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-12 rounded-md px-6 has-[>svg]:px-4',
        'lg-responsive':
          'h-8 sm:h-10 md:h-12 text-xs sm:text-sm md:text-base rounded-[6px] sm:rounded-md md:rounded-lg px-3 sm:px-4 md:px-6 has-[>svg]:px-2.5 sm:has-[>svg]:px-3 md:has-[>svg]:px-4',
        'default-responsive':
          'h-8 sm:h-10 text-xs sm:text-sm rounded-[6px] sm:rounded-md sm:px-4 md:px-6 has-[>svg]:px-2.5 sm:has-[>svg]:px-3',
        icon: 'size-10',
        'icon-xs': "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
        'icon-sm': 'size-8',
        'icon-lg': 'size-12',
        'icon-lg-responsive': 'size-8 sm:size-10 md:size-12',
        'icon-default-responsive': 'size-8 sm:size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

function Button({
  className,
  variant = 'default',
  size = 'default',
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : 'button';

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
