'use client';

import { Button } from '@/shared/components/ui/button';
import { Checkbox } from '@/shared/components/ui/checkbox';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { demoAuthCredentials } from '@/shared/constants/demoAuthCredentials';
import { protectedRoutes } from '@/shared/constants/routes';
import { useAuthStore } from '@/shared/stores/authStore';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState(demoAuthCredentials.USER.EMAIL);
  const [password, setPassword] = useState(demoAuthCredentials.USER.PASSWORD);
  const login = useAuthStore((state) => state.login);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Demo credential check
    if (email === demoAuthCredentials.USER.EMAIL && password === demoAuthCredentials.USER.PASSWORD) {
      login(email);
      toast.success('Login successful!');
      router.push(protectedRoutes.PROFILE);
    } else {
      toast.error('Invalid credentials');
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-black tracking-tight text-zinc-900">Welcome back</h2>
        <p className="text-sm text-zinc-500">
          {"Don't have an account?"}{' '}
          <Link prefetch={false} href="/register" className="text-primary font-bold hover:underline">
            Create an account
          </Link>
        </p>
      </div>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            className="focus-visible:ring-primary h-11 shadow-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link prefetch={false} href="/forgot-password" className="text-primary text-xs font-bold hover:underline">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              className="focus-visible:ring-primary h-11 pr-10 shadow-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Checkbox id="remember" />
          <Label
            htmlFor="remember"
            className="cursor-pointer text-sm leading-none font-medium text-zinc-600 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Remember for 30 days
          </Label>
        </div>

        <Button
          type="submit"
          className="bg-primary hover:bg-primary/90 h-12 text-sm font-black tracking-widest text-white uppercase shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          Sign In
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-zinc-500">or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Button variant="outline" className="h-11 font-bold text-zinc-700 transition-colors hover:bg-zinc-50">
          <svg
            className="mr-2 h-4 w-4"
            aria-hidden="true"
            focusable="false"
            data-prefix="fab"
            data-icon="google"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 488 512"
          >
            <path
              fill="currentColor"
              d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
            ></path>
          </svg>
          Google
        </Button>
        <Button variant="outline" className="h-11 font-bold text-zinc-700 transition-colors hover:bg-zinc-50">
          <svg className="mr-2 h-4 w-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
          </svg>
          Facebook
        </Button>
        <Button variant="outline" className="h-11 font-bold text-zinc-700 transition-colors hover:bg-zinc-50">
          <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path d="M10 0C4.477 0 0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
          </svg>
          Apple
        </Button>
      </div>
    </div>
  );
}
