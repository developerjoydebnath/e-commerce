import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/shared/components/ui/accordion';
import { Button } from '@/shared/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/shared/components/ui/sheet';
import { Menu } from 'lucide-react';
import Link from 'next/link';

export default function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground md:hidden"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle className="text-primary text-left text-xl font-bold">MENU</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-4 px-4">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="category">
              <AccordionTrigger className="hover:no-underline">All Categories</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-2 pl-4">
                  <Link prefetch={false} href="/category/electronics" className="hover:text-primary py-2">
                    Electronics
                  </Link>
                  <Link prefetch={false} href="/category/fashion" className="hover:text-primary py-2">
                    Fashion
                  </Link>
                  <Link prefetch={false} href="/category/home" className="hover:text-primary py-2">
                    Home & Garden
                  </Link>
                  <Link prefetch={false} href="/category/sports" className="hover:text-primary py-2">
                    Sports
                  </Link>
                  <Link prefetch={false} href="/category/books" className="hover:text-primary py-2">
                    Books
                  </Link>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Link prefetch={false} href="/products" className="border-b py-2 text-sm font-medium">
            Products
          </Link>
          <Link prefetch={false} href="/brands" className="border-b py-2 text-sm font-medium">
            Brands
          </Link>
          <Link prefetch={false} href="/blog" className="border-b py-2 text-sm font-medium">
            Blog
          </Link>
          <Link prefetch={false} href="/about-us" className="border-b py-2 text-sm font-medium">
            About Us
          </Link>
          <Link prefetch={false} href="/contact-us" className="border-b py-2 text-sm font-medium">
            Contact Us
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}
