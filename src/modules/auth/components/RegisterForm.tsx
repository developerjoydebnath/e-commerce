'use client';

import InputField from '@/shared/components/form/InputField';
import { Button } from '@/shared/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { REGISTER_FORM_FIELDS } from '../constant/authFields';
import { registerSchema } from '../dto/auth.dto';
import { RegisterDto } from '../type/auth.type';

export function RegisterForm() {
  const form = useForm<RegisterDto>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      remember: false,
      privacyAccept: undefined,
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = form;

  const onSubmit = () => {
    toast.success('Registration simulated successfully!');
    // Redirect or perform actual register logic here
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      {REGISTER_FORM_FIELDS.map((field) => (
        <div key={field.name} className="grid gap-2">
          <InputField {...field} control={control} />
        </div>
      ))}

      <Button
        type="submit"
        size="lg"
        className="text-sm font-black tracking-widest uppercase"
        disabled={form.formState.isSubmitting}
      >
        {form.formState.isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
        <span>{form.formState.isSubmitting ? 'Creating account...' : 'Create an account'}</span>
      </Button>
    </form>
  );
}
