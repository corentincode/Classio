// src/middleware.ts
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
    const { nextUrl } = req;

    const isLoggedIn = !!req.auth;
    const isSignInPage = nextUrl.pathname === '/sign-in';
    const isHomePage = nextUrl.pathname === '/';
    const isAboutPage = nextUrl.pathname === '/a-propos';
    const isContactPage = nextUrl.pathname === '/contact';
    const isRessourcesPage = nextUrl.pathname === '/ressources';
    const isTarificationPage = nextUrl.pathname === '/tarification';
    const isMentionsLegalesPage = nextUrl.pathname === '/mentions-legales';
    const isDocumentationPage = nextUrl.pathname === '/documentation';
    const isAvantagesPage = nextUrl.pathname === '/avantages';
    const isDashboardPage = nextUrl.pathname === '/dashboard';
    const isCalendarPage = nextUrl.pathname === '/dashboard/calendar';



    // Autoriser explicitement les routes non protégées
    if (isSignInPage || isHomePage || isAboutPage || isContactPage || isRessourcesPage || isTarificationPage || isMentionsLegalesPage || isDocumentationPage || isAvantagesPage || isDashboardPage || isCalendarPage) {
        return NextResponse.next();
    }

    // Si l'utilisateur n'est pas connecté, rediriger vers sign-in
    if (!isLoggedIn) {
        const url = nextUrl.clone();
        url.pathname = '/sign-in';
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
});

export const config = {
    matcher: [
        /*
         * Matcher uniquement les pages nécessaires :
         */
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ],
};