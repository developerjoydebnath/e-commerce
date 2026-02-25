'use client';

import { Button } from '@/shared/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import { categories } from '@/shared/constants/mockData';
import useMediaQuery from '@/shared/hooks/useMediaQuery';
import { cn } from '@/shared/lib/utils';
import { motion } from 'framer-motion';
import { ChevronDown, CircleQuestionMark, Headset, Languages, Menu, Moon, Sun, Truck } from 'lucide-react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import MobileMenu from './MobileMenu';

export default function Navigation({ isScrolled = false }: { isScrolled?: boolean }) {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [language, setLanguage] = useState('English');

  useEffect(() => {
    // Avoid synchronous setState warning
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={false}
      animate={{
        height: !isDesktop || isScrolled ? '2.5rem' : '3.5rem',
      }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="bg-primary text-primary-foreground"
    >
      <div className="container mx-auto flex h-full items-center justify-between px-4 md:justify-start">
        {/* Categories Dropdown (Desktop) */}
        <div className="hidden h-full md:block">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                aria-label="Open categories menu"
                className="bg-primary-foreground/10 hover:bg-primary-foreground/20 hover:text-primary-foreground mr-8 flex h-full items-center gap-2 rounded-none px-6 font-semibold tracking-wide uppercase"
              >
                <Menu className="h-5 w-5" />
                <motion.span
                  initial={false}
                  animate={{ fontSize: !isDesktop || isScrolled ? '12px' : '15px' }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  Category
                </motion.span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start">
              {categories.map((category) => (
                <DropdownMenuItem key={category.id} className="py-2.5 text-[15px]">
                  {category.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Mobile Menu Trigger */}
        <div className="md:hidden">
          <MobileMenu />
        </div>

        {/* Main Menu (Desktop) */}
        <motion.nav
          initial={false}
          animate={{ fontSize: !isDesktop || isScrolled ? '12px' : '15px' }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="flex flex-1 items-center justify-end gap-8 md:justify-between"
        >
          <div className="hidden flex-1 items-center gap-8 md:flex">
            <Link
              prefetch={false}
              href="/products"
              className="flex items-center gap-1 font-medium uppercase transition-colors hover:text-white/80"
            >
              Products
              <ChevronDown className="h-4 w-4" />
            </Link>
            <Link
              prefetch={false}
              href="/brands"
              className="flex items-center gap-1 font-medium uppercase transition-colors hover:text-white/80"
            >
              Brands
              <ChevronDown className="h-4 w-4" />
            </Link>
            <Link prefetch={false} href="/blog" className="font-medium uppercase transition-colors hover:text-white/80">
              Blog
            </Link>
          </div>

          <div className={cn('flex items-center gap-4', isScrolled ? 'md:flex' : 'md:hidden')}>
            <Tooltip>
              <TooltipTrigger>
                <Link
                  prefetch={false}
                  href="/order-tracking"
                  className="flex items-center gap-1 font-medium uppercase transition-colors hover:text-white/80"
                >
                  <Truck className="h-4 w-4" />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Order Tracking</p>
              </TooltipContent>
            </Tooltip>

            <span className="h-3 w-px bg-white/60"></span>

            <Tooltip>
              <TooltipTrigger>
                <Link
                  prefetch={false}
                  href="/support"
                  className="flex items-center gap-1 font-medium uppercase transition-colors hover:text-white/80"
                >
                  <Headset className="h-4 w-4" />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Support</p>
              </TooltipContent>
            </Tooltip>

            <span className="h-3 w-px bg-white/60"></span>

            <Tooltip>
              <TooltipTrigger>
                <Link
                  prefetch={false}
                  href="/faqs"
                  className="font-medium uppercase transition-colors hover:text-white/80"
                >
                  <CircleQuestionMark className="h-4 w-4" />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>FAQs</p>
              </TooltipContent>
            </Tooltip>

            <span className="h-3 w-px bg-white/60"></span>

            <DropdownMenu>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenuTrigger
                    aria-label="Select language"
                    className="flex cursor-pointer items-center gap-1 ring-0 outline-none hover:text-white/80 focus:ring-0 focus:outline-none"
                  >
                    <Languages size={16} />
                    <ChevronDown size={12} />
                  </DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Language</p>
                </TooltipContent>
              </Tooltip>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLanguage('English')}>English</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('Spanish')}>Spanish</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('French')}>French</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('German')}>German</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <span className="h-3 w-px bg-white/60"></span>

            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="flex cursor-pointer items-center gap-1 hover:text-white/80"
                  aria-label="Toggle theme"
                >
                  {mounted ? (
                    theme === 'dark' ? (
                      <Moon size={16} />
                    ) : (
                      <Sun size={16} />
                    )
                  ) : (
                    <span className="bg-muted-foreground/20 block h-3.5 w-3.5 animate-pulse rounded-full"></span>
                  )}
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Theme</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </motion.nav>
      </div>
    </motion.div>
  );
}
