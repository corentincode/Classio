import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { PrismaClient } from "@prisma/client"
import { signInSchema } from "@/lib/zod"

const prisma = new PrismaClient()

// Fonction pour obtenir le domaine de base à partir de l'URL
function getBaseUrl(url: string | undefined) {
  if (!url) return process.env.NEXTAUTH_URL || 'http://localhost:3000'
  
  try {
    const urlObj = new URL(url)
    const hostname = urlObj.hostname
    
    // Vérifier si c'est un sous-domaine de classio.fr
    if (hostname.endsWith('.classio.fr')) {
      // Extraire le domaine de base (classio.fr)
      const parts = hostname.split('.')
      const baseDomain = parts.slice(-2).join('.')
      return `${urlObj.protocol}//${baseDomain}`
    }
    
    return url
  } catch (error) {
    console.error('Erreur lors de l\'analyse de l\'URL:', error)
    return process.env.NEXTAUTH_URL || 'http://localhost:3000'
  }
}

export const { auth, handlers, signIn, signOut } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                try {
                    // Validate credentials with Zod
                    const { email, password } = await signInSchema.parseAsync(credentials)

                    // Find user in database
                    const user = await prisma.user.findUnique({
                        where: { email },
                        select: { id: true, email: true, name: true, password: true, role: true, image: true, etablissementId: true },
                    })

                    // If no user found or password doesn't match
                    if (!user || !user.password) {
                        throw new Error("Identifiants invalides.")
                    }

                    // Compare password with hashed password in database
                    const isPasswordValid = await bcrypt.compare(password, user.password)

                    if (!isPasswordValid) {
                        throw new Error("Identifiants invalides.")
                    }

                    // Return user object (without password)
                    return {
                        id: user.id,
                        email: user.email,
                        name: user.name,
                        role: user.role,
                        image: user.image,
                        etablissementId: user.etablissementId,
                    }
                } catch (error) {
                    console.error("Authentication error:", error)
                    return null
                }
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                // Utiliser des opérateurs de coalescence nullish pour gérer les valeurs undefined
                token.id = user.id ?? token.id;
                token.role = user.role ?? token.role;
                token.etablissementId = user.etablissementId ?? token.etablissementId;
                console.log("User JWT callback", { user }); // <-- vérification
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                // Utiliser des opérateurs de coalescence nullish pour gérer les valeurs undefined
                session.user.id = token.id ?? session.user.id;
                session.user.role = token.role ?? session.user.role;
                session.user.etablissementId = token.etablissementId ?? session.user.etablissementId;
                console.log("Session callback", { session }); // <-- vérification
            }
            return session;
        },
    },
    pages: {
        signIn: "/sign-in",
        error: "/",
    },
    // Ajouter cette configuration pour les cookies
    cookies: {
        sessionToken: {
            name: `next-auth.session-token`,
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: process.env.NODE_ENV === "production",
                domain: process.env.NODE_ENV === "production" ? ".classio.fr" : undefined,
            },
        },
        callbackUrl: {
            name: `next-auth.callback-url`,
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: process.env.NODE_ENV === "production",
                domain: process.env.NODE_ENV === "production" ? ".classio.fr" : undefined,
            },
        },
        csrfToken: {
            name: `next-auth.csrf-token`,
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: process.env.NODE_ENV === "production",
                domain: process.env.NODE_ENV === "production" ? ".classio.fr" : undefined,
            },
        },
    },
})

// Exporter une fonction pour vérifier si un utilisateur a accès à un établissement
export async function hasAccessToEtablissement(userId: string, etablissementId: string) {
    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { 
                etablissementId: true,
                role: true 
            },
        })
        
        // Les super admins ont accès à tous les établissements
        if (user?.role === 'SUPER_ADMIN') {
            return true
        }
        
        // Vérifier si l'utilisateur appartient à cet établissement
        return user?.etablissementId === etablissementId
    } catch (error) {
        console.error('Erreur lors de la vérification des accès:', error)
        return false
    }
}