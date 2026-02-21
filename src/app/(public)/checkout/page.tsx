import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/shared/components/ui/breadcrumb';
import { Button } from '@/shared/components/ui/button';
import Link from 'next/link';

export default function CheckoutPage() {
  return (
    <div className="bg-background min-h-screen pt-8 pb-20 sm:pt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="mb-4 text-2xl font-bold tracking-tight md:text-3xl">Checkout</h1>

        {/* Breadcrumb */}
        <Breadcrumb className="mb-8 hidden sm:flex">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/cart">My Cart</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Checkout</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-20 text-center">
          <div className="bg-muted mb-4 flex h-20 w-20 items-center justify-center rounded-full text-3xl">💳</div>
          <h2 className="text-xl font-bold">Checkout Integration Coming Soon</h2>
          <p className="text-muted-foreground mt-2 mb-6 max-w-md">
            This checkout page is acting as a placeholder while the payment gateway architecture is finalized.
          </p>
          <Link href="/cart">
            <Button variant="outline">Return to Cart</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
