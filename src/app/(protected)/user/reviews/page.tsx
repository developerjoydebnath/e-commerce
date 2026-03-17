'use client';

import { Button } from '@/shared/components/ui/button';
import { protectedRoutes, publicRoutes } from '@/shared/constants/routes';
import { useReviewsStore } from '@/shared/store/reviewsStore';
import { Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function MyReviewsPage() {
  const { reviews } = useReviewsStore();

  return (
    <div className="flex flex-col gap-6 lg:pr-10">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-foreground">My Reviews</h1>
        <p className="text-sm text-muted-foreground">View and manage the product reviews you have left.</p>
      </div>

      <div className="flex flex-col gap-6">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div
              key={review.id}
              className="border-border bg-card text-card-foreground flex flex-col overflow-hidden rounded-xl border"
            >
              <div className="flex flex-col items-start justify-between gap-4 border-b border-border bg-muted/50 px-6 py-4 sm:flex-row sm:items-center">
                <div className="flex items-center gap-4">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md border border-border">
                    <Image src={review.productImage} alt={review.productName} fill className="object-cover" />
                  </div>
                  <div className="flex flex-col">
                    <Link
                      href={`${publicRoutes.PRODUCT(review.productId)}`}
                      className="hover:text-primary line-clamp-2 font-semibold text-foreground transition-colors"
                    >
                      {review.productName}
                    </Link>
                    <span className="text-xs text-muted-foreground">Reviewed on {review.date}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 px-6 py-4">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-5 w-5 ${
                        star <= review.rating ? 'fill-amber-400 text-amber-400' : 'fill-transparent text-muted-foreground'
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm font-medium text-muted-foreground">
                    {['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'][review.rating - 1]}
                  </span>
                </div>

                {review.comment ? (
                  <p className="text-sm leading-relaxed text-muted-foreground">{review.comment}</p>
                ) : (
                  <p className="text-sm text-muted-foreground italic">No written review provided.</p>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/50 p-12">
            <Star className="mb-4 h-12 w-12 text-muted-foreground" />
            <p className="text-lg font-medium text-foreground">No reviews yet</p>
            <p className="max-w-sm text-center text-sm text-muted-foreground">
              You haven&apos;t written any product reviews. Leave a review on your completed orders to see it here!
            </p>
            <Button asChild className="mt-6 rounded-full px-8">
              <Link href={protectedRoutes.ORDERS}>View My Orders</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
