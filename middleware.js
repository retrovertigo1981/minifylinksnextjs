// middleware.js (en la raíz del proyecto)
import { NextResponse } from 'next/server';
import { verifyTokenFromString } from './utils/JWT';

export function middleware(request) {
    // Proteger rutas del dashboard
    if (request.nextUrl.pathname.startsWith('/dashboard')) {
        const token = request.cookies.get('Bearer')?.value;
        const user = verifyTokenFromString(token);

        if (!user) {
            return NextResponse.redirect(new URL('/login', request.url));
        }

        // Para áreas de admin (cuando implementes roles)
        if (request.nextUrl.pathname.startsWith('/dashboard/admin') && user.role !== 'admin') {
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*']
};