import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface User {
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string) => void;
  logout: () => void;
}

// Custom storage handler for cookies
const cookieStorage = {
  getItem: (name: string) => {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) return decodeURIComponent(match[2]);
    return null;
  },
  setItem: (name: string, value: string) => {
    document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=86400`; // 24 hours
  },
  removeItem: (name: string) => {
    document.cookie = `${name}=; path=/; max-age=0`;
  },
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (email: string) =>
        set({
          user: { email, name: email.split('@')[0] },
          isAuthenticated: true,
        }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => cookieStorage),
    }
  )
);
