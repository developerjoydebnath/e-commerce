'use client';

import { Button } from '@/shared/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/shared/components/ui/dialog';
import { Product } from '@/shared/constants/mockData';
import { cn } from '@/shared/lib/utils';
import { useCartStore } from '@/shared/store/cartStore';
import { Minus, Plus, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import SizeGuideModal from './SizeGuideModal';

interface QuickAddModalProps {
  product: Product;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  mode?: 'add' | 'update';
  initialAttributes?: Record<string, string>;
  initialQuantity?: number;
  cartItemId?: string;
}

export default function QuickAddModal({
  product,
  isOpen,
  onOpenChange,
  mode = 'add',
  initialAttributes,
  initialQuantity,
  cartItemId,
}: QuickAddModalProps) {
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);
  const updateItem = useCartStore((state) => state.updateItem);
  const setCartOpen = useCartStore((state) => state.setIsOpen);

  const [selectedAttributes, setSelectedAttributes] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState(1);
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  // Initialize selected attributes with first values of each attribute or initial values
  useEffect(() => {
    if (isOpen) {
      let initialAttribs: Record<string, string> = {};
      let initialQty = 1;

      if (mode === 'update' && initialAttributes) {
        initialAttribs = initialAttributes;
        initialQty = initialQuantity || 1;
      } else {
        product.attributes.forEach((attr) => {
          initialAttribs[attr.name.toLowerCase()] = attr.values[0];
        });
      }

      const timer = setTimeout(() => {
        setSelectedAttributes(initialAttribs);
        setQuantity(initialQty);
      }, 0);

      return () => clearTimeout(timer);
    }
  }, [product, isOpen, mode, initialAttributes, initialQuantity]);

  // Find matching variant
  const selectedVariant = useMemo(() => {
    return product.variants.find((variant) => {
      return Object.entries(selectedAttributes).every(([key, value]) => {
        return variant.attributes[key] === value;
      });
    });
  }, [product.variants, selectedAttributes]);

  const currentPrice = selectedVariant ? selectedVariant.price : product.basePrice;
  const currentOriginalPrice = selectedVariant ? selectedVariant.originalPrice : product.originalPrice;
  const currentImage = selectedVariant ? selectedVariant.image : product.image;
  const totalPrice = currentPrice * quantity;

  const handleAttributeChange = (name: string, value: string) => {
    setSelectedAttributes((prev) => ({
      ...prev,
      [name.toLowerCase()]: value,
    }));
  };

  const handleAddToCart = () => {
    if (!selectedVariant) return;

    addItem({
      id: product.id,
      name: product.name,
      price: currentPrice,
      originalPrice: currentOriginalPrice,
      brand: product.brand.name,
      image: currentImage,
      slug: product.slug,
      quantity: quantity,
      attributes: selectedAttributes,
      stockStatus: selectedVariant ? (selectedVariant.inStock ? 'In Stock' : 'Out of Stock') : 'In Stock',
    });

    onOpenChange(false);
    setCartOpen(true);
  };

  const handleUpdateCart = () => {
    if (!selectedVariant || !cartItemId) return;

    updateItem(cartItemId, {
      attributes: selectedAttributes,
      quantity: quantity,
    });

    onOpenChange(false);
    // Don't open cart sidebar when updating
  };

  const handleBuyNow = () => {
    handleAddToCart();
    setCartOpen(false); // Close cart sidebar if it opened
    router.push('/checkout');
  };

  const handleGoToDetails = () => {
    onOpenChange(false);
    router.push(`/products/${product.slug}`);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="overflow-hidden rounded-xl border-none p-0 sm:max-w-3xl">
          <div className="flex h-full flex-col md:flex-row">
            {/* Left: Image */}
            <div className="bg-muted relative aspect-square h-64 w-full md:aspect-auto md:h-auto md:w-5/12">
              <Image src={currentImage} alt={product.name} fill className="object-cover" />
            </div>

            {/* Right: Info & Selection */}
            <div className="flex w-full flex-col gap-6 p-6 md:w-7/12">
              <DialogHeader>
                <DialogTitle className="line-clamp-2 text-xl leading-tight font-bold">{product.name}</DialogTitle>
                <div className="mt-2 flex items-baseline gap-3">
                  <span className="text-primary text-2xl font-bold">${currentPrice.toFixed(2)}</span>
                  {currentOriginalPrice && (
                    <span className="text-muted-foreground text-sm line-through">
                      ${currentOriginalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
              </DialogHeader>

              <div className="flex-1 space-y-6">
                {product.attributes.map((attr) => (
                  <div key={attr.name} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-muted-foreground text-sm font-semibold tracking-wider uppercase">
                        {attr.name}:{' '}
                        <span className="text-foreground">{selectedAttributes[attr.name.toLowerCase()]}</span>
                      </label>
                      {attr.name.toLowerCase().includes('size') &&
                        product.categories.some((c) =>
                          ['men-s-fashion', 'women-s-fashion', 'sports', 'shoes'].includes(c.slug)
                        ) && (
                          <button
                            onClick={() => setShowSizeGuide(true)}
                            className="decoration-primary/30 hover:text-primary text-xs font-bold underline underline-offset-4 transition-colors"
                          >
                            Size Guide
                          </button>
                        )}
                    </div>
                    <div className="flex flex-wrap gap-2">
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
                            onClick={() => handleAttributeChange(attr.name, value)}
                            className={cn(
                              'relative flex items-center justify-center overflow-hidden transition-all duration-200',
                              isColor
                                ? 'h-10 w-10 rounded-md border-2'
                                : 'min-w-10 rounded-md border px-3 py-2 text-sm font-medium',
                              isSelected
                                ? isColor
                                  ? 'border-primary ring-primary/20 ring-2 ring-offset-1'
                                  : 'bg-primary border-primary text-primary-foreground ring-primary/20 shadow-md ring-2 ring-offset-1'
                                : isColor
                                  ? 'hover:border-muted-foreground/30 border-transparent'
                                  : 'hover:border-primary hover:bg-primary/5 border-input text-foreground'
                            )}
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

                <div className="space-y-3">
                  <div className="flex items-center gap-4">
                    <div className="bg-muted/30 flex h-12 items-center rounded-lg border">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        aria-label="Decrease quantity"
                        className="hover:text-primary p-3 transition-colors"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-10 text-center text-lg font-bold select-none">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        aria-label="Increase quantity"
                        className="hover:text-primary p-3 transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    {selectedVariant && (
                      <p
                        className={cn(
                          'text-xs font-medium',
                          selectedVariant.stock > 0 ? 'text-green-600' : 'text-red-500'
                        )}
                      >
                        {selectedVariant.stock > 0 ? `${selectedVariant.stock} in stock` : 'Out of stock'}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 border-t pt-4">
                {mode === 'add' ? (
                  <>
                    <Button
                      onClick={handleAddToCart}
                      disabled={!selectedVariant || !selectedVariant.inStock}
                      className="shadow-primary/10 h-12 w-full gap-2 text-base font-bold shadow-lg"
                    >
                      <ShoppingCart size={18} />
                      {selectedVariant && !selectedVariant.inStock
                        ? 'Out of Stock'
                        : `Add to Cart — $${totalPrice.toFixed(2)}`}
                    </Button>
                    <div className="flex gap-3">
                      <Button
                        onClick={handleBuyNow}
                        disabled={!selectedVariant || !selectedVariant.inStock}
                        variant="secondary"
                        className="h-12 flex-1 gap-2 border-none bg-red-500 text-base font-bold text-white shadow-lg shadow-red-500/10 hover:bg-red-600 disabled:bg-gray-400"
                      >
                        {selectedVariant && !selectedVariant.inStock ? 'Unavailable' : 'Buy It Now'}
                      </Button>
                      <Button variant="outline" onClick={handleGoToDetails} className="h-12 flex-1 text-base font-bold">
                        Details
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <Button
                      onClick={handleUpdateCart}
                      disabled={!selectedVariant || !selectedVariant.inStock}
                      className="shadow-primary/10 h-12 w-full gap-2 text-base font-bold shadow-lg"
                    >
                      Update Item — ${totalPrice.toFixed(2)}
                    </Button>
                    <Button variant="outline" onClick={handleGoToDetails} className="h-12 w-full text-base font-bold">
                      Details
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <SizeGuideModal isOpen={showSizeGuide} onOpenChange={setShowSizeGuide} />
    </>
  );
}
