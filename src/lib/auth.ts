import NextAuth from "next-auth"
import Credentials from 'next-auth/providers/credentials'

export const { auth, handlers, signIn } = NextAuth({
    secret: process.env.NEXTAUTH_SECRET,
    providers: [Credentials({
        credentials: {
            email: {},
            password: {}
        },
        authorize : async (credentials) => {

            const email = 'admin@admin.fr'
            const password = '123'

            if (credentials.email === email && credentials.password === password) {

                return {email, password}
            } else {
               throw new Error("invalid credentials")
            }
        },
    })],
    callbacks: {
        async redirect({ baseUrl }) {
            // For example, always go to / on success
            return baseUrl;
        },
        // or handle other logic
    }

})