import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Review {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  rating: number;
  comment: string;
  date: string;
}

interface ReviewsState {
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'date'>) => void;
  hasReviewed: (productId: string) => boolean;
}

export const useReviewsStore = create<ReviewsState>()(
  persist(
    (set, get) => ({
      reviews: [
        {
          id: 'rev_1',
          productId: 'prod_5',
          productName: 'Ultra-Wide 34-inch Monitor',
          productImage: '/images/products/product-5a.png',
          rating: 5,
          comment: 'The display is stunning! Perfect for multitasking and gaming.',
          date: '2023-10-30',
        },
      ],

      addReview: (review) =>
        set((state) => {
          const newReview: Review = {
            ...review,
            id: `rev_${Date.now()}`,
            date: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
          };
          return {
            reviews: [newReview, ...state.reviews],
          };
        }),

      hasReviewed: (productId) => {
        const state = get();
        return state.reviews.some((r) => r.productId === productId);
      },
    }),
    {
      name: 'ecommerce-reviews-storage',
    }
  )
);
