"use server";
import prisma from "@/lib/prismadb";
import bcrypt from "bcryptjs";
import * as z from "zod";
import { registerSchema } from "@/schemas/auth/register.schema";
import { loginSchema } from "@/schemas/auth/login.schema";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";

export const register = async (values: z.infer<typeof registerSchema>) => {
	const validatedFields = registerSchema.safeParse(values);
	if (!validatedFields.success) {
		throw new Error("Invalid Fields!");
	}
	const { password, email, username } = validatedFields.data;

	const hashedPassword = await bcrypt.hash(password, 12);

	const user = await prisma.user.create({
		data: {
			email,
			name: username,
			hashedPassword,
		},
	});

	return user;
};

export const login = async (values: z.infer<typeof loginSchema>) => {
	const validatedFields = loginSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: "Invalid Fields" };
	}

	const { email, password } = validatedFields.data;

	try {
		await signIn("credentials", {
			email,
			password,
			redirectTo: DEFAULT_LOGIN_REDIRECT,
		});
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case "CredentialsSignin":
					return { error: "Invalid credentials" };
				default:
					return { error: "Something went wrong" };
			}
		}

		throw error;
	}
};
