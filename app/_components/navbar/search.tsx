"use client";

import { SearchIcon } from "lucide-react";

export default function Search() {
	return (
		<div className="border-[1px] w-full md:w-auto md:py-2 py-1 rounded-full shadow-sm hover:shadow-md transition cursor-pointer">
			<div className="flex flex-row items-center justify-between">
				<button className="text-sm font-semibold px-6">Anywhere</button>
				<button className="hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center">
					Any Week
				</button>

				<div className="text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3">
					<div className="hidden sm:block">Add Guests</div>
					<div className="p-2 bg-rose-500 rounded-full text-white">
						<SearchIcon className="w-4 h-4" />
					</div>
				</div>
			</div>
		</div>
	);
}
