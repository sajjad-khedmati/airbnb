"use client";
import { categories } from "@/constants/categories";
import { SafeListing, SafeUser } from "@/types";
import { Reservation } from "@prisma/client";
import React, { Fragment, useMemo } from "react";
import ListingHead from "./listing-head";
import ListingInfo from "./listing-info";

interface ListingClientProps {
	reservations?: Reservation[];
	listing: SafeListing & {
		user: SafeUser;
	};
	currentUser: SafeUser | null;
}

const ListingClient: React.FC<ListingClientProps> = ({
	reservations,
	listing,
	currentUser,
}) => {
	const category = useMemo(() => {
		return categories.find((item) => item.label === listing.category);
	}, [listing.category]);

	return (
		<Fragment>
			<div className="max-w-screen-lg mx-auto my-4">
				<div className="flex flex-col gap-4">
					<ListingHead
						title={listing.title}
						imageSrc={listing.imageSrc}
						locationValue={listing.locationValue}
						id={listing.id}
						currentUser={currentUser}
					/>

					<div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
						<ListingInfo
							user={listing.user}
							category={category}
							description={listing.description}
							roomCount={listing.roomCount}
							guestCount={listing.guestCount}
							bathroomCount={listing.bathroomCount}
							locationValue={listing.locationValue}
						/>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default ListingClient;
