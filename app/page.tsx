import { getListing } from "@/actions/listing";
import EmptyResult from "./_components/empty-result";
import Container from "@/components/container";
import ListingCard from "./_components/listing/listing-card";
import { getCurrentUser } from "@/actions/getCurrentUser";

export default async function Home() {
	const listingData = await getListing();
	if (listingData.length === 0) return <EmptyResult />;
	const currentUser = await getCurrentUser();

	return (
		<Container>
			<main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-6">
				{listingData.map((item) => (
					<ListingCard key={item.id} data={item} currentUser={currentUser} />
				))}
			</main>
		</Container>
	);
}
