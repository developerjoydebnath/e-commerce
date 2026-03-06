'use client';

import InputField from '@/shared/components/form/InputField';
import { Button } from '@/shared/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { RESET_PASSWORD_FORM_FIELDS } from '../constant/authFields';
import { resetPasswordSchema } from '../dto/auth.dto';
import { ResetPasswordDto } from '../type/auth.type';

export function ResetPasswordForm() {
  const form = useForm<ResetPasswordDto>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const { handleSubmit, control } = form;
  const router = useRouter();

  const onSubmit = () => {
    toast.success('Password updated successfully!');
    router.push('/password-success');
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      {RESET_PASSWORD_FORM_FIELDS.map((field) => (
        <InputField key={field.name} {...field} control={control} />
      ))}

      <Button
        type="submit"
        size="lg"
        className="text-sm font-black tracking-widest uppercase"
        disabled={form.formState.isSubmitting}
      >
        {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        <span>{form.formState.isSubmitting ? 'Updating Password...' : 'Reset password'}</span>
      </Button>
    </form>
  );
}
