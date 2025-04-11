import NextAuth, { DefaultSession } from "next-auth";


declare module "next-auth" {
  interface User {
    id: string;
    role: string; // <- assure-toi que c’est string
    etablissementId?: string
  }

  interface Session {
    user: User & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
  }
}