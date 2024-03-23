import Container from "@/components/container";
import Logo from "../../../components/logo";
import Search from "./search";
import UserButton from "./user-button";

const Navbar = () => {
	return (
		<header className="sticky top-0 left-0 w-screen shadow-sm py-4 border-b-[1px]">
			<Container>
				<nav className="w-full flex flex-row gap-3 md:gap-0 items-center justify-between">
					<Logo />
					<Search />
					<UserButton />
				</nav>
			</Container>
		</header>
	);
};

export default Navbar;
