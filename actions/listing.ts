"use server";
import { listingSchema } from "@/schemas/listing.schema";
import { getCurrentUser } from "./getCurrentUser";
import { FieldValues } from "react-hook-form";

import prisma from "@/lib/prismadb";
import { SafeUser } from "@/types";

export async function createListing(data: FieldValues) {
	const validatedData = listingSchema.safeParse(data);

	if (!validatedData.success) {
		throw new Error("Invalid Data");
	}

	const {
		category,
		location,
		guestCount,
		roomCount,
		bathroomCount,
		imageSrc,
		price,
		title,
		description,
	} = validatedData.data;

	const currentUser = await getCurrentUser();
	if (!currentUser) throw new Error("Invalid credentials");

	const listing = await prisma?.listing.create({
		data: {
			category,
			locationValue: location.value,
			guestCount,
			roomCount,
			bathroomCount,
			imageSrc,
			price: parseInt(price),
			title,
			description,
			userId: currentUser.id,
		},
	});

	if (listing) {
		return listing;
	}

	throw new Error("an error accurded when try to create new airbnb's!");
}

export async function getListing() {
	try {
		const listingData = await prisma.listing.findMany({
			orderBy: {
				createdAt: "desc",
			},
		});

		return listingData;
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(error.message);
		}

		throw new Error(
			"an error accurded when try to get listing data , please try again!",
		);
	}
}

export async function addToFavorite(
	listingId: string,
	currentUser?: SafeUser | null,
) {
	try {
		if (!currentUser?.email) {
			throw new Error("Invalid Credentials");
		}

		if (typeof listingId !== "string") throw new Error("Invalid Id");

		const favoriteIdList = [...currentUser.favoriteIds, listingId];

		const result = await prisma.user.update({
			where: {
				id: currentUser.id,
			},
			data: {
				favoriteIds: favoriteIdList,
			},
		});

		return result;
	} catch (error) {
		if (error instanceof Error) throw new Error(error.message);

		throw new Error(
			"An error accurded when try to add item to the favorite list , please try again",
		);
	}
}
export async function deleteFavorite(
	listingId: string,
	currentUser?: SafeUser | null,
) {
	try {
		if (!currentUser?.email) {
			throw new Error("Invalid Credentials");
		}

		if (typeof listingId !== "string") throw new Error("Invalid Id");

		const favoriteIds = currentUser.favoriteIds.filter(
			(id) => id !== listingId,
		);

		const result = await prisma.user.update({
			where: {
				id: currentUser.id,
			},
			data: {
				favoriteIds,
			},
		});

		return result;
	} catch (error) {
		if (error instanceof Error) throw new Error(error.message);

		throw new Error(
			"An error accurded when try to remove item from favorited list , please try again",
		);
	}
}
