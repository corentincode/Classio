import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { PrismaClient } from "@prisma/client"
import { signInSchema } from "@/lib/zod"

const prisma = new PrismaClient()

// Ajoute ceci au début de ton fichier (auth.ts)



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
                token.id = user.id
            }
            return token
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string
            }
            return session
        },
    },
    pages: {
        signIn: "/sign-in",
        error: "/",
    },
})

