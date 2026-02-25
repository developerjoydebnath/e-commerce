'use client';

import { Button } from '@/shared/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog';
import { Textarea } from '@/shared/components/ui/textarea';
import { useReviewsStore } from '@/shared/store/reviewsStore';
import { Star } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: string;
    name: string;
    image: string;
  } | null;
}

export default function ReviewModal({ isOpen, onClose, product }: ReviewModalProps) {
  const addReview = useReviewsStore((state) => state.addReview);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset state when modal opens for a new product
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setTimeout(() => {
        setRating(0);
        setHoverRating(0);
        setComment('');
      }, 300);
      onClose();
    }
  };

  const handleSubmit = async () => {
    if (!product || rating === 0) return;

    setIsSubmitting(true);

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 600));

    addReview({
      productId: product.id,
      productName: product.name,
      productImage: product.image,
      rating,
      comment,
    });

    setIsSubmitting(false);
    handleOpenChange(false);
  };

  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Write a Review</DialogTitle>
          <DialogDescription>Share your experience with this product to help others.</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-6 py-4">
          <div className="flex items-center gap-4 rounded-lg border border-zinc-100 bg-zinc-50 p-3">
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md border border-zinc-200 bg-white">
              <Image src={product.image} alt={product.name} fill className="object-cover" />
            </div>
            <p className="line-clamp-2 font-medium text-zinc-900">{product.name}</p>
          </div>

          <div className="flex flex-col items-center gap-2">
            <span className="text-sm font-medium text-zinc-700">Overall Rating</span>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1 transition-transform hover:scale-110 focus:outline-none"
                >
                  <Star
                    className={`h-8 w-8 transition-colors ${
                      star <= (hoverRating || rating)
                        ? 'fill-amber-400 text-amber-400'
                        : 'fill-transparent text-zinc-300'
                    }`}
                  />
                </button>
              ))}
            </div>
            {rating > 0 && (
              <span className="text-xs font-medium text-amber-600">
                {['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'][rating - 1]}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="review-comment" className="text-sm font-medium text-zinc-700">
              Add a written review (optional)
            </label>
            <Textarea
              id="review-comment"
              placeholder="What did you like or dislike? What did you use this product for?"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="min-h-[120px] resize-y bg-white"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={() => handleOpenChange(false)} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={rating === 0 || isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Review'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
