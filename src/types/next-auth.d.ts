import { DefaultSession, DefaultUser } from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
  /**
   * Étendre l'interface User
   */
  interface User extends DefaultUser {
    id?: string
    role?: string
    etablissementId?: string | null
  }

  /**
   * Étendre l'interface Session
   */
  interface Session {
    user: {
      id: string
      role?: string
      etablissementId?: string | null
    } & DefaultSession["user"]
  }
}

declare module "next-auth/jwt" {
  /**
   * Étendre l'interface JWT
   */
  interface JWT {
    id: string
    role?: string
    etablissementId?: string | null
  }
}