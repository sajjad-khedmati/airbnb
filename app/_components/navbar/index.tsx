import Container from "@/components/container";
import Logo from "../../../components/logo";
import Search from "./search";
import UserButton from "./user-button";
import Categories from "../categories";

const Navbar = () => {
	return (
		<header>
			<Container>
				<nav className="w-full flex flex-row gap-3 py-4 shadow-sm border-b-[1px] md:gap-0 items-center justify-between">
					<Logo />
					<Search />
					<UserButton />
				</nav>
				<Categories />
			</Container>
		</header>
	);
};

export default Navbar;
