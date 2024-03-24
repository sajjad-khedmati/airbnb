import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import Image from "next/image";
import React from "react";

export default function GithubButton({ disabled }: { disabled?: boolean }) {
	return (
		<Button
			disabled={disabled}
			onClick={() => signIn("github")}
			className="flex-1 flex items-center gap-2"
			variant={"outline"}
			type="button"
		>
			<Image src={"/assets/github.svg"} alt="github" width={22} height={22} />
			<span>Continue as Github</span>
		</Button>
	);
}
