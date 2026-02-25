import { Book, Heart, Package, RotateCcw, ShoppingCart, Star, User } from 'lucide-react';
import { protectedRoutes } from './routes';

export const profileMenuItems = [
  {
    category: 'Accounts & Settings',
    items: [
      { name: 'My Profile', href: protectedRoutes.PROFILE, icon: User },
      { name: 'Address Book', href: protectedRoutes.ADDRESS_BOOK, icon: Book },
    ],
  },
  {
    category: 'Orders & Tracking',
    items: [
      { name: 'My Orders', href: protectedRoutes.ORDERS, icon: Package },
      { name: 'My Returns', href: protectedRoutes.RETURNS, icon: RotateCcw },
      { name: 'My Reviews', href: protectedRoutes.REVIEWS, icon: Star },
    ],
  },
  {
    category: 'Cart & Wishlist',
    items: [
      { name: 'My Cart', href: protectedRoutes.CHECKOUT, icon: ShoppingCart },
      { name: 'My Wishlist', href: protectedRoutes.WISHLIST, icon: Heart },
    ],
  },
];
