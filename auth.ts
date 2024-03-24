import NextAuth from "next-auth";
import authConfig from "./auth-config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prismadb";

export const {
	handlers: { GET, POST },
	auth,
	signIn,
	signOut,
} = NextAuth({
	adapter: PrismaAdapter(prisma),
	...authConfig,

	session: {
		strategy: "jwt",
	},
	pages: {
		signIn: "/",
		error: "auth-error",
	},
	debug: process.env.NODE_ENV === "development",
	secret: process.env.NEXTAUTH_SECRET,
});
