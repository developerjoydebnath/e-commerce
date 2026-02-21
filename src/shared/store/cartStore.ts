import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export interface CartItem {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
  brand?: string;
  image?: string;
  slug?: string;
  selected?: boolean;
  color?: string;
  size?: string;
  originalPrice?: number;
  stockStatus?: string;
  description?: string;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeItem: (id: string | number) => void;
  increaseQuantity: (id: string | number) => void;
  decreaseQuantity: (id: string | number) => void;
  clearCart: () => void;
  setIsOpen: (isOpen: boolean) => void;
  toggleSelectItem: (id: string | number) => void;
  selectAll: (selected: boolean) => void;
  removeSelectedItems: () => void;
  updateItemVariant: (id: string | number, variant: { color?: string; size?: string }) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    immer((set) => ({
      items: [],
      isOpen: false,
      addItem: (item) =>
        set((state) => {
          state.isOpen = true;
          // When adding an item, find by id AND color AND size to treat different variants as different cart items if needed,
          // but for now let's just use id to maintain backward compatibility with current implementations.
          // In a fully featured app, you might use a composite key or uniquely generated cartItemId.
          const existingItem = state.items.find((i) => i.id === item.id);
          const qtyToAdd = item.quantity || 1;
          if (existingItem) {
            existingItem.quantity += qtyToAdd;
          } else {
            state.items.push({ ...item, quantity: qtyToAdd, selected: true });
          }
        }),
      removeItem: (id) =>
        set((state) => {
          state.items = state.items.filter((i) => i.id !== id);
        }),
      increaseQuantity: (id) =>
        set((state) => {
          const item = state.items.find((i) => i.id === id);
          if (item) {
            item.quantity += 1;
          }
        }),
      decreaseQuantity: (id) =>
        set((state) => {
          const item = state.items.find((i) => i.id === id);
          if (item && item.quantity > 1) {
            item.quantity -= 1;
          }
        }),
      clearCart: () =>
        set((state) => {
          state.items = [];
        }),
      setIsOpen: (isOpen) =>
        set((state) => {
          state.isOpen = isOpen;
        }),
      toggleSelectItem: (id) =>
        set((state) => {
          const item = state.items.find((i) => i.id === id);
          if (item) {
            item.selected = !item.selected;
          }
        }),
      selectAll: (selected) =>
        set((state) => {
          state.items.forEach((item) => {
            item.selected = selected;
          });
        }),
      removeSelectedItems: () =>
        set((state) => {
          state.items = state.items.filter((i) => !i.selected);
        }),
      updateItemVariant: (id, variant) =>
        set((state) => {
          const item = state.items.find((i) => i.id === id);
          if (item) {
            if (variant.color !== undefined) item.color = variant.color;
            if (variant.size !== undefined) item.size = variant.size;
          }
        }),
    })),
    {
      name: 'cart-storage',
    }
  )
);
