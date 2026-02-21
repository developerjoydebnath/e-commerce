'use client';

import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/lib/utils';
import { useCartStore } from '@/shared/store/cartStore';
import { useWishlistStore } from '@/shared/store/wishlistStore';
import { Heart, Minus, Plus, Star } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ProductInfoProps {
  product: {
    id: number | string;
    name: string;
    price: number;
    originalPrice?: number;
    rating: number;
    reviews: number;
    description: string;
    colors: string[];
    sizes: string[];
    sku: string;
    availability: string;
    categories: string[];
    tags: string[];
    images: string[];
    slug?: string;
  };
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const { addItem: addCartItem } = useCartStore();
  const { addItem: addWishlistItem, removeItem: removeWishlistItem, isInWishlist } = useWishlistStore();
  const [mounted, setMounted] = useState(false);

  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const handleDecreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    addCartItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images?.[0] || '',
      quantity,
      slug: product.slug || String(product.id),
    });
  };

  const isWished = mounted && isInWishlist(product.id);
  const toggleWishlist = () => {
    if (isWished) {
      removeWishlistItem(product.id);
    } else {
      addWishlistItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images?.[0] || '',
        slug: product.slug || String(product.id),
      });
    }
  };

  return (
    <div className="bg-background flex flex-col gap-6 lg:gap-8">
      {/* Title & Ratings */}
      <div className="flex flex-col gap-2">
        <h1 className="text-foreground text-3xl font-bold tracking-tight md:text-4xl">{product.name}</h1>
        <div className="mt-2 flex items-center gap-4 text-sm">
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  'h-4 w-4',
                  i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground/30'
                )}
              />
            ))}
            <span className="ml-2 font-medium">{product.rating.toFixed(1)}</span>
          </div>
          <span className="text-muted-foreground">({product.reviews} Reviews)</span>
          <span className="ml-2">|</span>
          <span className="font-medium text-green-600">{product.availability}</span>
        </div>
      </div>

      {/* Price */}
      <div className="flex items-center gap-4">
        <span className="text-foreground text-3xl font-bold">${product.price.toFixed(2)}</span>
        {product.originalPrice && (
          <span className="text-muted-foreground text-lg line-through">${product.originalPrice.toFixed(2)}</span>
        )}
        {product.originalPrice && (
          <span className="rounded-md bg-red-100 px-2 py-1 text-xs font-bold text-red-600 dark:bg-red-900/30 dark:text-red-400">
            {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
          </span>
        )}
      </div>

      <p className="text-muted-foreground text-sm leading-relaxed lg:text-base">{product.description}</p>

      {/* Variations: Color */}
      {product.colors && product.colors.length > 0 && (
        <div className="flex flex-col gap-3">
          <span className="text-foreground font-semibold">Colors</span>
          <div className="flex items-center gap-3">
            {product.colors.map((color) => (
              <button
                key={color}
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-full transition-all focus:outline-none',
                  selectedColor === color
                    ? 'ring-primary ring-offset-background ring-2 ring-offset-2'
                    : 'ring-muted-foreground/30 hover:ring-muted-foreground/50 ring-offset-background ring-1 ring-offset-2'
                )}
                onClick={() => setSelectedColor(color)}
                title={color}
              >
                <span
                  className="block h-full w-full rounded-full border border-black/10 dark:border-white/10"
                  style={{ backgroundColor: color.toLowerCase() }}
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Variations: Size */}
      {product.sizes && product.sizes.length > 0 && (
        <div className="flex flex-col gap-3">
          <span className="text-foreground font-semibold">Sizes</span>
          <div className="flex flex-wrap items-center gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                className={cn(
                  'flex h-10 min-w-12 items-center justify-center rounded-md border px-3 text-sm font-medium transition-all',
                  selectedSize === size
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-background hover:bg-muted text-foreground border-input'
                )}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity & Actions */}
      <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-end">
        <div className="flex flex-col gap-2">
          <span className="text-foreground hidden font-semibold sm:block">Quantity</span>
          <div className="border-input flex h-12 w-[120px] items-center justify-between rounded-md border px-3">
            <button
              onClick={handleDecreaseQuantity}
              className="text-muted-foreground hover:text-foreground transition-colors"
              disabled={quantity <= 1}
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="font-medium">{quantity}</span>
            <button
              onClick={handleIncreaseQuantity}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="flex h-full flex-1 items-end gap-3 pt-1 pb-0 sm:pt-0">
          <Button className="h-12 flex-1 rounded-md text-base" variant="default">
            Buy Now
          </Button>
          <Button
            className="bg-muted text-foreground hover:bg-muted/80 h-12 flex-1 rounded-md border text-base"
            variant="outline"
            onClick={handleAddToCart}
          >
            Add To Cart
          </Button>
          <Button
            variant="outline"
            size="icon"
            className={cn(
              'h-12 w-12 shrink-0 rounded-md border transition-colors',
              isWished ? 'border-red-200 bg-red-50 text-red-500 hover:bg-red-100' : ''
            )}
            onClick={toggleWishlist}
          >
            <Heart className={cn('h-5 w-5', isWished && 'fill-current text-red-500')} />
          </Button>
        </div>
      </div>

      {/* Metadata */}
      <div className="text-muted-foreground mt-4 flex flex-col gap-2 border-t pt-6 text-sm">
        <p>
          <span className="text-foreground font-semibold">SKU:</span> {product.sku}
        </p>
        <p>
          <span className="text-foreground font-semibold">Categories:</span> {product.categories.join(', ')}
        </p>
        <p>
          <span className="text-foreground font-semibold">Tags:</span> {product.tags.join(', ')}
        </p>
      </div>

      {/* Delivery & Warranty Blocks (as seen in screenshot) */}
      {/* <div className="mt-6 flex flex-col gap-6 sm:flex-row"> */}
      {/* Delivery Info */}
      {/* <div className="bg-muted/30 flex-1 rounded-lg border p-5">
          <h3 className="text-foreground mb-4 font-semibold">Delivery Info</h3>
          <div className="flex flex-col gap-4 text-sm">
            <div className="flex items-start gap-3">
              <MapPin className="text-muted-foreground mt-0.5 h-5 w-5 shrink-0" />
              <div className="flex flex-col">
                <span className="text-foreground font-medium">Delivery Location</span>
                <p className="text-muted-foreground mt-1">123, Main Street, New York, USA</p>
                <button className="text-primary mt-1 self-start text-xs font-semibold hover:underline">Change</button>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Truck className="text-muted-foreground mt-0.5 h-5 w-5 shrink-0" />
              <div className="flex flex-col">
                <span className="text-foreground font-medium">Standard Delivery</span>
                <p className="text-muted-foreground mt-1">Guaranteed delivery within 4 to 7 days.</p>
              </div>
            </div>
          </div>
        </div> */}

      {/* Return & Warranty */}
      {/* <div className="bg-muted/30 flex-1 rounded-lg border p-5">
          <h3 className="text-foreground mb-4 font-semibold">Return & Warranty</h3>
          <div className="flex flex-col gap-3 text-sm">
            <div className="flex items-center gap-3">
              <RefreshCw className="text-muted-foreground h-4 w-4 shrink-0" />
              <span className="text-muted-foreground font-medium">14 Days Easy Return</span>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="text-muted-foreground h-4 w-4 shrink-0" />
              <span className="text-muted-foreground font-medium">Warranty Not Available</span>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="text-muted-foreground h-4 w-4 shrink-0" />
              <span className="text-muted-foreground font-medium">100% Secured Payment</span>
            </div>
          </div>
        </div> */}
      {/* </div> */}
    </div>
  );
}
