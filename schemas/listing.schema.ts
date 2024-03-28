import * as z from "zod";

export const listingSchema = z.object({
	category: z.string().min(1, { message: "required" }),
	location: z.object({
		value: z.string(),
		label: z.string(),
		flag: z.string(),
		region: z.string(),
	}),
	guestCount: z.number(),
	roomCount: z.number(),
	bathroomCount: z.number(),
	imageSrc: z.string().min(1, { message: "required" }),
	price: z.string(),
	title: z.string().min(1, { message: "required" }),
	description: z.string().min(1, { message: "required" }),
});
