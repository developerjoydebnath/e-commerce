'use client';

import InputField from '@/shared/components/form/InputField';
import { Button } from '@/shared/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { VERIFY_OTP_FORM_FIELDS } from '../constant/authFields';
import { verifyOtpSchema } from '../dto/auth.dto';
import { VerifyOtpDto } from '../type/auth.type';

export function VerifyOtpForm() {
  const form = useForm<VerifyOtpDto>({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: {
      otp: '',
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = form;
  const router = useRouter();

  const onSubmit = (data: VerifyOtpDto) => {
    toast.success('OTP verified successfully!');
    router.push('/reset-password');
  };

  return (
    <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
      {VERIFY_OTP_FORM_FIELDS.map((field) => (
        <InputField key={field.name} {...field} control={control} />
      ))}

      <Button
        type="submit"
        size="lg"
        className="text-sm font-black tracking-widest uppercase"
        disabled={form.formState.isSubmitting}
      >
        {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        <span>{form.formState.isSubmitting ? 'Verifying...' : 'Verify OTP'}</span>
      </Button>
    </form>
  );
}
