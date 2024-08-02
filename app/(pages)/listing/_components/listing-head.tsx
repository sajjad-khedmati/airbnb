import FavoriteButton from "@/app/_components/listing/favorite-button";
import useCountries from "@/hooks/useCountries";
import { SafeUser } from "@/types";
import Image from "next/image";
import React, { Fragment } from "react";

interface ListingHeadProps {
	title: string;
	locationValue: string;
	imageSrc: string;
	id: string;
	currentUser?: SafeUser | null;
}

const ListingHead: React.FC<ListingHeadProps> = ({
	locationValue,
	imageSrc,
	id,
	currentUser,
	title,
}) => {
	const { getByValue } = useCountries();
	const location = getByValue(locationValue);
	return (
		<Fragment>
			<div className="space-y-[1px]">
				<h1 className="font-bold text-lg">{title}</h1>
				<p className="text-sm">
					{location?.region} , {location?.label}
				</p>
			</div>

			<div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
				<Image
					src={imageSrc}
					alt={`${title} Banner`}
					fill
					className="object-cover w-full"
				/>
				<div className="absolute top-1 right-2">
					<FavoriteButton listingId={id} currentUser={currentUser} />
				</div>
			</div>
		</Fragment>
	);
};

export default ListingHead;
