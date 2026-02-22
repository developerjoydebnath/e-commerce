import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CompareItem {
  id: string | number;
  name: string;
  price: number;
  originalPrice?: number;
  rating?: number;
  reviews?: number;
  image: string;
  slug?: string;
  brand?: string;
  categoryId?: string;
  description?: string;
}

interface CompareState {
  items: CompareItem[];
  toggleItem: (item: CompareItem) => void;
  removeItem: (id: string | number) => void;
  clearCompare: () => void;
}

export const useCompareStore = create<CompareState>()(
  persist(
    (set, get) => ({
      items: [],
      toggleItem: (item) => {
        const currentItems = get().items;
        const exists = currentItems.find((i) => i.id === item.id);

        if (exists) {
          // Remove if it already exists
          set({ items: currentItems.filter((i) => i.id !== item.id) });
        } else {
          // Add if it doesn't exist (limit to 4 for UI saneness)
          if (currentItems.length >= 4) {
            // Optional: User feedback could be flashed here, or just swap the oldest
            const newItems = [...currentItems.slice(1), item];
            set({ items: newItems });
          } else {
            set({ items: [...currentItems, item] });
          }
        }
      },
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        })),
      clearCompare: () => set({ items: [] }),
    }),
    {
      name: 'ecommerce-compare-storage',
    }
  )
);
