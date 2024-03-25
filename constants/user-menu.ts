import { MdOutlineLocalAirport, MdOutlineFavorite } from "react-icons/md";
import { LuBaggageClaim } from "react-icons/lu";
import { GiCash } from "react-icons/gi";

export const userMenu = [
	{
		id: 1,
		label: "My trips",
		href: "/trips",
		icon: MdOutlineLocalAirport,
	},
	{
		id: 2,
		label: "My favorites",
		href: "/favorites",
		icon: MdOutlineFavorite,
	},
	{
		id: 3,
		label: "My reservations",
		href: "/reservations",
		icon: LuBaggageClaim,
	},
	{
		id: 4,
		label: "My properties",
		href: "/properties",
		icon: GiCash,
	},
];
