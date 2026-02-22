'use client';

import AppPagination from '@/shared/components/ui/app-pagination';
import { Progress } from '@/shared/components/ui/progress';
import { cn } from '@/shared/lib/utils';
import { CheckCircle2, Star, ThumbsUp } from 'lucide-react';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select';
import { Separator } from '@/shared/components/ui/separator';
import { Product } from '@/shared/constants/mockData';

export interface ProductReviewsProps {
  product: Product;
}

export default function ProductReviews({ product }: ProductReviewsProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxSlides, setLightboxSlides] = useState<{ src: string }[]>([]);

  const [filter, setFilter] = useState('default');
  const [sort, setSort] = useState('default');

  const itemsPerPage = 5;

  const processedReviews = useMemo(() => {
    let list = [...(product.reviews || [])];

    if (filter !== 'default') {
      const starCount = parseInt(filter, 10);
      list = list.filter((r) => r.rating === starCount);
    }

    if (sort === 'newest') {
      list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (sort === 'oldest') {
      list.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    }

    return list;
  }, [product.reviews, filter, sort]);

  const pageCount = Math.ceil(processedReviews.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentItems = processedReviews.slice(offset, offset + itemsPerPage);

  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected);
  };

  return (
    <div className="flex flex-col gap-4 text-left sm:gap-6 md:gap-10">
      <h2 className="text-foreground mb-4 text-xl font-bold sm:text-2xl">Ratings & Reviews</h2>

      <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
        {/* Left: Summary */}
        <div className="flex w-full shrink-0 flex-col gap-6 self-start lg:sticky lg:top-32 lg:w-[300px] xl:w-[350px]">
          <div className="flex items-end gap-2">
            <h3 className="text-foreground text-5xl font-bold tracking-tight">
              {product.ratings?.rating?.toFixed(1) || '0.0'}
            </h3>
            <span className="text-muted-foreground pb-1 text-lg font-medium">/5</span>
          </div>

          <div className="mt-2 flex flex-col gap-1.5">
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    'h-6 w-6',
                    i < Math.round(product.ratings?.rating || 0)
                      ? 'fill-black text-black dark:fill-white dark:text-white'
                      : 'text-muted-foreground/30 fill-none'
                  )}
                />
              ))}
            </div>
            <span className="text-foreground mt-1 text-sm font-medium">{product.ratings?.total || 0} Reviews</span>
          </div>

          <div className="mt-4 flex flex-col gap-3">
            {[5, 4, 3, 2, 1].map((stars) => {
              const total = product.ratings?.total || 1; // avoid division by zero
              const counts = [
                product.ratings?.fiveStar || 0,
                product.ratings?.fourStar || 0,
                product.ratings?.threeStar || 0,
                product.ratings?.twoStar || 0,
                product.ratings?.oneStar || 0,
              ];
              // Math corresponds properly to the descending stars array above [5,4,3,2,1]
              const currentCount = counts[5 - stars];
              const percentage = Math.round((currentCount / total) * 100);

              return (
                <div key={stars} className="flex items-center gap-4 text-sm font-medium">
                  <div className="flex w-[85px] shrink-0 items-center justify-end gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          'h-3.5 w-3.5',
                          i < stars
                            ? 'fill-black text-black dark:fill-white dark:text-white'
                            : 'text-muted-foreground/30 fill-none'
                        )}
                      />
                    ))}
                  </div>
                  <Progress
                    value={percentage}
                    className="bg-muted h-2 flex-1 rounded-sm"
                    indicatorClassName="bg-black dark:bg-white"
                  />
                  <span className="text-muted-foreground w-8 text-right">{percentage}%</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Reviews List */}
        <div className="flex flex-1 flex-col">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <h3 className="text-foreground text-lg font-semibold">Customer Reviews</h3>
            <div className="flex items-center gap-3">
              <Select
                value={filter}
                onValueChange={(v) => {
                  setFilter(v);
                  setCurrentPage(0);
                }}
              >
                <SelectTrigger className="bg-muted/50 w-[140px]">
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="default">All Stars</SelectItem>
                  <SelectItem value="5">5 Stars</SelectItem>
                  <SelectItem value="4">4 Stars</SelectItem>
                  <SelectItem value="3">3 Stars</SelectItem>
                  <SelectItem value="2">2 Stars</SelectItem>
                  <SelectItem value="1">1 Star</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={sort}
                onValueChange={(v) => {
                  setSort(v);
                  setCurrentPage(0);
                }}
              >
                <SelectTrigger className="bg-muted/50 w-[140px]">
                  <SelectValue placeholder="Sort" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="default">Default Sort</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator className="my-4" />

          <div className="flex flex-col gap-10">
            {currentItems.length === 0 ? (
              <p className="text-muted-foreground">No reviews yet.</p>
            ) : (
              currentItems.map((review) => (
                <div key={review.id} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-foreground text-base leading-none font-semibold">{review.user.name}</span>
                      {review.user.isVerified && <CheckCircle2 className="text-primary h-4 w-4" />}
                    </div>
                    <div className="text-muted-foreground mt-1 flex items-center gap-3 text-sm">
                      <div className="flex items-center">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              'h-4 w-4',
                              i < review.rating
                                ? 'fill-black text-black dark:fill-white dark:text-white'
                                : 'text-muted-foreground/30 fill-none'
                            )}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Display actual user comment or fallback */}
                  <p className="text-muted-foreground pr-4 text-sm leading-relaxed sm:text-base lg:pr-12">
                    {review.comment || 'This user left a rating.'}
                  </p>

                  {review.images && review.images.length > 0 && (
                    <div className="mt-1 flex gap-3">
                      {review.images.map((img, idx) => (
                        <div
                          key={idx}
                          className="bg-muted relative h-24 w-24 cursor-pointer overflow-hidden rounded-md border transition-opacity hover:opacity-80"
                          onClick={() => {
                            setLightboxSlides(review.images.map((src) => ({ src })));
                            setLightboxIndex(idx);
                            setLightboxOpen(true);
                          }}
                        >
                          <Image src={img} alt="Review Image" fill className="object-cover" />
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="text-muted-foreground/80 mt-1 flex items-center gap-4 text-sm font-medium">
                    <button className="hover:text-foreground group flex items-center gap-1.5 transition-colors">
                      <ThumbsUp className="group-hover:text-primary h-4 w-4" />
                      {review.likes}
                    </button>
                    <span className="bg-muted-foreground/30 h-1 w-1 rounded-full" />
                    <span>{new Date(review.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="mt-12">
            <AppPagination pageCount={pageCount} onPageChange={handlePageClick} />
          </div>
        </div>
      </div>

      {lightboxOpen && (
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          index={lightboxIndex}
          slides={lightboxSlides}
          styles={{ container: { backgroundColor: 'rgba(0, 0, 0, 0.85)' } }}
        />
      )}
    </div>
  );
}
