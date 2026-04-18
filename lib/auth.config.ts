import type { NextAuthConfig } from "next-auth"

export const authConfig = {
  trustHost: true,      
  providers: [],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = (user as any).role
        token.username = (user as any).username
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id as string
        (session.user as any).role = token.role as string
        if (token.username) {
            (session.user as any).username = token.username as string
        }
      }
      return session
    },
  },
  pages: {
    signIn: "/login",
  },
  session: { strategy: "jwt", maxAge: 24 * 60 * 60 }, // 24 hours
  cookies: {
    sessionToken: {
      name: `next-auth.session-token.savar-science`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
} satisfies NextAuthConfig
