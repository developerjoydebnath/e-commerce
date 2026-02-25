'use client';

import { Button } from '@/shared/components/ui/button';
import { Checkbox } from '@/shared/components/ui/checkbox';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
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

      <form className="flex flex-col gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            className="focus-visible:ring-primary h-11 shadow-sm"
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Minimum 8 characters"
            className="focus-visible:ring-primary h-11 shadow-sm"
            required
          />
        </div>

        <div className="flex items-center gap-2">
          <Checkbox id="save-password" />
          <Label htmlFor="save-password" className="cursor-pointer text-sm leading-none font-medium text-zinc-600">
            Save the password
          </Label>
        </div>

        <div className="flex items-start gap-2">
          <Checkbox id="privacy" className="mt-1" />
          <Label htmlFor="privacy" className="cursor-pointer text-sm leading-relaxed text-zinc-600">
            I have read and accept the{' '}
            <Link prefetch={false} href="#" className="font-bold text-zinc-900 hover:underline">
              Privacy Policy
            </Link>
          </Label>
        </div>

        <Button
          type="submit"
          className="bg-primary hover:bg-primary/90 h-12 text-sm font-black tracking-widest text-white uppercase shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          Create an account
        </Button>
      </form>

      {/* Account Benefits section from screenshot */}
      <div className="mt-8 flex flex-col gap-4 rounded-3xl bg-zinc-50 p-6 lg:hidden">
        <h3 className="text-center text-sm font-bold tracking-wider text-zinc-900 uppercase">
          Cartzilla account benefits
        </h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {BENEFITS.map((benefit, idx) => (
            <div key={idx} className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm">
              <div className="bg-primary/10 text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
                <benefit.icon className="h-5 w-5" />
              </div>
              <span className="text-xs font-medium text-zinc-700">{benefit.text}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-zinc-500">or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {/* Same social buttons as login */}
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
