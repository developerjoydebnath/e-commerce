export const protectedRoutes = {
  PROFILE: '/user/profile',
  ADDRESS_BOOK: '/user/address-book',
  ORDERS: '/user/orders',
  RETURNS: '/user/returns',
  REVIEWS: '/user/reviews',
  CHECKOUT: '/checkout',
  WISHLIST: '/wishlist',
};

export const publicRoutes = {
  HOME: '/',
  SHOP: '/shop',
  PRODUCTS: '/products',
  PRODUCT: (slug: string) => `/products/${slug}`,
  CART: '/cart',
  CHECKOUT: '/checkout',
  WISHLIST: '/wishlist',
  LOGIN: '/login',
  REGISTER: '/register',
};
