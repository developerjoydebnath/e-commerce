import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function proxy(request: NextRequest) {
  // Get the auth state from cookies (since middleware doesn't have access to localStorage)
  // Note: Zustand persist can be configured to use cookies, or we can manually set a cookie on login.
  // For this demo, we'll check for an 'auth-storage' cookie or similar.
  // However, Zustand persist by default uses localStorage.
  // A better way for middleware is to check a specific 'token' or 'isAuthenticated' cookie.

  const authStorage = request.cookies.get('auth-storage')?.value;
  let isAuthenticated = false;

  if (authStorage) {
    try {
      const parsed = JSON.parse(authStorage);
      if (parsed?.state?.isAuthenticated) {
        isAuthenticated = true;
      }
    } catch (e) {
      console.error('Failed to parse auth-storage cookie', e);
    }
  }

  const { pathname } = request.nextUrl;

  // Protect routes starting with /user or in the (protected) group
  if (pathname.startsWith('/user') && !isAuthenticated) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

// Config to match protected routes
export const config = {
  matcher: ['/user/:path*'],
};
