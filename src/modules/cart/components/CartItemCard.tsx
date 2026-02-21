'use client';

import { Button } from '@/shared/components/ui/button';
import { Checkbox } from '@/shared/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select';
import { useCartStore, type CartItem } from '@/shared/store/cartStore';
import { useWishlistStore } from '@/shared/store/wishlistStore';
import { Heart, Minus, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// Hardcoded variant options based on typical e-commerce needs
const SIZES = ['S', 'M', 'L', 'XL', 'XXL'];
const COLORS = ['Red', 'Blue', 'Green', 'Black', 'White'];

export default function CartItemCard({ item }: { item: CartItem }) {
  const [mounted, setMounted] = useState(false);

  const toggleSelectItem = useCartStore((state) => state.toggleSelectItem);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateItemVariant = useCartStore((state) => state.updateItemVariant);

  const addWishlistItem = useWishlistStore((state) => state.addItem);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const handleMoveToWishlist = () => {
    addWishlistItem({
      ...item,
      // WishlistItem doesn't need quantity or selected
    });
    removeItem(item.id);
  };

  if (!mounted) return null; // Avoid hydration mismatch

  return (
    <div className="flex flex-col gap-4 border-b pt-6 pb-6 first:pt-0 last:border-0 last:pb-0 sm:flex-row sm:items-start">
      {/* Selection Checkbox & Image */}
      <div className="flex items-center gap-4">
        <Checkbox
          checked={item.selected}
          onCheckedChange={() => toggleSelectItem(item.id)}
          className="h-5 w-5 rounded-md"
          aria-label={`Select ${item.name}`}
        />
        <div className="bg-muted relative h-24 w-24 shrink-0 overflow-hidden rounded-md border sm:h-32 sm:w-32">
          {item.image ? (
            <Image src={item.image} alt={item.name} fill className="object-cover" />
          ) : (
            <div className="bg-secondary/50 text-muted-foreground flex h-full w-full items-center justify-center p-2 text-center text-xs">
              No Image
            </div>
          )}
        </div>
      </div>

      {/* Info & Variants */}
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-1 sm:flex-row sm:justify-between">
          <div>
            {item.slug ? (
              <Link
                href={`/products/${item.slug}`}
                className="hover:text-primary line-clamp-2 text-base leading-tight font-semibold transition-colors sm:text-lg"
              >
                {item.name}
              </Link>
            ) : (
              <h3 className="line-clamp-2 text-base leading-tight font-semibold sm:text-lg">{item.name}</h3>
            )}
            <p className="text-muted-foreground mt-1 line-clamp-1 text-sm">
              {item.description || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'}
            </p>
            <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
              {item.stockStatus || 'In Stock'}
            </div>
          </div>

          <div className="mt-2 flex items-baseline gap-2 sm:mt-0 sm:flex-col sm:items-end sm:gap-1">
            <span className="text-foreground text-lg font-bold">
              ${item.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            {item.originalPrice && (
              <span className="text-muted-foreground text-sm line-through">
                ${item.originalPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            )}
          </div>
        </div>

        {/* Variants, Quantity & Actions Grid */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
          {/* Variants */}
          <div className="flex items-center gap-3">
            <Select value={item.size || SIZES[0]} onValueChange={(val) => updateItemVariant(item.id, { size: val })}>
              <SelectTrigger className="h-9 w-[80px]">
                <SelectValue placeholder="Size" />
              </SelectTrigger>
              <SelectContent position="popper">
                {SIZES.map((size) => (
                  <SelectItem key={size} value={size}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={item.color || COLORS[0]} onValueChange={(val) => updateItemVariant(item.id, { color: val })}>
              <SelectTrigger className="h-9 w-[100px]">
                <SelectValue placeholder="Color" />
              </SelectTrigger>
              <SelectContent position="popper">
                {COLORS.map((color) => (
                  <SelectItem key={color} value={color}>
                    {color}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Quantity & Actions */}
          <div className="flex items-center gap-4">
            <div className="border-input flex h-9 items-center rounded-md border bg-transparent">
              <button
                onClick={() => decreaseQuantity(item.id)}
                disabled={item.quantity <= 1}
                className="text-muted-foreground hover:bg-muted hover:text-foreground flex h-full w-9 items-center justify-center transition-colors disabled:opacity-50"
              >
                <Minus className="h-3 w-3" />
              </button>
              <span className="border-input flex h-full w-10 items-center justify-center border-x text-sm font-medium">
                {item.quantity}
              </span>
              <button
                onClick={() => increaseQuantity(item.id)}
                className="text-muted-foreground hover:bg-muted hover:text-foreground flex h-full w-9 items-center justify-center transition-colors"
              >
                <Plus className="h-3 w-3" />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="text-muted-foreground hover:bg-muted h-9 w-9 border-transparent transition-colors hover:text-red-500"
                onClick={() => removeItem(item.id)}
                title="Remove Item"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="text-muted-foreground hover:bg-muted hover:text-primary h-9 w-9 border-transparent transition-colors"
                onClick={handleMoveToWishlist}
                title="Move to Wishlist"
              >
                <Heart className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
