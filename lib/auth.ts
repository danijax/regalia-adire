import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { prisma } from "@/lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                console.log("[AUTH] Authorize called with email:", credentials?.email);

                if (!credentials?.email || !credentials?.password) {
                    console.log("[AUTH] Missing credentials");
                    return null;
                }

                console.log("[AUTH] Looking up admin user...");
                const admin = await prisma.admin.findUnique({
                    where: {
                        email: credentials.email as string,
                    },
                });

                if (!admin) {
                    console.log("[AUTH] Admin not found");
                    return null;
                }

                console.log("[AUTH] Admin found, comparing password...");
                const isPasswordValid = await compare(
                    credentials.password as string,
                    admin.password
                );

                console.log("[AUTH] Password valid:", isPasswordValid);
                if (!isPasswordValid) {
                    return null;
                }

                console.log("[AUTH] Login successful for:", admin.email);
                return {
                    id: admin.id,
                    email: admin.email,
                    name: admin.name,
                    role: admin.role,
                };
            },
        }),
    ],
    pages: {
        signIn: "/admin/login",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.role = token.role as string;
            }
            return session;
        },
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
    trustHost: true,
});
