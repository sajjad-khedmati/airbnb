"use client";
import { useFavorite } from "@/hooks/useFavorite";
import { cn } from "@/lib/utils";
import { SafeUser } from "@/types";
import { Heart } from "lucide-react";
import React from "react";

interface FavoriteButtonProps {
	currentUser?: SafeUser | null;
	listingId: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
	currentUser,
	listingId,
}) => {
	const { hasFavorited, toggleFavorite } = useFavorite(listingId, currentUser);
	return (
		<div
			className="relative top-2 right-1 z-20 p-1 rounded-full"
			onClick={toggleFavorite}
		>
			<Heart className="size-5 absolute top-2 right-2 text-white" />
			<Heart
				className={cn(
					"size-5 absolute top-2 right-2 text-white hover:text-rose-500",
					hasFavorited ? "fill-rose-500" : "fill-neutral-400/50",
				)}
			/>
		</div>
	);
};

export default FavoriteButton;
