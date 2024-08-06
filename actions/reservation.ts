"use server";

import { getCurrentUser } from "./getCurrentUser";

export async function createReservation(
	totalPrice: number,
	startDate: Date,
	endDate: Date,
	listingId: string,
) {
	try {
		const currentUser = await getCurrentUser();
		if (!currentUser) {
			return {
				success: false,
				message: "Need to login to continue!",
			};
		}

		if (!totalPrice || !startDate || !endDate || !listingId) {
			return { success: false, message: "Failded to load data" };
		}

		const listingAndReservation = await prisma?.listing.update({
			where: {
				id: listingId,
			},
			data: {
				reservations: {
					create: {
						userId: currentUser.id,
						startDate,
						endDate,
						totalPrice,
					},
				},
			},
		});

		if (listingAndReservation) {
			return {
				success: true,
				message: "Successfully Reserved!",
			};
		}
	} catch (error) {
		if (error instanceof Error)
			return {
				success: false,
				message: error.message,
			};
	}
}

interface getReservationParams {
	listingId?: string;
	userId?: string;
	authorId?: string;
}

export async function getReservations(params: getReservationParams) {
	try {
		const { listingId, userId, authorId } = params;

		const query: any = {};

		if (listingId) {
			query.listingId = listingId;
		}

		if (userId) {
			query.userId = userId;
		}

		if (authorId) {
			query.listing = { userId: authorId };
		}

		const reservations = await prisma?.reservation.findMany({
			where: query,
			include: {
				listing: true,
			},
			orderBy: {
				createdAt: "desc",
			},
		});

		const safeReservations = reservations?.map((reservation) => ({
			...reservation,
			createdAt: reservation.createdAt.toISOString(),
			startDate: reservation.startDate.toISOString(),
			endDate: reservation.endDate.toISOString(),
			listing: {
				...reservation.listing,
				createdAt: reservation.listing.createdAt.toISOString(),
			},
		}));

		return safeReservations;
	} catch (error) {
		if (error instanceof Error) throw new Error(error.message);
	}
}
