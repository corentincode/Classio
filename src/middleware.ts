import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"
import { Role } from "@prisma/client"
import { getSousDomaine } from "@/lib/get-sous-domaine"
const subdomainCache: Record<string, { valid: boolean; timestamp: number }> = {}
const CACHE_TTL = 60 * 60 * 1000 // 1 heure en millisecondes
export default async function middleware(req: NextRequest) {
    const session = await auth()
    const { pathname } = req.nextUrl
    const hostname = req.headers.get("host") || ""

    // Routes publiques qui ne nécessitent pas d'authentification
    const publicRoutes = ["/sign-in", "/"]
    let isPublicRoute = publicRoutes.some((route) => pathname === route || pathname.startsWith(route + "/"))

    // Vérifier si nous sommes sur un sous-domaine d'établissement
    // Exemple: si l'URL est jean-moulin.example.com, sousDomaine = "jean-moulin"
    const sousDomaine = getSousDomaine(hostname)
    console.log("sous domaine :"+ sousDomaine)
    // Si nous sommes sur un sous-domaine, vérifier s'il correspond à un établissement
    if (sousDomaine) {
        const publicRoutes = ["/sign-in"]
        isPublicRoute = publicRoutes.some((route) => pathname === route || pathname.startsWith(route + "/"))
        try {
            let isValid = false
            const now = Date.now()

            // Vérifier le cache d'abord
            if (subdomainCache[sousDomaine] && now - subdomainCache[sousDomaine].timestamp < CACHE_TTL) {
                isValid = subdomainCache[sousDomaine].valid
            } else {
                // Appeler l'API pour valider le sous-domaine
                const response = await fetch(`${req.nextUrl.origin}/api/validate-subdomain?domain=${sousDomaine}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                })

                if (response.ok) {
                    const data = await response.json()
                    isValid = data.valid

                    // Mettre en cache le résultat
                    subdomainCache[sousDomaine] = { valid: isValid, timestamp: now }
                }
            }

            // Si le sous-domaine n'existe pas, rediriger vers le domaine principal
            if (!isValid) {
                const mainDomain = process.env.NEXT_PUBLIC_MAIN_DOMAIN || "julianmayer.fr"
                return NextResponse.redirect(`https://www.${mainDomain}/`)
            }

            // Si l'utilisateur n'est pas connecté et essaie d'accéder à une route protégée
            if (!session && !isPublicRoute) {
                const url = new URL("/sign-in", req.url)
                url.searchParams.set("callbackUrl", encodeURI(pathname))
                return NextResponse.redirect(url)
            }
        } catch (error) {
            console.error("Error checking subdomain:", error)
            // En cas d'erreur, continuer avec la requête
        }

        return NextResponse.next()
    }

    // Si nous sommes sur le domaine principal
    if (!session && !isPublicRoute) {
        const url = new URL("/sign-in", req.url)
        url.searchParams.set("callbackUrl", encodeURI(pathname))
        return NextResponse.redirect(url)
    }

    return NextResponse.next()
}



export const config = {
    matcher: [
        /*
         * Matcher uniquement les pages nécessaires :
         */
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ],
}
