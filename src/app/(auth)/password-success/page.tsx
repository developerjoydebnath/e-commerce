'use client';

import { Button } from '@/shared/components/ui/button';
import { CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function PasswordSuccessPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 text-center sm:py-10">
      <div className="flex flex-col items-center gap-4">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-50 text-green-600">
          <CheckCircle2 className="h-10 w-10" />
        </div>
        <h2 className="text-3xl font-black tracking-tight text-zinc-900">Password reset</h2>
        <p className="max-w-[300px] text-sm leading-relaxed text-zinc-500">
          Your password has been successfully reset. Click below to log in magically.
        </p>
      </div>

      <Link prefetch={false} href="/login" className="w-full">
        <Button size="lg" className="text-sm font-black tracking-widest uppercase">
          Continue to Login
        </Button>
      </Link>
    </div>
  );
}
