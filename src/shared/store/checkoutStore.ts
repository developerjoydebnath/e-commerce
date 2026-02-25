import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type CheckoutStep = 1 | 2 | 3 | 4;

export type ShippingMethod = 'regular' | 'express';

export interface SavedAddress {
  id: string;
  name: string;
  phone: string;
  division: string;
  district: string;
  upazila: string;
  fullAddress: string;
  lat?: number;
  lng?: number;
}

interface CheckoutState {
  activeStep: CheckoutStep;
  savedAddresses: SavedAddress[];
  selectedAddressId: string | null;
  shippingMethod: ShippingMethod;
  selectedPaymentMethod: string | null;

  // Actions
  setActiveStep: (step: CheckoutStep) => void;
  nextStep: () => void;
  prevStep: () => void;
  addAddress: (address: Omit<SavedAddress, 'id'>) => void;
  editAddress: (id: string, address: Omit<SavedAddress, 'id'>) => void;
  deleteAddress: (id: string) => void;
  setSelectedAddress: (id: string) => void;
  setShippingMethod: (method: ShippingMethod) => void;
  setSelectedPaymentMethod: (method: string) => void;
  getShippingCost: () => number;
}

export const useCheckoutStore = create<CheckoutState>()(
  persist(
    (set, get) => ({
      activeStep: 1,
      // Seeded dummy addresses mapped to Bangladesh locations for UI validation
      savedAddresses: [
        {
          id: 'addr_1',
          name: 'Home',
          phone: '01712345678',
          division: 'Dhaka',
          district: 'Dhaka',
          upazila: 'Gulshan',
          fullAddress: 'Road 11, Block E, Banani',
          lat: 23.7925,
          lng: 90.4078,
        },
        {
          id: 'addr_2',
          name: 'Office',
          phone: '01887654321',
          division: 'Chattogram',
          district: 'Chattogram',
          upazila: 'Kotwali',
          fullAddress: 'Agrabad C/A',
          lat: 22.3242,
          lng: 91.8105,
        },
      ],
      selectedAddressId: null,
      shippingMethod: 'regular',
      selectedPaymentMethod: null,

      setActiveStep: (step) => set({ activeStep: step }),

      nextStep: () =>
        set((state) => {
          if (state.activeStep < 4) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return { activeStep: (state.activeStep + 1) as CheckoutStep };
          }
          return state;
        }),

      prevStep: () =>
        set((state) => {
          if (state.activeStep > 1) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return { activeStep: (state.activeStep - 1) as CheckoutStep };
          }
          return state;
        }),

      addAddress: (address) =>
        set((state) => {
          const newAddress = { ...address, id: `addr_${Date.now()}` };
          return {
            savedAddresses: [...state.savedAddresses, newAddress],
            selectedAddressId: newAddress.id,
          };
        }),

      editAddress: (id, address) =>
        set((state) => ({
          savedAddresses: state.savedAddresses.map((addr) => (addr.id === id ? { ...addr, ...address } : addr)),
        })),

      deleteAddress: (id) =>
        set((state) => ({
          savedAddresses: state.savedAddresses.filter((addr) => addr.id !== id),
          selectedAddressId: state.selectedAddressId === id ? null : state.selectedAddressId,
        })),

      setSelectedAddress: (id) => set({ selectedAddressId: id }),

      setShippingMethod: (method) => set({ shippingMethod: method }),

      setSelectedPaymentMethod: (method) => set({ selectedPaymentMethod: method }),

      getShippingCost: () => {
        const state = get();
        // Base example: Regular is 50 TK, Express is 120 TK assuming flat rates mapped to BDT equivalent layouts
        return state.shippingMethod === 'regular' ? 50 : 120;
      },
    }),
    {
      name: 'ecommerce-checkout-storage',
      partialize: (state) => ({
        savedAddresses: state.savedAddresses,
        selectedAddressId: state.selectedAddressId,
      }), // Only persist the saved addresses
    }
  )
);
