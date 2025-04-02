import { NextRequest, NextResponse } from 'next/server';
import { createServerClient, type CookieOptions } from '@supabase/ssr';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return req.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          req.cookies.set({
            name,
            value,
            ...options,
          });
          res.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          req.cookies.set({
            name,
            value: '',
            ...options,
          });
          res.cookies.set({
            name,
            value: '',
            ...options,
          });
        },
      },
    }
  );
  
  // Check if the user is authenticated
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Get the pathname from the URL
  const { pathname } = req.nextUrl;

  // Define protected routes and their required roles
  const protectedRoutes = [
    { path: '/admin', roles: ['ADMIN'] },
    { path: '/account', roles: ['USER', 'ADMIN'] },
    { path: '/checkout', roles: ['USER', 'ADMIN'] },
  ];

  // Check if the current path is a protected route
  const matchedRoute = protectedRoutes.find(route => 
    pathname.startsWith(route.path)
  );

  // If the route is protected but the user is not authenticated, redirect to login
  if (matchedRoute && !session) {
    const redirectUrl = new URL('/auth/login', req.url);
    redirectUrl.searchParams.set('redirectTo', pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // If the route is protected and the user is authenticated, check role
  if (matchedRoute && session) {
    // Get user role from Supabase
    const { data: userData, error } = await supabase
      .from('User')
      .select('role')
      .eq('id', session.user.id)
      .single();

    // If there's an error or the user doesn't have the required role, redirect to unauthorized
    if (error || !userData || !matchedRoute.roles.includes(userData.role)) {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }
  }

  return res;
}

// Only run middleware on matching routes
export const config = {
  matcher: ['/admin/:path*', '/account/:path*', '/checkout/:path*'],
};
