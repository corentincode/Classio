import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export default async function middleware(req: NextRequest) {
    const session = await auth()
    const { pathname } = req.nextUrl
    const hostname = req.headers.get("host") || ""

    console.log("Middleware exécuté pour:", hostname, pathname)

    // Vérifier si nous sommes sur un sous-domaine d'établissement
    const sousDomaine = getSousDomaine(hostname)
    console.log("Sous-domaine détecté:", sousDomaine)

    // Si nous sommes déjà sur la page de redirection, ne pas vérifier le sous-domaine
    // Cela évite la boucle infinie
    if (pathname === "/api/redirect-to-main") {
        return NextResponse.next()
    }

    // Routes publiques qui ne nécessitent pas d'authentification
    const publicRoutes = ["/sign-in", "/api"]

    // Sur le domaine principal, "/" est également public
    if (!sousDomaine) {
        publicRoutes.push("/")
    }

    const isPublicRoute = publicRoutes.some((route) => pathname === route || pathname.startsWith(route + "/"))
    console.log("Est une route publique:", isPublicRoute)

    if (sousDomaine) {
        try {
            const apiUrl = `${req.nextUrl.origin}/api/check-sous-domaine?sousDomaine=${sousDomaine}`
            const response = await fetch(apiUrl)
            const data = await response.json()

            // Si le sous-domaine n'existe pas dans la base de données
            if (!response.ok || !data.exists) {
                console.log("Sous-domaine non trouvé dans la base de données:", sousDomaine)

                // Rediriger vers une API spéciale qui gère la redirection vers le domaine principal
                // Cette approche évite la boucle infinie
                return NextResponse.redirect(new URL("/api/redirect-to-main", req.url))
            }

            console.log("Sous-domaine valide trouvé:", sousDomaine)
            // Stocker le sous-domaine dans les headers
            const requestHeaders = new Headers(req.headers)
            requestHeaders.set("x-sous-domaine", sousDomaine)
            if (data.etablissementId) {
                requestHeaders.set("x-etablissement-id", data.etablissementId)
            }

            // Si l'utilisateur accède à la page d'accueil sur un sous-domaine, rediriger vers sign-in
            if (pathname === "/" ) {
                console.log("Redirection vers /sign-in depuis la racine du sous-domaine")
                return NextResponse.redirect(new URL("/sign-in", req.url))
            }

            // Si l'utilisateur n'est pas connecté et essaie d'accéder à une route protégée
            if (!session && !isPublicRoute) {
                console.log("Redirection vers /sign-in depuis une route protégée")
                const url = new URL("/sign-in", req.url)
                url.searchParams.set("callbackUrl", encodeURI(pathname))
                return NextResponse.redirect(url)
            }

            return NextResponse.next({
                request: {
                    headers: requestHeaders,
                },
            })

        } catch (error) {
            console.error("Erreur lors de la vérification du sous-domaine:", error)

            // En cas d'erreur, continuer sans vérification
            const requestHeaders = new Headers(req.headers)
            requestHeaders.set("x-sous-domaine", sousDomaine)

            return NextResponse.next({
                request: {
                    headers: requestHeaders,
                },
            })
        }
    }

    // Si nous sommes sur le domaine principal
    if (!session && !isPublicRoute) {
        console.log("Redirection vers /sign-in depuis le domaine principal")
        const url = new URL("/sign-in", req.url)
        url.searchParams.set("callbackUrl", encodeURI(pathname))
        return NextResponse.redirect(url)
    }

    return NextResponse.next()
}

// Fonction pour extraire le sous-domaine de l'hôte
function getSousDomaine(hostname: string): string | null {
    console.log("Analyse de l'hôte:", hostname)

    // Gestion spéciale pour localhost en développement
    if (hostname.includes("localhost")) {
        // Format attendu: sous-domaine.localhost:port
        const parts = hostname.split(".")

        // Si nous avons un format comme "t.localhost:3000"
        if (parts.length > 1 && parts[0] !== "localhost") {
            console.log("Sous-domaine localhost détecté:", parts[0])
            return parts[0]
        }

        return null
    }

    // Pour les domaines de production
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