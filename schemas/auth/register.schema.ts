import * as z from "zod";

export const registerSchema = z
	.object({
		email: z.string().email().min(1, { message: "Email is required" }),
		username: z.string().min(1, { message: "Username is required" }),
		password: z
			.string()
			.min(6, { message: "Password must be more than 8 characters" }),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});
