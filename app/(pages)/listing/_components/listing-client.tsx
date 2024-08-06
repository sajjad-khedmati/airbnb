"use client";
import { categories } from "@/constants/categories";
import { SafeListing, SafeReservation, SafeUser } from "@/types";
import { Reservation } from "@prisma/client";
import React, {
	Fragment,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from "react";
import ListingHead from "./listing-head";
import ListingInfo from "./listing-info";
import ListingReservation from "./listing-reservation";
import { useRouter } from "next/navigation";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import { toast } from "sonner";
import { createReservation } from "@/actions/reservation";
import { Range } from "react-date-range";

const initialDateRange = {
	startDate: new Date(),
	endDate: new Date(),
	key: "selection",
};

interface ListingClientProps {
	reservations?: SafeReservation[];
	listing: SafeListing & {
		user: SafeUser;
	};
	currentUser: SafeUser | null;
}

const ListingClient: React.FC<ListingClientProps> = ({
	listing,
	reservations = [],
	currentUser,
}) => {
	const router = useRouter();

	const disabledDates = useMemo(() => {
		let dates: Date[] = [];

		reservations.forEach((reservation) => {
			const range = eachDayOfInterval({
				start: new Date(reservation.startDate),
				end: new Date(reservation.endDate),
			});
			dates = [...dates, ...range];
		});

		return dates;
	}, [reservations]);

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [totalPrice, setTotalPrice] = useState(listing.price);
	const [dateRange, setDateRange] = useState<Range>(initialDateRange);

	const onCreateReservation = useCallback(async () => {
		if (!currentUser) {
			return;
		}

		try {
			setIsLoading(true);
			const result = await createReservation(
				totalPrice,
				dateRange.startDate as Date,
				dateRange.endDate as Date,
				listing.id,
			);

			if (result?.success) {
				toast.success("listing reserved");
				setDateRange(initialDateRange);
				return router.refresh();
			}

			toast.error("Somthing went wrong");
		} catch (error) {
			toast.error("Somthing went wrong");
		} finally {
			setIsLoading(false);
		}
	}, [totalPrice, dateRange, listing.id, router, currentUser]);

	useEffect(() => {
		if (dateRange.startDate && dateRange.endDate) {
			const dayCount = differenceInCalendarDays(
				dateRange.endDate,
				dateRange.startDate,
			);

			if (dayCount && listing.price) {
				setTotalPrice(dayCount * listing.price);
			} else {
				setTotalPrice(listing.price);
			}
		}
	}, [dateRange, listing.price]);

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

						<div className="order-first mb-10 md:order-last md:col-span-3">
							<ListingReservation
								price={listing.price}
								totalPrice={totalPrice}
								onChangeDate={(value) => setDateRange(value)}
								dateRange={dateRange}
								onSubmit={onCreateReservation}
								disabled={isLoading}
								disabledDates={disabledDates}
							/>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default ListingClient;
