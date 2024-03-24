"use client";
import { categories } from "@/constants/categories";
import CategoryBox from "./category-box";
import { usePathname, useSearchParams } from "next/navigation";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export default function Categories() {
	const params = useSearchParams();
	const category = params?.get("category");
	const pathname = usePathname();
	const isMainPage = pathname === "/";

	if (!isMainPage) {
		return null;
	}
	return (
		<ScrollArea
			className="
   "
		>
			<div className="p-4 flex flex-row justify-between items-center overflow-x-auto gap-4 w-full">
				{categories.map((categoryItem) => (
					<CategoryBox
						key={categoryItem.label}
						icon={categoryItem.icon}
						label={categoryItem.label}
						selected={category === categoryItem.label}
					/>
				))}
			</div>
			<ScrollBar orientation="horizontal" />
		</ScrollArea>
	);
}
