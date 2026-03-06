'use client';

import InputField from '@/shared/components/form/InputField';
import { Button } from '@/shared/components/ui/button';
import { Checkbox } from '@/shared/components/ui/checkbox';
import { Label } from '@/shared/components/ui/label';
import { demoAuthCredentials } from '@/shared/constants/demoAuthCredentials';
import { protectedRoutes } from '@/shared/constants/routes';
import { useAuthStore } from '@/shared/stores/authStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { LOGIN_FORM_FIELDS } from '../constant/authFields';
import { loginSchema } from '../dto/auth.dto';
import { LoginDto } from '../type/auth.type';

export function LoginForm() {
  const login = useAuthStore((state) => state.login);
  const router = useRouter();

  const form = useForm<LoginDto>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: demoAuthCredentials.USER.EMAIL,
      password: demoAuthCredentials.USER.PASSWORD,
      remember: false,
    },
  });

  const { handleSubmit, control } = form;

  const onSubmit = (data: LoginDto) => {
    // Demo credential check
    if (data.email === demoAuthCredentials.USER.EMAIL && data.password === demoAuthCredentials.USER.PASSWORD) {
      login(data.email);
      toast.success('Login successful!');
      router.push(protectedRoutes.PROFILE);
    } else {
      toast.error('Invalid credentials');
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-2">
        <InputField {...LOGIN_FORM_FIELDS[0]} control={control} />
      </div>

      <div className="grid gap-2">
        <div className="relative">
          <InputField {...LOGIN_FORM_FIELDS[1]} control={control} />
          <Link
            prefetch={false}
            href="/forgot-password"
            className="text-primary absolute top-0 right-0 text-xs font-bold hover:underline"
          >
            Forgot password?
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Checkbox id="remember" onCheckedChange={(checked) => form.setValue('remember', checked as boolean)} />
        <Label
          htmlFor="remember"
          className="cursor-pointer text-sm leading-none font-medium text-zinc-600 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Remember for 30 days
        </Label>
      </div>

      <Button
        type="submit"
        size="lg"
        className="text-sm font-black tracking-widest uppercase"
        disabled={form.formState.isSubmitting}
      >
        {form.formState.isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
        <span>{form.formState.isSubmitting ? 'Signing In...' : 'Sign In'}</span>
      </Button>
    </form>
  );
}
