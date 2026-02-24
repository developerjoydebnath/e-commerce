'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import { ChevronDown, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function TopBar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [language, setLanguage] = useState('English');

  useEffect(() => {
    // Avoid synchronous setState warning
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-muted text-muted-foreground hidden border-b py-2 text-xs md:block">
      <div className="container mx-auto flex flex-col items-center justify-between gap-2 px-4 md:flex-row">
        <p>Notifications and offer details will be shown here...</p>
        <div className="flex items-center gap-4">
          <Link href="/order-tracking" className="hover:text-primary transition-colors">
            Order Tracking
          </Link>
          <span className="bg-border h-3 w-px"></span>
          <Link href="/support" className="hover:text-primary transition-colors">
            Support
          </Link>
          <span className="bg-border h-3 w-px"></span>
          <Link href="/faqs" className="hover:text-primary transition-colors">
            FAQs
          </Link>
          <span className="bg-border h-3 w-px"></span>

          <DropdownMenu>
            <DropdownMenuTrigger
              aria-label="Select language"
              className="hover:text-primary flex cursor-pointer items-center gap-1 ring-0 outline-none focus:ring-0 focus:outline-none"
            >
              <span>{language}</span>
              <ChevronDown size={12} />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setLanguage('English')}>English</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage('Spanish')}>Spanish</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage('French')}>French</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage('German')}>German</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <span className="bg-border h-3 w-px"></span>

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="hover:text-primary flex cursor-pointer items-center gap-1"
            aria-label="Toggle theme"
          >
            {mounted ? (
              theme === 'dark' ? (
                <Moon size={14} />
              ) : (
                <Sun size={14} />
              )
            ) : (
              <span className="bg-muted-foreground/20 block h-3.5 w-3.5 animate-pulse rounded-full"></span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
