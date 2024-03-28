"use server";
import { auth } from "@/auth";

import prisma from "@/lib/prismadb";

export async function getCurrentUser() {
	try {
		const session = await auth();

		if (!session?.user?.email) {
			return null;
		}

		const currentUser = await prisma.user.findUnique({
			where: {
				email: session?.user?.email as string,
			},
		});

		if (!currentUser) {
			return null;
		}

		return {
			...currentUser,
			createdAt: currentUser.createdAt.toISOString(),
			updatedAt: currentUser.updatedAt.toISOString(),
			emailVerified: currentUser.emailVerified?.toISOString() || null,
		};
	} catch (error) {
		return null;
	}
}
