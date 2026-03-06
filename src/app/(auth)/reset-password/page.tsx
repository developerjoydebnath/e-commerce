'use client';

import { ResetPasswordForm } from '@/modules/auth/components/ResetPasswordForm';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function ResetPasswordPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <Link
          prefetch={false}
          href="/verify-otp"
          className="text-muted-foreground hover:text-primary flex items-center gap-1 text-sm font-bold transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to OTP Verification
        </Link>
        <h2 className="mt-4 text-3xl font-black tracking-tight text-zinc-900">Set new password</h2>
        <p className="text-sm leading-relaxed text-zinc-500">
          Your new password must be structurally different from your securely stored previous passwords.
        </p>
      </div>

      <ResetPasswordForm />
    </div>
  );
}
