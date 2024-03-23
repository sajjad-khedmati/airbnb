import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

export default function GithubButton({ disabled }: { disabled?: boolean }) {
	return (
		<Button
			disabled={disabled}
			className="flex-1 flex items-center gap-2"
			variant={"outline"}
		>
			<Image src={"/assets/github.svg"} alt="github" width={22} height={22} />
			<span>Continue as Github</span>
		</Button>
	);
}
