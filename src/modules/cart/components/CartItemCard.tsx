'use client';

import { Button } from '@/shared/components/ui/button';
import { Checkbox } from '@/shared/components/ui/checkbox';
import { products } from '@/shared/constants/mockData';
import { useCartStore, type CartItem } from '@/shared/store/cartStore';
import { useWishlistStore } from '@/shared/store/wishlistStore';
import { Edit2, Heart, Minus, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import QuickAddModal from '../../product/components/modals/QuickAddModal';

export default function CartItemCard({ item }: { item: CartItem }) {
  const [mounted, setMounted] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const toggleSelectItem = useCartStore((state) => state.toggleSelectItem);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  const addWishlistItem = useWishlistStore((state) => state.addItem);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // Match the base product ID from the item ID (which might have a suffix like prod_1_0)
  const product = products.find((p) => {
    const productId = String(p.id).toLowerCase();
    const itemId = String(item.id).toLowerCase();
    return itemId === productId || itemId.startsWith(`${productId}_`);
  });

  const handleAddToWishlist = () => {
    addWishlistItem({
      ...item,
    });
    // Removed removeItem to keep it in cart as requested
  };

  if (!mounted) return null; // Avoid hydration mismatch

  return (
    <>
      <div className="flex flex-col gap-4 border-b pt-6 pb-6 first:pt-0 last:border-0 last:pb-0 sm:flex-row sm:items-start">
        {/* Selection Checkbox & Image */}
        <div className="flex items-center gap-4">
          <Checkbox
            checked={item.selected}
            onCheckedChange={() => toggleSelectItem(item.cartItemId)}
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
                <Link prefetch={false}
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
                  $
                  {item.originalPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              )}
            </div>
          </div>

          {/* Variants, Quantity & Actions Grid */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
            {/* Attributes */}
            <div className="flex flex-wrap items-center gap-2">
              {item.attributes &&
                Object.entries(item.attributes).map(([key, value]) => (
                  <div
                    key={key}
                    className="bg-muted/30 flex items-center gap-1.5 rounded-md border px-2 py-1 text-[10px] font-medium"
                  >
                    <span className="text-muted-foreground uppercase">{key}:</span>
                    <span className="text-foreground">{value}</span>
                  </div>
                ))}
              {product && product.hasVariants && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="hover:bg-primary/10 hover:text-primary h-7 gap-1 px-2 text-[10px] font-bold uppercase transition-all"
                  onClick={() => setIsEditModalOpen(true)}
                >
                  <Edit2 size={12} />
                  Edit
                </Button>
              )}
            </div>

            {/* Quantity & Actions */}
            <div className="flex items-center gap-4">
              <div className="border-input flex h-9 items-center rounded-md border bg-transparent">
                <button
                  onClick={() => decreaseQuantity(item.cartItemId)}
                  disabled={item.quantity <= 1}
                  className="text-muted-foreground hover:bg-muted hover:text-foreground flex h-full w-9 items-center justify-center transition-colors disabled:opacity-50"
                >
                  <Minus className="h-3 w-3" />
                </button>
                <span className="border-input flex h-full w-10 items-center justify-center border-x text-sm font-medium">
                  {item.quantity}
                </span>
                <button
                  onClick={() => increaseQuantity(item.cartItemId)}
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
                  onClick={() => removeItem(item.cartItemId)}
                  title="Remove Item"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="text-muted-foreground hover:bg-muted hover:text-primary h-9 w-9 border-transparent transition-colors"
                  onClick={handleAddToWishlist}
                  title="Add to Wishlist"
                >
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {product && (
        <QuickAddModal
          product={product}
          isOpen={isEditModalOpen}
          onOpenChange={setIsEditModalOpen}
          mode="update"
          initialAttributes={item.attributes}
          initialQuantity={item.quantity}
          cartItemId={item.cartItemId}
        />
      )}
    </>
  );
}
