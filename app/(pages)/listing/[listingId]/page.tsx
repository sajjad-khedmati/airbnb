import { getCurrentUser } from "@/actions/getCurrentUser";
import { getListingById } from "@/actions/listing";
import Container from "@/components/container";
import ListingClient from "../_components/listing-client";
import { getReservations } from "@/actions/reservation";

export default async function ListingIdPage({
	params,
}: {
	params: { listingId: string };
}) {
	const data = await getListingById(params.listingId);
	const user = await getCurrentUser();
	const reservations = await getReservations(params);

	return (
		<Container>
			<ListingClient
				listing={data}
				currentUser={user}
				reservations={reservations}
			/>
		</Container>
	);
}
