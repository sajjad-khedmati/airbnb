import { auth } from "@/auth";
import AirbnbYourHome from "../../airbnb-your-home";
import UserMenu from "./user-menu";

export default async function UserButton() {
	const session = await auth();

	return (
		<div className="flex gap-4 items-center">
			{session && session.user && <AirbnbYourHome />}
			<UserMenu />
		</div>
	);
}
