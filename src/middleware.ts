import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getSousDomaine } from "@/lib/get-sous-domaine"

// Cache pour stocker les résultats de validation des sous-domaines
const subdomainCache: Record<string, { valid: boolean; timestamp: number }> = {}
const CACHE_TTL = 60 * 60 * 1000 // 1 heure en millisecondes

export default async function middleware(req: NextRequest) {
    const session = await auth()
    const { pathname } = req.nextUrl
    const hostname = req.headers.get("host") || ""
    const mainDomain = process.env.NEXT_PUBLIC_MAIN_DOMAIN || "julianmayer.fr"

    console.log("Middleware processing:", hostname, pathname)

    // Vérifier si nous sommes sur un sous-domaine d'établissement
    const sousDomaine = getSousDomaine(hostname)
    console.log("Sous domaine détecté:", sousDomaine)

    // Si nous sommes sur un sous-domaine
    if (sousDomaine) {
        // Routes publiques pour les sous-domaines
        const publicRoutes = ["/sign-in"]
        const isPublicRoute = publicRoutes.some((route) => pathname === route || pathname.startsWith(route + "/"))

        try {
            let isValid = false
            const now = Date.now()

            // Vérifier le cache d'abord
            if (subdomainCache[sousDomaine] && now - subdomainCache[sousDomaine].timestamp < CACHE_TTL) {
                isValid = subdomainCache[sousDomaine].valid
                console.log("Utilisation du cache pour", sousDomaine, "- Valide:", isValid)
            } else {
                // Construire l'URL complète pour l'API
                // Important: Utiliser le domaine principal pour l'API, pas le sous-domaine
                const apiUrl = `https://${mainDomain}/api/validate-subdomain?domain=${encodeURIComponent(sousDomaine)}`
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
                        console.log("Réponse API pour", sousDomaine, "- Valide:", isValid)

                        // Mettre en cache le résultat
                        subdomainCache[sousDomaine] = { valid: isValid, timestamp: now }
                    } else {
                        console.error("Erreur API:", response.status)
                    }
                } catch (fetchError) {
                    console.error("Erreur lors de l'appel API:", fetchError)
                }
            }

            // Si le sous-domaine n'existe pas, rediriger vers le domaine principal
            if (!isValid) {
                console.log("Sous-domaine invalide, redirection vers le domaine principal")
                // Ajouter un paramètre pour éviter la boucle de redirection
                return NextResponse.redirect(`https://${mainDomain}/?redirected=true`)
            }

            // Si l'utilisateur n'est pas connecté et essaie d'accéder à une route protégée
            if (!session && !isPublicRoute) {
                const url = new URL("/sign-in", req.url)
                url.searchParams.set("callbackUrl", encodeURI(pathname))
                return NextResponse.redirect(url)
            }
        } catch (error) {
            console.error("Erreur lors de la vérification du sous-domaine:", error)
        }

        return NextResponse.next()
    } else {
        // Nous sommes sur le domaine principal
        // Vérifier si nous venons d'être redirigés pour éviter une boucle
        const url = new URL(req.url)
        if (url.searchParams.get("redirected") === "true") {
            // Supprimer le paramètre et continuer
            url.searchParams.delete("redirected")
            return NextResponse.rewrite(url)
        }

        // Routes publiques pour le domaine principal
        const publicRoutes = ["/sign-in", "/"]
        const isPublicRoute = publicRoutes.some((route) => pathname === route || pathname.startsWith(route + "/"))

        // Si l'utilisateur n'est pas connecté et essaie d'accéder à une route protégée
        if (!session && !isPublicRoute) {
            const url = new URL("/sign-in", req.url)
            url.searchParams.set("callbackUrl", encodeURI(pathname))
            return NextResponse.redirect(url)
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
