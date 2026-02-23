import { Button } from '@/shared/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import { categories } from '@/shared/constants/mockData';
import useMediaQuery from '@/shared/hooks/useMediaQuery';
import { motion } from 'framer-motion';
import { ChevronDown, Menu } from 'lucide-react';
import Link from 'next/link';
import MobileMenu from './MobileMenu';

export default function Navigation({ isScrolled = false }: { isScrolled?: boolean }) {
  const isDesktop = useMediaQuery('(min-width: 768px)');

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

        {/* Mobile Category Label */}
        <div className="font-bold tracking-wide uppercase md:hidden">Menu</div>

        {/* Main Menu (Desktop) */}
        <motion.nav
          initial={false}
          animate={{ fontSize: !isDesktop || isScrolled ? '12px' : '15px' }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="hidden flex-1 items-center gap-8 md:flex"
        >
          <Link
            href="/products"
            className="flex items-center gap-1 font-medium uppercase transition-colors hover:text-white/80"
          >
            Products
            <ChevronDown className="h-4 w-4" />
          </Link>
          <Link
            href="/brands"
            className="flex items-center gap-1 font-medium uppercase transition-colors hover:text-white/80"
          >
            Brands
            <ChevronDown className="h-4 w-4" />
          </Link>
          <Link href="/blog" className="font-medium uppercase transition-colors hover:text-white/80">
            Blog
          </Link>
        </motion.nav>
      </div>
    </motion.div>
  );
}
