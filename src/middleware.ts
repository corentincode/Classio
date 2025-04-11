import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getSousDomaine } from "@/lib/get-sous-domaine"
import Cookies from "js-cookie"

// Cache pour stocker les résultats de validation des sous-domaines
const subdomainCache: Record<string, { valid: boolean; timestamp: number; etablissementId?: string }> = {}
const CACHE_TTL = 60 * 60 * 1000 // 1 heure en millisecondes

export default async function middleware(req: NextRequest) {
    const session = await auth()
    const { pathname } = req.nextUrl
    const hostname = req.headers.get("host") || ""
    const mainDomain = process.env.NEXT_PUBLIC_MAIN_DOMAIN || "julianmayer.fr"

    console.log("Middleware processing:", hostname, pathname)

    // Vérifier si nous avons déjà redirigé (via cookie)
    const redirectCookie = req.cookies.get("subdomain_redirect")
    if (redirectCookie?.value === "true") {
        // Nous avons déjà redirigé, ne pas rediriger à nouveau
        console.log("Redirection déjà effectuée, continuer sans rediriger")
        const response = NextResponse.next()
        // Effacer le cookie de redirection
        response.cookies.delete("subdomain_redirect")
        return response
    }

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
            let etablissementId = ""
            // Vérifier le cache d'abord
            if (subdomainCache[sousDomaine] && now - subdomainCache[sousDomaine].timestamp < CACHE_TTL) {
                isValid = subdomainCache[sousDomaine].valid
                etablissementId = subdomainCache[sousDomaine].etablissementId || ""

                console.log("Utilisation du cache pour", sousDomaine, "- Valide:", isValid)
            } else {
                // Utiliser une approche différente pour la validation
                // Au lieu d'appeler l'API, nous allons vérifier directement une liste de sous-domaines valides
                // Cette approche est temporaire jusqu'à ce que nous puissions résoudre le problème d'API
                // const apiUrl = `https://${mainDomain}/api/validate-subdomain?domain=${encodeURIComponent(sousDomaine)}`
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
                        console.log("Réponse API pour", JSON.stringify(data), "- Valide:", isValid)
                        etablissementId = data.etablissementId || ""

                        // Mettre en cache le résultat
                        subdomainCache[sousDomaine] = { valid: isValid, timestamp: now, etablissementId }
                    } else {
                        console.error("Erreur API:", response.status)
                    }
                } catch (fetchError) {
                    console.error("Erreur lors de l'appel API: ", fetchError)
                }

                // Mettre en cache le résultat
                subdomainCache[sousDomaine] = { valid: isValid, timestamp: now }
                console.log("Validation directe du sous-domaine:", sousDomaine, "- Valide:", isValid)
            }

            // Si le sous-domaine n'existe pas, rediriger vers le domaine principal
            if (!isValid) {
                console.log("Sous-domaine invalide, redirection vers le domaine principal")

                // Créer la réponse de redirection
                const response = NextResponse.redirect(`https://${mainDomain}/`)

                // Définir un cookie pour indiquer que nous avons déjà redirigé
                // Ce cookie empêchera une nouvelle redirection lorsque nous atteindrons le domaine principal
                response.cookies.set("subdomain_redirect", "true", {
                    maxAge: 10, // Courte durée de vie (10 secondes)
                    path: "/",
                    httpOnly: true,
                    sameSite: "strict",
                })

                return response
            }

            // Stocker l'ID de l'établissement dans un cookie pour l'utiliser dans les composants
            const response = NextResponse.next()
            console.log(etablissementId)
            // Vérifier que l'ID n'est pas vide avant de le stocker
            if (etablissementId && etablissementId.trim() !== "") {
                console.log("Stockage de l'ID d'établissement dans un cookie:", etablissementId)

                // Définir un cookie avec l'ID de l'établissement
                // Ce cookie n'est pas httpOnly pour qu'il soit accessible côté client
                response.cookies.set("etablissement_id", etablissementId, {
                    maxAge: 60 * 60 * 24 * 7, // 7 jours
                    path: "/",
                    sameSite: "lax", // Changer à "lax" pour une meilleure compatibilité
                    secure: process.env.NODE_ENV === "production", // Sécurisé uniquement en production
                })
            } else {
                console.error("ID d'établissement vide ou invalide:", etablissementId)
            }


            // Si l'utilisateur n'est pas connecté et essaie d'accéder à une route protégée
            if (!session && !isPublicRoute) {
                const url = new URL("/sign-in", req.url)
                url.searchParams.set("callbackUrl", encodeURI(pathname))
                return NextResponse.redirect(url)
            }
            return response
        } catch (error) {
            console.error("Erreur lors de la vérification du sous-domaine:", error)
        }

        return NextResponse.next()
    } else {
        // Nous sommes sur le domaine principal
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
