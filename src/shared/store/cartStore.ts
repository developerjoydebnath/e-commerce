import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export interface CartItem {
  id: string | number;
  cartItemId: string; // Unique identifier for the specific variant in the cart
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
  addItem: (item: Omit<CartItem, 'quantity' | 'cartItemId'> & { quantity?: number }) => void;
  removeItem: (cartItemId: string) => void;
  increaseQuantity: (cartItemId: string) => void;
  decreaseQuantity: (cartItemId: string) => void;
  clearCart: () => void;
  setIsOpen: (isOpen: boolean) => void;
  toggleSelectItem: (cartItemId: string) => void;
  selectAll: (selected: boolean) => void;
  removeSelectedItems: () => void;
  updateItemVariant: (cartItemId: string, variant: { color?: string; size?: string }) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    immer((set) => ({
      items: [],
      isOpen: false,
      addItem: (item) =>
        set((state) => {
          // Generate a unique cartItemId based on id, color, and size
          const colorKey = item.color || 'default';
          const sizeKey = item.size || 'default';
          const cartItemId = `${item.id}-${colorKey}-${sizeKey}`;

          const existingItem = state.items.find((i) => i.cartItemId === cartItemId);
          const qtyToAdd = item.quantity || 1;

          if (existingItem) {
            existingItem.quantity += qtyToAdd;
          } else {
            state.items.push({ ...item, cartItemId, quantity: qtyToAdd, selected: true });
          }
        }),
      removeItem: (cartItemId) =>
        set((state) => {
          state.items = state.items.filter((i) => i.cartItemId !== cartItemId);
        }),
      increaseQuantity: (cartItemId) =>
        set((state) => {
          const item = state.items.find((i) => i.cartItemId === cartItemId);
          if (item) {
            item.quantity += 1;
          }
        }),
      decreaseQuantity: (cartItemId) =>
        set((state) => {
          const item = state.items.find((i) => i.cartItemId === cartItemId);
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
      toggleSelectItem: (cartItemId) =>
        set((state) => {
          const item = state.items.find((i) => i.cartItemId === cartItemId);
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
      updateItemVariant: (cartItemId, variant) =>
        set((state) => {
          const itemIndex = state.items.findIndex((i) => i.cartItemId === cartItemId);
          if (itemIndex !== -1) {
            const item = state.items[itemIndex];
            const newColor = variant.color !== undefined ? variant.color : item.color;
            const newSize = variant.size !== undefined ? variant.size : item.size;

            const newCartItemId = `${item.id}-${newColor || 'default'}-${newSize || 'default'}`;

            // If the updated variant already exists in the cart, merge them
            const existingSameVariantIndex = state.items.findIndex(
              (i, idx) => i.cartItemId === newCartItemId && idx !== itemIndex
            );

            if (existingSameVariantIndex !== -1) {
              state.items[existingSameVariantIndex].quantity += item.quantity;
              state.items.splice(itemIndex, 1);
            } else {
              item.color = newColor;
              item.size = newSize;
              item.cartItemId = newCartItemId;
            }
          }
        }),
    })),
    {
      name: 'cart-storage',
    }
  )
);
