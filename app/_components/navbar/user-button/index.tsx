import UserMenu from "./user-menu";
import UserHome from "./user-home";

export default function UserButton() {
	return (
		<div className="flex gap-4 items-center">
			<UserHome />
			<UserMenu />
		</div>
	);
}
