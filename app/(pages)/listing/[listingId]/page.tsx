import { getCurrentUser } from "@/actions/getCurrentUser";
import { getListingById } from "@/actions/listing";
import Container from "@/components/container";
import ListingClient from "../_components/listing-client";

export default async function ListingIdPage({
	params,
}: {
	params: { listingId: string };
}) {
	const data = await getListingById(params.listingId);
	const user = await getCurrentUser();
	return (
		<Container>
			<ListingClient listing={data} currentUser={user} />
		</Container>
	);
}
