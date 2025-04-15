import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getSousDomaine } from "@/lib/get-sous-domaine"

export default async function middleware(req: NextRequest) {
    const session = await auth()
    const { pathname } = req.nextUrl
    const hostname = req.headers.get("host") || ""
    const mainDomain = process.env.NEXT_PUBLIC_MAIN_DOMAIN || "julianmayer.fr"

    console.log("[MIDDLEWARE] Processing:", hostname, pathname)

    // Vérifier si nous sommes sur un sous-domaine d'établissement
    const sousDomaine = getSousDomaine(hostname)
    console.log("[MIDDLEWARE] Sous domaine détecté:", sousDomaine)

    // Routes publiques pour tous les domaines
    const publicRoutes = ["/sign-in", "/api", "/_next", "/favicon.ico"]
    const isPublicRoute = publicRoutes.some((route) => pathname === route || pathname.startsWith(route + "/"))

    // Si nous sommes sur un sous-domaine
    if (sousDomaine) {
        try {
            // Valider le sous-domaine
            console.log("[MIDDLEWARE] Validation du sous-domaine:", sousDomaine)
            const validateResponse = await fetch(
                `https://${mainDomain}/api/validate-subdomain?domain=${encodeURIComponent(sousDomaine)}&_middleware=true`,
                {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                },
            )

            if (!validateResponse.ok) {
                console.error("[MIDDLEWARE] Erreur de validation du sous-domaine:", validateResponse.status)
                return NextResponse.redirect(`https://${mainDomain}/`)
            }

            const validateData = await validateResponse.json()
            if (!validateData.valid || !validateData.etablissementId) {
                console.log("[MIDDLEWARE] Sous-domaine invalide, redirection vers le domaine principal")
                return NextResponse.redirect(`https://${mainDomain}/`)
            }

            const etablissementId = validateData.etablissementId

            // Récupérer les informations de l'établissement
            const etablissementResponse = await fetch(
                `https://${mainDomain}/api/etablissement/${etablissementId}?_middleware=true`,
                {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                    cache: "no-store",
                },
            )

            let etablissementData = null
            if (etablissementResponse.ok) {
                etablissementData = await etablissementResponse.json()
                console.log("[MIDDLEWARE] Données établissement:", JSON.stringify(etablissementData))
                // Ne pas utiliser localStorage ici - c'est côté serveur
            } else {
                console.error(
                    "[MIDDLEWARE] Erreur de récupération des informations établissement:",
                    etablissementResponse.status,
                )
            }

            // Si l'utilisateur est connecté
            if (session?.user) {
                console.log("[MIDDLEWARE] Utilisateur connecté:", session.user.id)

                // Récupérer les informations de l'utilisateur
                const userResponse = await fetch(`https://${mainDomain}/api/user/${session.user.id}?_middleware=true`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                    cache: "no-store", // Important: ne pas mettre en cache cette requête
                })

                if (!userResponse.ok) {
                    console.error("[MIDDLEWARE] Erreur de récupération des informations utilisateur:", userResponse.status)
                    // Si on ne peut pas récupérer les infos utilisateur, on le déconnecte
                    if (userResponse.status === 401 || userResponse.status === 403) {
                        return NextResponse.redirect(`https://${mainDomain}/sign-in`)
                    }
                    // Sinon on continue, mais on log l'erreur
                    const response = NextResponse.next()
                    // Définir le cookie pour le client
                    response.cookies.set("etablissement_id", etablissementId, {
                        path: "/",
                        sameSite: "strict",
                        secure: process.env.NODE_ENV === "production",
                        maxAge: 60 * 60 * 24 * 7, // 1 semaine
                    })
                    return response
                }

                const userData = await userResponse.json()
                console.log("[MIDDLEWARE] Données utilisateur:", JSON.stringify(userData))

                // Vérifier si l'utilisateur est SUPER_ADMIN
                if (userData.role === "SUPER_ADMIN") {
                    console.log("[MIDDLEWARE] Utilisateur SUPER_ADMIN, accès autorisé")
                    // On continue avec les informations de l'établissement déjà récupérées
                    const response = NextResponse.next()
                    // Définir le cookie pour le client
                    response.cookies.set("etablissement_id", etablissementId, {
                        path: "/",
                        sameSite: "strict",
                        secure: process.env.NODE_ENV === "production",
                        maxAge: 60 * 60 * 24 * 7, // 1 semaine
                    })
                    return response
                }

                // Vérifier si l'utilisateur appartient à cet établissement
                if (userData.etablissementId !== etablissementId) {
                    console.log("[MIDDLEWARE] L'utilisateur n'appartient pas à cet établissement")

                    // Récupérer le sous-domaine de l'établissement de l'utilisateur
                    if (userData.etablissementId) {
                        const userEstablishmentResponse = await fetch(
                            `https://${mainDomain}/api/etablissement/${userData.etablissementId}?_middleware=true`,
                            {
                                method: "GET",
                                headers: { "Content-Type": "application/json" },
                                cache: "no-store", // Important: ne pas mettre en cache cette requête
                            },
                        )

                        if (userEstablishmentResponse.ok) {
                            const userEstablishment = await userEstablishmentResponse.json()

                            if (userEstablishment.sousDomaine) {
                                console.log(
                                    "[MIDDLEWARE] Redirection vers l'établissement de l'utilisateur:",
                                    userEstablishment.sousDomaine,
                                )
                                return NextResponse.redirect(`https://${userEstablishment.sousDomaine}.${mainDomain}${pathname}`)
                            }
                        } else {
                            console.error(
                                "[MIDDLEWARE] Erreur de récupération de l'établissement de l'utilisateur:",
                                userEstablishmentResponse.status,
                            )
                        }
                    }

                    // Si on ne peut pas rediriger vers l'établissement de l'utilisateur, on redirige vers le domaine principal
                    return NextResponse.redirect(`https://${mainDomain}/`)
                }
            }

            // Si l'utilisateur n'est pas connecté et essaie d'accéder à une route protégée
            if (!session && !isPublicRoute) {
                console.log("[MIDDLEWARE] Utilisateur non connecté, redirection vers la page de connexion")
                const url = new URL("/sign-in", req.url)
                url.searchParams.set("callbackUrl", encodeURI(pathname))
                return NextResponse.redirect(url)
            }

            // L'utilisateur est autorisé à accéder à cette page
            const response = NextResponse.next()

            // Définir le cookie pour le client
            response.cookies.set("etablissement_id", etablissementId, {
                path: "/",
                sameSite: "strict",
                secure: process.env.NODE_ENV === "production",
                maxAge: 60 * 60 * 24 * 7, // 1 semaine
            })

            return response
        } catch (error) {
            console.error("[MIDDLEWARE] Erreur:", error)
            // En cas d'erreur, rediriger vers le domaine principal
            return NextResponse.redirect(`https://${mainDomain}/`)
        }
    } else {
        // Nous sommes sur le domaine principal
        // Si l'utilisateur n'est pas connecté et essaie d'accéder à une route protégée
        if (!session && !isPublicRoute) {
            console.log(
                "[MIDDLEWARE] Utilisateur non connecté sur le domaine principal, redirection vers la page de connexion",
            )
            const url = new URL("/sign-in", req.url)
            url.searchParams.set("callbackUrl", encodeURI(pathname))
            return NextResponse.redirect(url)
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
