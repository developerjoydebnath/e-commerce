'use client';

import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { ChevronLeft, Mail } from 'lucide-react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <Link prefetch={false}
          href="/login"
          className="text-muted-foreground hover:text-primary flex items-center gap-1 text-sm font-bold transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Sign In
        </Link>
        <h2 className="mt-4 text-3xl font-black tracking-tight text-zinc-900">Forgot password?</h2>
        <p className="text-sm leading-relaxed text-zinc-500">
          Enter the email address you used when you joined and we{"'"}ll send you instructions to reset your password
        </p>
      </div>

      <form className="flex flex-col gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email address</Label>
          <div className="relative">
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              className="focus-visible:ring-primary h-11 pl-10 shadow-sm"
              required
            />
            <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-zinc-400" />
          </div>
        </div>

        <Button
          type="submit"
          className="bg-primary hover:bg-primary/90 h-12 text-sm font-black tracking-widest text-white uppercase shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          Reset password
        </Button>
      </form>
    </div>
  );
}
