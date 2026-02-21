'use client';

import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/lib/utils';
import { useCartStore } from '@/shared/store/cartStore';
import { useWishlistStore } from '@/shared/store/wishlistStore';
import { Eye, Heart, Repeat, ShoppingCart, Star, Zap } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface ProductCardProps {
  id: string | number;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  images: string[];
  discount?: string;
  brand?: string;
  slug?: string;
}

export default function ProductCard({
  id,
  name,
  price,
  originalPrice,
  rating,
  reviews,
  images,
  discount,
  brand,
  slug,
}: ProductCardProps) {
  const [mounted, setMounted] = useState(false);

  const addItemToCart = useCartStore((state) => state.addItem);
  const setCartOpen = useCartStore((state) => state.setIsOpen);

  const isInWishlist = useWishlistStore((state) => state.isInWishlist(id));
  const addWishlistItem = useWishlistStore((state) => state.addItem);
  const removeWishlistItem = useWishlistStore((state) => state.removeItem);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const handleAddToCart = () => {
    addItemToCart({
      id,
      name,
      price,
      image: images[0],
      brand: brand || 'Generic',
      slug: slug || String(id),
    });
    setCartOpen(true);
  };

  const toggleWishlist = () => {
    if (isInWishlist) {
      removeWishlistItem(id);
    } else {
      addWishlistItem({
        id,
        name,
        price,
        image: images[0],
        brand: brand || 'Generic',
        slug: slug || String(id),
      });
    }
  };

  return (
    <div className="group bg-card relative flex flex-col overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-md">
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
          className={cn(
            'flex h-8 w-8 items-center justify-center rounded-full shadow-sm backdrop-blur-sm transition-colors',
            mounted && isInWishlist
              ? 'bg-red-50 text-red-500 hover:bg-red-100'
              : 'bg-background/80 hover:bg-primary hover:text-primary-foreground text-black'
          )}
        >
          <Heart className={cn('h-4 w-4', mounted && isInWishlist && 'fill-current')} />
        </Button>
        <Button className="bg-background/80 hover:bg-primary hover:text-primary-foreground flex h-8 w-8 items-center justify-center rounded-full text-black shadow-sm backdrop-blur-sm transition-colors">
          <Repeat className="h-4 w-4" />
        </Button>
      </div>

      {/* Product Image */}
      <div className="bg-muted relative aspect-4/3 w-full overflow-hidden">
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

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-foreground hover:text-primary line-clamp-1 text-sm leading-tight font-medium transition-colors">
          {name}
        </h3>

        <div className="mt-2 flex items-center gap-1.5">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  'h-3 w-3',
                  i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground/30'
                )}
              />
            ))}
          </div>
          <span className="text-muted-foreground text-[11px]">
            ({rating}) {reviews} Reviews
          </span>
        </div>

        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-primary text-base font-bold">${price.toFixed(2)}</span>
          {originalPrice && (
            <span className="text-muted-foreground text-xs line-through">${originalPrice.toFixed(2)}</span>
          )}
        </div>

        <div className="mt-auto flex gap-2 pt-4">
          <Link prefetch={false} className="w-full flex-1" href={`/products/${slug || id}`}>
            <Button
              variant="outline"
              size="sm"
              className="hover:bg-primary hover:text-primary-foreground h-9 w-full flex-1 rounded-lg text-xs font-semibold transition-all"
            >
              <Eye className="h-3.5 w-3.5" />
              Details
            </Button>
          </Link>
          <Button size="sm" className="group/btn h-9 flex-1 rounded-lg text-xs font-semibold" onClick={handleAddToCart}>
            <ShoppingCart className="h-3.5 w-3.5" />
            Add
          </Button>
        </div>
      </div>
    </div>
  );
}
