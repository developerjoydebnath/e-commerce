'use client';

import InputField from '@/shared/components/form/InputField';
import { Button } from '@/shared/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { FORGOT_PASSWORD_FORM_FIELDS } from '../constant/authFields';
import { forgotPasswordSchema } from '../dto/auth.dto';
import { ForgotPasswordDto } from '../type/auth.type';

export function ForgotPasswordForm() {
  const form = useForm<ForgotPasswordDto>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const { handleSubmit, control } = form;
  const router = useRouter();

  const onSubmit = () => {
    toast.success('Password reset instructions sent!');
    router.push('/verify-otp');
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-2">
        {FORGOT_PASSWORD_FORM_FIELDS.map((field) => (
          <InputField key={field.name} control={control} {...field} />
        ))}
      </div>

      <Button
        type="submit"
        size="lg"
        className="text-sm font-black tracking-widest uppercase"
        disabled={form.formState.isSubmitting}
      >
        {form.formState.isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
        <span>{form.formState.isSubmitting ? 'Resetting password...' : 'Reset password'}</span>
      </Button>
    </form>
  );
}
