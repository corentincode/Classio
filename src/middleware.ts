// src/middleware.ts
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
    if (!req.auth) {
        const url = req.nextUrl.clone();
        url.pathname = '/sign-in';
        return NextResponse.redirect(url);
    }
});

// Les routes à protéger (toutes les routes sauf celles spécifiées ici)
export const config = {
    matcher: [
        /*
         * Match toutes les routes sauf celles spécifiées ci-dessous
         */
        "/((?!api|_next/static|_next/image|favicon.ico|sign-in).*)",
    ],
};
