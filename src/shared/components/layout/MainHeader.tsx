'use client';

import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { protectedRoutes, publicRoutes } from '@/shared/constants/routes';
import useMediaQuery from '@/shared/hooks/useMediaQuery';
import { useAuthStore } from '@/shared/stores/authStore';
import { motion } from 'framer-motion';
import { Search, User } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import CartSidebar from './CartSidebar';
import SearchDialog from './SearchDialog';
import WishlistSidebar from './WishlistSidebar';

export default function MainHeader({ isScrolled = false }: { isScrolled?: boolean }) {
  const [openSearch, setOpenSearch] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <motion.div
      initial={false}
      animate={{
        paddingTop: !isDesktop || isScrolled ? '0.5rem' : '1.5rem',
        paddingBottom: !isDesktop || isScrolled ? '0.5rem' : '1.5rem',
      }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="bg-background border-b"
    >
      <div className="container mx-auto grid grid-cols-2 items-center gap-4 px-4 lg:grid-cols-12">
        {/* Logo */}
        <div className="order-1 col-span-1 lg:order-1 lg:col-span-3 xl:col-span-4">
          <Link prefetch={false} href="/" className="text-primary text-3xl font-bold tracking-tight">
            LOGO
          </Link>
        </div>

        {/* Search Bar (Hidden on Mobile, Visible on Desktop) */}
        <div
          className="order-2 col-span-6 hidden w-full cursor-pointer lg:col-span-6 lg:block xl:col-span-4"
          onClick={() => setOpenSearch(true)}
        >
          <div className="focus-within:ring-primary/20 pointer-events-none flex items-center rounded-full border py-1 pr-1 pl-4 transition-shadow focus-within:ring-2">
            <Input
              type="text"
              placeholder="Search..."
              aria-label="Search products"
              className="h-auto flex-1 border-none px-2 shadow-none focus-visible:ring-0"
              readOnly
            />
            <Button className="bg-primary/20 text-foreground hover:bg-primary/30 rounded-full px-4 text-xs shadow-none sm:px-8 sm:text-sm">
              Search
            </Button>
          </div>
        </div>

        {/* Actions */}
        <div className="order-2 col-span-1 flex items-center justify-end gap-3 sm:gap-6 lg:order-3 lg:col-span-3 xl:col-span-4">
          {/* Mobile Search Icon */}
          <button
            onClick={() => setOpenSearch(true)}
            aria-label="Open search dialog"
            className="group flex items-center gap-3 lg:hidden"
          >
            <div className="bg-muted group-hover:bg-primary/10 rounded-full p-2 transition-colors">
              <Search className="text-muted-foreground group-hover:text-primary h-5 w-5 transition-colors" />
            </div>
          </button>

          <Link
            prefetch={false}
            href={isAuthenticated ? protectedRoutes.PROFILE : publicRoutes.LOGIN}
            className="group flex items-center gap-3"
          >
            <div className="bg-muted group-hover:bg-primary/10 rounded-full p-2 transition-colors">
              <User className="text-muted-foreground group-hover:text-primary h-5 w-5 transition-colors" />
            </div>
            <div className="hidden xl:block">
              <p className="text-muted-foreground text-xs">{isAuthenticated ? 'Profile' : 'Login'}</p>
              <p className="text-sm font-medium">Account</p>
            </div>
          </Link>

          <WishlistSidebar />
          <CartSidebar />
        </div>
      </div>
      <SearchDialog open={openSearch} setOpen={setOpenSearch} />
    </motion.div>
  );
}
