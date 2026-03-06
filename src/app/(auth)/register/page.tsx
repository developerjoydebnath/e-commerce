'use client';

import { RegisterForm } from '@/modules/auth/components/RegisterForm';
import { Button } from '@/shared/components/ui/button';
import { Bell, CreditCard, Gift, Heart, Layout, Percent } from 'lucide-react';
import Link from 'next/link';

const BENEFITS = [
  { icon: Bell, text: 'Subscribe to your favorite products' },
  { icon: Layout, text: 'View and manage your orders and wishlist' },
  { icon: Gift, text: 'Earn rewards for future purchases' },
  { icon: Percent, text: 'Receive exclusive offers and discounts' },
  { icon: Heart, text: 'Create multiple wishlists' },
  { icon: CreditCard, text: 'Pay for purchases by installments' },
];

export default function RegisterPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-black tracking-tight text-zinc-900">Create an account</h2>
        <p className="text-sm text-zinc-500">
          I already have an account{' '}
          <Link prefetch={false} href="/login" className="text-primary font-bold hover:underline">
            Sign in
          </Link>
        </p>
      </div>

      <RegisterForm />

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-zinc-500">or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Button variant="outline" className="h-11 font-bold text-zinc-700">
          Google
        </Button>
        <Button variant="outline" className="h-11 font-bold text-zinc-700">
          Facebook
        </Button>
        <Button variant="outline" className="h-11 font-bold text-zinc-700">
          Apple
        </Button>
      </div>
    </div>
  );
}
