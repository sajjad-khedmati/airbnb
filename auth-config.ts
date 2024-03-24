import bcrypt from "bcryptjs";
import { NextAuthConfig } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

import prisma from "@/lib/prismadb";

import { loginSchema } from "./schemas/auth/login.schema";

export default {
	providers: [
		GitHubProvider({
			clientId: process.env.GITHUB_CLIENT_ID as string,
			clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		}),
		Credentials({
			async authorize(credentials) {
				const validatedFields = loginSchema.safeParse(credentials);
				if (validatedFields.success) {
					const { email, password } = validatedFields.data;
					const user = await prisma.user.findUnique({
						where: {
							email,
						},
					});

					if (!user || !user.hashedPassword) {
						throw new Error("Invalid Credentials!");
					}

					const isCorrectPassword = await bcrypt.compare(
						password,
						user.hashedPassword,
					);

					if (!isCorrectPassword) {
						throw new Error("Invalid Credentials!");
					}

					return user;
				}

				throw new Error("Invalid Credentials!");
			},
		}),
	],
} satisfies NextAuthConfig;
