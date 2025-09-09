import NextAuth, { NextAuthOptions } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { jwtDecode } from "jwt-decode";
export const NextOptions: NextAuthOptions = {
    pages: {
        signIn: "/login",
    },
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: {},
                password: {}
            },
            async authorize(credentials) {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signin`, {
                    method: "post",
                    body: JSON.stringify({
                        email: credentials?.email,
                        password: credentials?.password
                    }),
                    headers: {
                        'content-type': "application/json"
                    }
                })
                const data = await res.json()
                if (data.message == 'success') {
                    const decodedToken: { id: string } = jwtDecode(data.token)
                    return {
                        id: decodedToken.id,
                        userData: data.user,
                        tokenData: data.token
                    }
                } else {
                    throw new Error(data.message)
                }
            }
        })
    ],
    callbacks: {
        // token ,user encrypt secert and cookies
        async jwt({ token, user }) {

            if (user) {
                token.token = user.tokenData
                token.user = user.userData
            }
            return token
        },
        // user
        async session({ session, token }) {
            session.user = token.user
            return session
        },
    }
}

const handler = NextAuth(NextOptions)

export { handler as GET, handler as POST }


