// middleware.ts
import { type NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { RouteGroups, Routes } from '@/src/shared/constants';
import { FeatureFlag, UserRole } from '@/src/shared/enums';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  let response = NextResponse.next({ request });

  // ── Supabase session refresh ─────────────────────
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  // ── Maintenance mode check ───────────────────────
  // TODO: check feature_flags table for MAINTENANCE_MODE
  // if (maintenanceMode && !pathname.startsWith('/maintenance')) {
  //   return NextResponse.redirect(new URL('/maintenance', request.url));
  // }

  // ── Dashboard: require auth ──────────────────────
  if (pathname.startsWith(RouteGroups.DASHBOARD)) {
    if (!user) {
      return NextResponse.redirect(new URL(Routes.LOGIN, request.url));
    }
  }

  // ── Admin: require auth + admin role ────────────
  if (pathname.startsWith(RouteGroups.ADMIN)) {
    if (!user) {
      return NextResponse.redirect(new URL(Routes.LOGIN, request.url));
    }

    // Role is fetched per-request from DB — never trust JWT for role
    const { data: profile } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single();

    const adminRoles: string[] = [UserRole.ADMIN, UserRole.SUPER_ADMIN];
    if (!profile || !adminRoles.includes(profile.role)) {
      return NextResponse.redirect(new URL(Routes.DASHBOARD, request.url));
    }
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
