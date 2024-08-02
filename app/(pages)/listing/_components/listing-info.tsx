"user client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useCountries from "@/hooks/useCountries";
import { SafeUser } from "@/types";
import React, { useEffect, useState } from "react";
import { IconType } from "react-icons";
import ListingCategory from "./listing-category";
import { User2Icon } from "lucide-react";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/components/map"));

interface ListingInfoProps {
	user: SafeUser;
	description: string;
	guestCount: number;
	roomCount: number;
	bathroomCount: number;
	category:
		| {
				icon: IconType;
				label: string;
				description: string;
		  }
		| undefined;
	locationValue: string;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
	user,
	description,
	guestCount,
	roomCount,
	bathroomCount,
	category,
	locationValue,
}) => {
	const { getByValue } = useCountries();
	const coordinates = getByValue(locationValue)?.latlng;
	const [isClient, setIsClient] = useState<boolean>(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	if (!isClient) return null;

	return (
		<div className="col-span-4 flex flex-col gap-4">
			<div className="flex flex-col gap-2">
				<div
					className="
                        text-xl
                        font-semibold
                        flex 
                        flex-row
                        items-center
                        gap-2
                        "
				>
					<p>Hosted by {user.name}</p>

					<Avatar>
						<AvatarImage src={user?.image as string} />
						<AvatarFallback>
							<User2Icon size={16} />
						</AvatarFallback>
					</Avatar>
				</div>
				<div className="flex flex-row items-center gap-4 font-light text-neutral-500">
					<p>{guestCount} guests</p>
					<p>{roomCount} rooms</p>
					<p>{bathroomCount} bathrooms</p>
				</div>
			</div>

			<hr />

			{category && (
				<ListingCategory
					icon={category.icon}
					label={category.label}
					description={category.description}
				/>
			)}
			<hr />

			<div className="text-lg font-light text-neutral-500">{description}</div>
			<hr />
			<Map center={coordinates} />
		</div>
	);
};

export default ListingInfo;
