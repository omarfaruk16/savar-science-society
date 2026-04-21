import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import prisma from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { z } from "zod"
import { authConfig } from "./auth.config"
import { adminAuth } from "./firebase-admin"

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      id: "credentials",
      name: "Credentials",
      credentials: {
        identifier: { label: "Email or Phone", type: "text" },
        password: { label: "Password", type: "password" },
        firebaseToken: { type: "hidden" },
      },
      async authorize(credentials) {
        // 1. Check for Firebase Token
        if (credentials?.firebaseToken) {
          if (!adminAuth) {
            console.error("Firebase Admin not initialized. Check your .env file.");
            return null;
          }

          try {
            if (!process.env.AUTH_SECRET && process.env.NODE_ENV === "production") {
              console.error("CRITICAL: AUTH_SECRET is not set in production. Login will FAIL.");
            }

            const decodedToken = await adminAuth.verifyIdToken(credentials.firebaseToken as string);
            const email = decodedToken.email;

            if (!email) {
              console.error("Firebase Login Error: Token does not contain an email.");
              return null;
            }

            // Find or create user using upsert for atomic operation
            const user = await prisma.user.upsert({
              where: { email },
              update: {
                // Update profile image if it changed
                profileImage: decodedToken.picture || undefined,
              },
              create: {
                email,
                fullNameEn: decodedToken.name || email.split("@")[0],
                fullNameBn: decodedToken.name || email.split("@")[0],
                mobileNumber: decodedToken.phone_number || `fb_${decodedToken.uid}`,
                guardianNumber: "N/A",
                schoolName: "Not Specified",
                class: "6",
                address: "Not Specified",
                dateOfBirth: new Date(),
                profileImage: decodedToken.picture || null,
                provider: "firebase",
              }
            });

            return { id: user.id, email: user.email, role: user.role };
          } catch (error: any) {
            console.error("Firebase Auth Verification Error:", error.message || error);
            return null;
          }
        }

        // 2. Standard Credentials Login
        const parsedCredentials = z
          .object({ identifier: z.string(), password: z.string().min(6) })
          .safeParse(credentials)

        if (parsedCredentials.success) {
          const { identifier, password } = parsedCredentials.data

          // Check if identifier is email or phone
          const isEmail = identifier.includes("@")
          let user

          if (isEmail) {
             user = await prisma.user.findUnique({ where: { email: identifier } })
          } else {
             user = await prisma.user.findUnique({ where: { mobileNumber: identifier } })
          }

          if (!user) {
             // fallback to check admin
             const admin = await prisma.admin.findUnique({ where: { username: identifier } })
             if (admin) {
                const passwordsMatch = await bcrypt.compare(password, admin.passwordHash)
                if (passwordsMatch) return { id: admin.id, name: admin.username, role: "ADMIN" }
             }
             return null
          }

          if (!user.passwordHash) return null // Handled via OAuth/Firebase

          const passwordsMatch = await bcrypt.compare(password, user.passwordHash)

          if (passwordsMatch) return { id: user.id, email: user.email, role: user.role }
        }

        return null
      },
    }),
  ],
})
