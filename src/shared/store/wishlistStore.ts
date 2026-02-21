import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export interface WishlistItem {
  id: string | number;
  name: string;
  price: number;
  brand?: string;
  image?: string;
  slug?: string;
}

interface WishlistState {
  items: WishlistItem[];
  isOpen: boolean;
  addItem: (item: WishlistItem) => void;
  removeItem: (id: string | number) => void;
  clearWishlist: () => void;
  isInWishlist: (id: string | number) => boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    immer((set, get) => ({
      items: [],
      isOpen: false,
      addItem: (item) =>
        set((state) => {
          const exists = state.items.some((i) => String(i.id) === String(item.id));
          if (!exists) {
            state.items.push(item);
          }
        }),
      removeItem: (id) =>
        set((state) => {
          state.items = state.items.filter((i) => String(i.id) !== String(id));
        }),
      clearWishlist: () =>
        set((state) => {
          state.items = [];
        }),
      isInWishlist: (id) => {
        return get().items.some((i) => String(i.id) === String(id));
      },
      setIsOpen: (isOpen) =>
        set((state) => {
          state.isOpen = isOpen;
        }),
    })),
    {
      name: 'wishlist-storage',
    }
  )
);
