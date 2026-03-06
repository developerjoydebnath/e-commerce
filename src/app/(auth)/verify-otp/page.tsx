'use client';

import { VerifyOtpForm } from '@/modules/auth/components/VerifyOtpForm';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function VerifyOtpPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <Link
          prefetch={false}
          href="/forgot-password"
          className="text-muted-foreground hover:text-primary flex items-center gap-1 text-sm font-bold transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Forgot Password
        </Link>
        <h2 className="mt-4 text-3xl font-black tracking-tight text-zinc-900">Verify your email</h2>
        <p className="text-sm leading-relaxed text-zinc-500">
          We have sent a one-time password to your registered email address. Please enter it below to verify your
          identity.
        </p>
      </div>

      <VerifyOtpForm />
    </div>
  );
}
