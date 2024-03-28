"use client";
import React from "react";

import Container from "@/components/container";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
interface EmptyResultProps {
	title?: string;
	description?: string;
	isRefresh?: boolean;
}
const EmptyResult: React.FC<EmptyResultProps> = ({
	title = "No exact Matches",
	description = "Try changing or removing some of your filters",
}) => {
	const router = useRouter();
	return (
		<Container>
			<section className="w-full h-[60vh] flex flex-col gap-4 justify-center items-center text-center">
				<div className="">
					<h2 className="font-bold text-lg lg:text-2xl xl:text-4xl">{title}</h2>
					<p className="text-xs md:text-sm xl:text-lg text-neutral-500">
						{description}
					</p>
				</div>

				<Button onClick={() => router.replace("/")}>Clear filters</Button>
			</section>
		</Container>
	);
};

export default EmptyResult;
