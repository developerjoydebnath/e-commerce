import ProductGallery from '@/modules/product/components/ProductGallery';
import ProductInfo from '@/modules/product/components/ProductInfo';
import ProductQA from '@/modules/product/components/ProductQA';
import ProductReviews from '@/modules/product/components/ProductReviews';
import ProductTabs from '@/modules/product/components/ProductTabs';
import RelatedProducts from '@/modules/product/components/RelatedProducts';
import { products } from '@/shared/constants/mockData';
import { ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  // Find product by slug from mockData, fallback to first product if not found
  const productData = products.find((p) => p.slug === slug) || products[0];

  const mockProduct = {
    ...productData,
    reviewsCount: productData.reviews.length || productData.ratings?.total || 150, // Moved to a separate var to preserve the original `reviews: Review[]`
    categoryNames: productData.categories.map((c) => c.name), // Moved to separate var
    availability: productData.stockStatus,
    ratingScore: productData.rating || productData.ratings?.rating || 4.5, // Moved to separate var
  };

  return (
    <div className="bg-background min-h-screen pb-12">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb Navigation */}
        <div className="mb-8">
          <nav className="text-muted-foreground flex items-center text-sm font-medium">
            <Link href="/" className="hover:text-foreground">
              <Home className="h-4 w-4" />
            </Link>
            <ChevronRight className="mx-2 h-4 w-4" />
            <Link href="/categories/mens-fashion" className="hover:text-foreground">
              Men&apos;s Fashion
            </Link>
            <ChevronRight className="mx-2 h-4 w-4" />
            <span className="text-foreground">{mockProduct.name}</span>
          </nav>
        </div>

        {/* Top Section: Gallery & Info */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: Product Gallery */}
          <div className="w-full">
            <ProductGallery images={mockProduct.images} />
          </div>

          {/* Right: Product Info */}
          <div className="w-full">
            <ProductInfo
              product={{
                ...mockProduct,
                reviews: mockProduct.reviewsCount,
                rating: mockProduct.ratingScore,
                categories: mockProduct.categoryNames,
              }}
            />
          </div>
        </div>

        {/* Middle Section: Details Tabs */}
        <div className="mt-16">
          <ProductTabs description={mockProduct.description} specifications={mockProduct.specifications} />
        </div>

        {/* Reviews Section */}
        <div className="mt-20">
          <ProductReviews product={mockProduct} />
        </div>

        {/* QA Section */}
        <div className="mt-20">
          <ProductQA product={mockProduct} />
        </div>

        {/* Related Products Section */}
        <div className="mt-24 mb-10">
          <RelatedProducts />
        </div>
      </div>
    </div>
  );
}
