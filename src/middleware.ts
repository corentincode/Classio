import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getSousDomaine } from "@/lib/get-sous-domaine"

// Cache pour stocker les résultats de validation des sous-domaines
// Format: { "sous-domaine": { valid: boolean; timestamp: number } }
const subdomainCache: Record<string, { valid: boolean; timestamp: number }> = {}
const CACHE_TTL = 60 * 60 * 1000 // 1 heure en millisecondes

export default async function middleware(req: NextRequest) {
    const session = await auth()
    const { pathname } = req.nextUrl
    const hostname = req.headers.get("host") || ""

    console.log("Middleware processing request for:", hostname, pathname)

    // Routes publiques qui ne nécessitent pas d'authentification
    const publicRoutes = ["/sign-in", "/"]
    const isPublicRoute = publicRoutes.some((route) => pathname === route || pathname.startsWith(route + "/"))

    // Ignorer les routes API pour éviter les boucles infinies
    if (pathname.startsWith("/api/validate-subdomain")) {
        return NextResponse.next()
    }

    // Vérifier si nous sommes sur un sous-domaine d'établissement
    const sousDomaine = getSousDomaine(hostname)
    console.log("Sous domaine détecté:", sousDomaine)

    // Si nous sommes sur un sous-domaine
    if (sousDomaine) {
        try {
            let isValid = false
            const now = Date.now()

            // Vérifier le cache d'abord
            if (subdomainCache[sousDomaine] && now - subdomainCache[sousDomaine].timestamp < CACHE_TTL) {
                isValid = subdomainCache[sousDomaine].valid
                console.log("Utilisation du cache pour", sousDomaine, "- Valide:", isValid)
            } else {
                // Construire l'URL complète pour l'API
                const protocol = process.env.NODE_ENV === "production" ? "https" : "http"
                const mainDomain =
                    process.env.NEXT_PUBLIC_MAIN_DOMAIN ||
                    (process.env.NODE_ENV === "production" ? "your-production-domain.com" : "localhost:3000")
                const apiUrl = `${protocol}://${mainDomain}/api/validate-subdomain?domain=${encodeURIComponent(sousDomaine)}`

                console.log("Appel API pour valider le sous-domaine:", apiUrl)

                try {
                    const response = await fetch(apiUrl, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    })

                    if (response.ok) {
                        const data = await response.json()
                        isValid = data.valid
                        console.log("Réponse API pour", sousDomaine, "- Valide:", isValid, "- Données:", data)

                        // Mettre en cache le résultat
                        subdomainCache[sousDomaine] = { valid: isValid, timestamp: now }
                    } else {
                        console.error("Erreur API:", response.status, await response.text())
                    }
                } catch (fetchError) {
                    console.error("Erreur lors de l'appel API:", fetchError)
                    // En cas d'erreur d'API, on continue sans redirection
                    return NextResponse.next()
                }
            }

            // Si le sous-domaine n'existe pas, rediriger vers le domaine principal
            if (!isValid) {
                console.log("Sous-domaine invalide, redirection vers le domaine principal")
                const protocol = process.env.NODE_ENV === "production" ? "https" : "https"
                const mainDomain =
                    process.env.NEXT_PUBLIC_MAIN_DOMAIN ||
                    (process.env.NODE_ENV === "production" ? "julianmayer.fr" : "julianmayer.fr")
                return NextResponse.redirect(`${protocol}://${mainDomain}/`)
            }

            // Si l'utilisateur n'est pas connecté et essaie d'accéder à une route protégée
            if (!session && !isPublicRoute) {
                const url = new URL("/sign-in", req.url)
                url.searchParams.set("callbackUrl", encodeURI(pathname))
                return NextResponse.redirect(url)
            }
        } catch (error) {
            console.error("Erreur lors de la vérification du sous-domaine:", error)
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
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
