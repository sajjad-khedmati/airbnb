"use client";
import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";

import { SafeUser } from "@/types";

import { toast } from "sonner";
import { addToFavorite, deleteFavorite } from "@/actions/listing";

export const useFavorite = (
	listingId: string,
	currentUser: SafeUser | null | undefined,
) => {
	const router = useRouter();

	const hasFavorited = useMemo(() => {
		const list = currentUser?.favoriteIds || [];

		return list.includes(listingId);
	}, [currentUser, listingId]);

	const toggleFavorite = useCallback(
		async (e: React.MouseEvent<HTMLDivElement>) => {
			e.stopPropagation();

			if (!currentUser) {
				router.push("/login");
			}

			try {
				if (hasFavorited) {
					await deleteFavorite(listingId, currentUser);
					toast("Removed", {
						description:
							"airbnb's successfully removed from your favorite list",
					});
				} else {
					await addToFavorite(listingId, currentUser);
					toast("Added", {
						description: "airbnb's successfully added to your favorite list",
					});
				}

				router.refresh();
			} catch (error) {
				if (error instanceof Error) return toast(error.message);
				return toast("Something went wrong");
			}
		},
		[currentUser, hasFavorited, listingId, router],
	);

	return {
		hasFavorited,
		toggleFavorite,
	};
};
