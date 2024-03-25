import AirbnbYourHome from "../../airbnb-your-home";
import UserMenu from "./user-menu";

export default function UserButton() {
	return (
		<div className="flex gap-4 items-center">
			<AirbnbYourHome />
			<UserMenu />
		</div>
	);
}
