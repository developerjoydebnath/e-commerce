'use client';

import { Button } from '@/shared/components/ui/button';
import { Product } from '@/shared/constants/mockData';
import { cn } from '@/shared/lib/utils';
import { useCartStore } from '@/shared/store/cartStore';
import { useWishlistStore } from '@/shared/store/wishlistStore';
import { Heart, Minus, Plus, Star } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import SizeGuideModal from './modals/SizeGuideModal';

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const { addItem: addCartItem, setIsOpen: setCartOpen } = useCartStore();
  const { addItem: addWishlistItem, removeItem: removeWishlistItem, isInWishlist } = useWishlistStore();
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedAttributes, setSelectedAttributes] = useState<Record<string, string>>({});
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  useEffect(() => {
    // Initialize selected attributes with first values
    const initialAttribs: Record<string, string> = {};
    product.attributes.forEach((attr) => {
      initialAttribs[attr.name.toLowerCase()] = attr.values[0];
    });

    // Defer state updates to avoid synchronous setState warning
    const timer = setTimeout(() => {
      setSelectedAttributes(initialAttribs);
      setMounted(true);
    }, 0);

    return () => clearTimeout(timer);
  }, [product]);

  // Find matching variant
  const selectedVariant = useMemo(() => {
    return product.variants.find((variant) => {
      return Object.entries(selectedAttributes).every(([key, value]) => {
        return variant.attributes[key] === value;
      });
    });
  }, [product.variants, selectedAttributes]);

  const currentPrice = selectedVariant ? selectedVariant.price : product.price;
  const currentOriginalPrice = selectedVariant ? selectedVariant.originalPrice : product.originalPrice;
  const currentImage = selectedVariant ? selectedVariant.image : product.images?.[0] || '';

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
      price: currentPrice,
      originalPrice: currentOriginalPrice,
      image: currentImage,
      quantity,
      slug: product.slug || String(product.id),
      attributes: selectedAttributes,
      brand: product.brand.name,
    });
    setCartOpen(true);
  };

  const handleBuyNow = () => {
    addCartItem({
      id: product.id,
      name: product.name,
      price: currentPrice,
      originalPrice: currentOriginalPrice,
      image: currentImage,
      quantity,
      slug: product.slug || String(product.id),
      attributes: selectedAttributes,
      brand: product.brand.name,
    });
    router.push('/checkout');
  };

  const isWished = mounted && isInWishlist(product.id);
  const toggleWishlist = () => {
    if (isWished) {
      removeWishlistItem(product.id);
    } else {
      addWishlistItem({
        id: product.id,
        name: product.name,
        price: currentPrice,
        image: currentImage,
        slug: product.slug || String(product.id),
      });
    }
  };

  const ratingValue = typeof product.rating === 'number' ? product.rating : (product as any).ratings?.rating || 0;
  const reviewsCount = Array.isArray(product.reviews) ? product.reviews.length : product.reviews;

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
                  i < Math.floor(ratingValue) ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground/30'
                )}
              />
            ))}
            <span className="ml-2 font-medium">{ratingValue.toFixed(1)}</span>
          </div>
          <span className="text-muted-foreground">({reviewsCount} Reviews)</span>
          <span className="ml-2">|</span>
          <span className="font-medium text-green-600">
            {selectedVariant ? (selectedVariant.inStock ? 'In Stock' : 'Out of Stock') : 'In Stock'}
          </span>
        </div>
      </div>

      {/* Price */}
      <div className="flex items-center gap-4">
        <span className="text-foreground text-3xl font-bold">${currentPrice.toFixed(2)}</span>
        {currentOriginalPrice && (
          <span className="text-muted-foreground text-lg line-through">${currentOriginalPrice.toFixed(2)}</span>
        )}
        {currentOriginalPrice && (
          <span className="rounded-md bg-red-100 px-2 py-1 text-xs font-bold text-red-600 dark:bg-red-900/30 dark:text-red-400">
            {Math.round(((currentOriginalPrice - currentPrice) / currentOriginalPrice) * 100)}% OFF
          </span>
        )}
      </div>

      <p className="text-muted-foreground text-sm leading-relaxed lg:text-base">{product.description}</p>

      {/* Variations */}
      {product.attributes.map((attr) => (
        <div key={attr.name} className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-foreground text-xs font-semibold tracking-wider uppercase">{attr.name}</span>
            {attr.name.toLowerCase().includes('size') &&
              product.categories.some((c) =>
                ['men-s-fashion', 'women-s-fashion', 'sports', 'shoes'].includes(c.slug)
              ) && (
                <button
                  onClick={() => setShowSizeGuide(true)}
                  className="hover:text-primary text-xs font-bold underline underline-offset-4 transition-colors"
                  type="button"
                >
                  Size Guide
                </button>
              )}
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {attr.values.map((value) => {
              const isSelected = selectedAttributes[attr.name.toLowerCase()] === value;
              const isColor = attr.name.toLowerCase().includes('color');
              const attrKey = attr.name.toLowerCase();

              // Find matching variant image for the color swatch
              let swatchImage = '';
              if (isColor) {
                const matchingVariant = product.variants.find((v) => v.attributes[attrKey] === value);
                swatchImage = matchingVariant?.image || product.images?.[0] || '';
              }

              return (
                <button
                  key={value}
                  type="button"
                  aria-label={`Select ${attr.name}: ${value}`}
                  className={cn(
                    'relative flex items-center justify-center overflow-hidden transition-all focus:outline-none',
                    isColor
                      ? 'h-12 w-12 rounded-md border-2'
                      : 'h-10 min-w-12 rounded-md border px-3 text-sm font-medium',
                    isSelected
                      ? isColor
                        ? 'border-primary ring-primary/20 ring-2 ring-offset-1'
                        : 'bg-primary text-primary-foreground border-primary shadow-sm'
                      : isColor
                        ? 'hover:border-muted-foreground/30 border-transparent'
                        : 'bg-background hover:bg-muted text-foreground border-input'
                  )}
                  onClick={() => setSelectedAttributes((prev) => ({ ...prev, [attr.name.toLowerCase()]: value }))}
                  title={value}
                >
                  {isColor ? (
                    <div className="relative h-full w-full">
                      <Image src={swatchImage} alt={value} fill className="object-cover" />
                    </div>
                  ) : (
                    value
                  )}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {/* Quantity & Actions */}
      <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-end">
        <div className="flex flex-col gap-2">
          <span className="text-foreground hidden text-xs font-semibold tracking-wider uppercase sm:block">
            Quantity
          </span>
          <div className="border-input bg-muted/20 flex h-12 w-[120px] items-center justify-between rounded-md border px-3">
            <button
              onClick={handleDecreaseQuantity}
              aria-label="Decrease quantity"
              className="text-muted-foreground hover:text-foreground transition-colors"
              disabled={quantity <= 1}
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="font-bold">{quantity}</span>
            <button
              onClick={handleIncreaseQuantity}
              aria-label="Increase quantity"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="flex h-full flex-1 items-end gap-3 pt-1 pb-0 sm:pt-0">
          <Button
            className="h-12 flex-1 rounded-md text-base font-bold uppercase transition-all active:scale-95"
            variant="default"
            onClick={handleBuyNow}
            disabled={selectedVariant && !selectedVariant.inStock}
          >
            {selectedVariant && !selectedVariant.inStock ? 'Out of Stock' : 'Buy Now'}
          </Button>
          <Button
            className="bg-muted text-foreground hover:bg-muted/80 h-12 flex-1 rounded-md border text-base font-bold"
            variant="outline"
            onClick={handleAddToCart}
            disabled={selectedVariant && !selectedVariant.inStock}
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
          <span className="text-foreground font-semibold">SKU:</span> {selectedVariant?.sku || product.sku}
        </p>
        <p>
          <span className="text-foreground font-semibold">Categories:</span>{' '}
          {product.categories.map((c) => c.name).join(', ')}
        </p>
        <p>
          <span className="text-foreground font-semibold">Tags:</span> {product.tags.join(', ')}
        </p>
      </div>

      <SizeGuideModal isOpen={showSizeGuide} onOpenChange={setShowSizeGuide} />
    </div>
  );
}
