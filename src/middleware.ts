import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"

export default async function middleware(req: NextRequest) {
    const session = await auth()
    const { pathname } = req.nextUrl
    const hostname = req.headers.get("host") || ""

    // Routes publiques qui ne nécessitent pas d'authentification
    const publicRoutes = ["/sign-in", "/"]
    const isPublicRoute = publicRoutes.some((route) => pathname === route || pathname.startsWith(route + "/"))

    // Vérifier si nous sommes sur un sous-domaine d'établissement
    // Exemple: si l'URL est jean-moulin.example.com, sousDomaine = "jean-moulin"
    const sousDomaine = getSousDomaine(hostname)

    // Si nous sommes sur un sous-domaine, vérifier s'il correspond à un établissement
    if (sousDomaine) {
        // Stocker le sous-domaine dans les headers pour y accéder dans les composants
        const requestHeaders = new Headers(req.headers)
        requestHeaders.set("x-sous-domaine", sousDomaine)

        // Si l'utilisateur n'est pas connecté et essaie d'accéder à une route protégée
        if (!session && !isPublicRoute) {
            const url = new URL("/sign-in", req.url)
            url.searchParams.set("callbackUrl", encodeURI(pathname))
            return NextResponse.redirect(url)
        }

        // Si l'utilisateur est connecté, vérifier s'il appartient à cet établissement
        // if (session && session.user && session.user.etablissementId) {
        //     const etablissement = await prisma.etablissement.findUnique({
        //         where: { sousDomaine },
        //         select: { id: true },
        //     })
        //
        //     // Si l'établissement existe et que l'utilisateur n'y appartient pas, rediriger vers la page d'accueil
        //     if (etablissement && etablissement.id !== session.user.etablissementId && !isPublicRoute) {
        //         return NextResponse.redirect(new URL("/", req.url))
        //     }
        // }
        const etablissement = await prisma.etablissement.findUnique({
            where: { sousDomaine },
            select: { id: true },
        })


        return NextResponse.next({
            request: {
                headers: requestHeaders,
            },
        })
    }

    // Si nous sommes sur le domaine principal
    if (!session && !isPublicRoute) {
        const url = new URL("/sign-in", req.url)
        url.searchParams.set("callbackUrl", encodeURI(pathname))
        return NextResponse.redirect(url)
    }

    return NextResponse.next()
}

// Fonction pour extraire le sous-domaine de l'hôte
function getSousDomaine(hostname: string): string | null {
    // Ignorer localhost pour le développement
    if (hostname.includes("localhost")) return null

    // Exemple: pour jean-moulin.example.com, retourne "jean-moulin"
    const parts = hostname.split(".")
    if (parts.length > 2) {
        return parts[0]
    }
    return null
}

export const config = {
    matcher: [
        /*
         * Matcher uniquement les pages nécessaires :
         */
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ],
}
