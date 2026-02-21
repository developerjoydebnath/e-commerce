import CategoryFiltersSidebar from '@/modules/category/components/CategoryFiltersSidebar';
import CategoryProductGrid from '@/modules/category/components/CategoryProductGrid';
import RelatedCategories from '@/modules/category/components/RelatedCategories';
import { ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  // We can format the slug "fashion" into "Fashion"
  const categoryName = slug.charAt(0).toUpperCase() + slug.slice(1);

  return (
    <div className="bg-background min-h-screen pb-12">
      <div className="container mx-auto px-4 py-8">
        {/* Featured Products */}
        {/* <CategoryFeaturedProducts /> */}

        {/* Top Controls / Breadcrumbs row */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <nav className="text-muted-foreground flex items-center text-sm font-medium">
            <Link href="/" className="hover:text-foreground">
              <Home className="h-4 w-4" />
            </Link>
            <ChevronRight className="mx-2 h-4 w-4" />
            <Link href="/" className="hover:text-foreground">
              Category Name
            </Link>
            <ChevronRight className="mx-2 h-4 w-4" />
            <span className="text-foreground">{categoryName}</span>
          </nav>
        </div>

        {/* Main 2-Column Layout */}
        <div className="flex flex-col gap-8 md:flex-row">
          {/* Left Sidebar: Filters */}
          <CategoryFiltersSidebar className="hidden md:block" />

          {/* Right Main Content: Grid + Pagination */}
          <CategoryProductGrid />
        </div>

        {/* Related Categories Footer */}
        <RelatedCategories />
      </div>
    </div>
  );
}
