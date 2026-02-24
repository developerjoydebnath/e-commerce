import { AuthCarousel } from '@/shared/components/auth/AuthCarousel';
import Link from 'next/link';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full flex-col lg:flex-row">
      {/* Left Section: Form */}
      <div className="flex w-full flex-col p-8 lg:w-1/2 lg:p-12 xl:p-24">
        {/* Header */}
        <header className="mb-12">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-primary flex h-10 w-10 items-center justify-center rounded-lg shadow-lg">
              <span className="text-xl font-black text-white">L</span>
            </div>
            <span className="text-2xl font-black tracking-tight text-zinc-900">Logo</span>
          </Link>
        </header>

        {/* Form Content */}
        <main className="flex flex-1 flex-col justify-center">
          <div className="mx-auto w-full max-w-md">{children}</div>
        </main>

        {/* Footer */}
        <footer className="mt-12 border-t pt-6">
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-zinc-500">
            <p>© 2024 All rights reserved. Made by Codenixx.com</p>
            <Link href="#" className="hover:text-primary transition-colors">
              Need help?
            </Link>
          </div>
        </footer>
      </div>

      {/* Right Section: Carousel */}
      <div className="hidden lg:block lg:w-1/2">
        <div className="bg-background sticky top-0 h-screen w-full p-4">
          <div className="h-full w-full overflow-hidden rounded-3xl">
            <AuthCarousel />
          </div>
        </div>
      </div>
    </div>
  );
}
