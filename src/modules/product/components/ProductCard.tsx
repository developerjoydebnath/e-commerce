'use client';

import { Button } from '@/shared/components/ui/button';
import { Product } from '@/shared/constants/mockData';
import { cn } from '@/shared/lib/utils';
import { useCartStore } from '@/shared/store/cartStore';
import { useCompareStore } from '@/shared/store/compareStore';
import { useWishlistStore } from '@/shared/store/wishlistStore';
import { Handbag, Heart, Repeat, ShoppingCart, Star, Zap } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import QuickAddModal from './modals/QuickAddModal';

import { Brand, Review } from '@/shared/constants/mockData';

interface ProductCardProps extends Omit<Product, 'reviews' | 'rating' | 'brand'> {
  reviews?: Review[] | number;
  rating?: number | { rating: number };
  brand?: Brand | string;
}

export default function ProductCard(props: ProductCardProps) {
  const { id, name, price, originalPrice, images, rating, reviews, discount, brand, slug, hasVariants } = props;
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  const addItemToCart = useCartStore((state) => state.addItem);
  const setCartOpen = useCartStore((state) => state.setIsOpen);

  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);

  const isInWishlist = useWishlistStore((state) => state.isInWishlist(id));
  const addWishlistItem = useWishlistStore((state) => state.addItem);
  const removeWishlistItem = useWishlistStore((state) => state.removeItem);

  const compareItems = useCompareStore((state) => state.items);
  const toggleCompareItem = useCompareStore((state) => state.toggleItem);
  const isInCompare = compareItems.some((i) => i.id === id);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const handleAddToCart = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (hasVariants) {
      setIsQuickAddOpen(true);
      return;
    }

    addItemToCart({
      id,
      name,
      price,
      image: images[0],
      brand: typeof brand === 'string' ? brand : brand?.name || 'Generic',
      slug: slug || String(id),
    });
    setCartOpen(true);
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (hasVariants) {
      setIsQuickAddOpen(true);
      return;
    }

    addItemToCart({
      id,
      name,
      price,
      image: images[0],
      brand: typeof brand === 'string' ? brand : brand?.name || 'Generic',
      slug: slug || String(id),
    });
    router.push('/checkout');
  };

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInWishlist) {
      removeWishlistItem(id);
    } else {
      addWishlistItem({
        id,
        name,
        price,
        image: images[0],
        brand: typeof brand === 'string' ? brand : brand?.name || 'Generic',
        slug: slug || String(id),
      });
    }
  };

  return (
    <div
      onClick={() => router.push(`/products/${slug || id}`)}
      className="group bg-card relative flex cursor-pointer flex-col overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-md"
    >
      {/* Badges & Actions */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
        {discount && (
          <div className="bg-primary/90 text-primary-foreground flex items-center gap-1 rounded px-2 py-1 text-[10px] font-bold uppercase shadow-sm backdrop-blur-sm">
            <Zap className="h-3 w-3" />
            {discount}
          </div>
        )}
      </div>

      <div className="absolute top-3 right-3 z-10 flex flex-col gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <Button
          onClick={toggleWishlist}
          aria-label={mounted && isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          className={cn(
            'flex h-8 w-8 items-center justify-center rounded-full shadow-sm backdrop-blur-sm transition-colors',
            mounted && isInWishlist
              ? 'bg-red-50 text-red-500 hover:bg-red-100'
              : 'bg-background/80 hover:bg-primary hover:text-primary-foreground text-black'
          )}
        >
          <Heart className={cn('h-4 w-4', mounted && isInWishlist && 'fill-current')} />
        </Button>
        <Button
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            toggleCompareItem({
              id,
              name,
              price,
              originalPrice,
              rating: typeof rating === 'number' ? rating : (rating as { rating: number })?.rating || 0,
              reviews: Array.isArray(reviews) ? reviews.length : (reviews as unknown as number) || 0,
              image: images[0],
              brand: typeof brand === 'string' ? brand : brand?.name,
              slug,
            });
          }}
          aria-label={isInCompare ? 'Remove from compare' : 'Add to compare'}
          className={cn(
            'flex h-8 w-8 items-center justify-center rounded-full shadow-sm backdrop-blur-sm transition-colors',
            mounted && isInCompare
              ? 'bg-blue-50 text-blue-600 hover:bg-blue-100'
              : 'bg-background/80 hover:bg-primary hover:text-primary-foreground text-black'
          )}
        >
          <Repeat className="h-4 w-4" />
        </Button>
      </div>

      {/* Product Image wrapped in a Link */}
      <div className="bg-muted relative block aspect-4/3 w-full overflow-hidden">
        <div className="relative h-full w-full">
          <Image
            src={images[0]}
            alt={name}
            height={300}
            width={300}
            className="aspect-4/3 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </div>

      {/* Content wrapped in a link except buttons */}
      <div className="flex flex-1 flex-col p-4">
        <div className="group/content flex flex-1 flex-col">
          <h3 className="text-foreground group-hover/content:text-primary line-clamp-1 text-sm leading-tight font-medium transition-colors">
            {name}
          </h3>

          <div className="mt-2 flex items-center gap-1.5">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    'h-3 w-3',
                    i < Math.floor(typeof rating === 'number' ? rating : (rating as any)?.rating || 0)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-muted-foreground/30'
                  )}
                />
              ))}
            </div>
            <span className="text-muted-foreground text-[11px]">
              ({typeof rating === 'number' ? rating : (rating as any)?.rating || 0}){' '}
              {Array.isArray(reviews) ? reviews.length : reviews} Reviews
            </span>
          </div>

          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-primary text-base font-bold">${price.toFixed(2)}</span>
            {originalPrice && (
              <span className="text-muted-foreground text-xs line-through">${originalPrice.toFixed(2)}</span>
            )}
          </div>
        </div>

        <div className="relative z-20 mt-auto flex gap-2 pt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={handleBuyNow}
            className="hover:bg-primary hover:text-primary-foreground h-9 w-full flex-1 rounded-lg text-xs font-semibold transition-all"
          >
            <Handbag className="h-3.5 w-3.5" />
            Buy Now
          </Button>
          <Button size="sm" className="group/btn h-9 flex-1 rounded-lg text-xs font-semibold" onClick={handleAddToCart}>
            <ShoppingCart className="h-3.5 w-3.5" />
            Add
          </Button>
        </div>
      </div>

      <div
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
      >
        <QuickAddModal
          isOpen={isQuickAddOpen}
          onOpenChange={setIsQuickAddOpen}
          product={
            {
              ...props,
              rating: typeof rating === 'number' ? rating : (rating as { rating: number })?.rating || 0,
              reviews: Array.isArray(reviews) ? reviews : [],
            } as Product
          }
        />
      </div>
    </div>
  );
}
