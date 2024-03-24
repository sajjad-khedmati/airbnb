import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import Image from "next/image";
import React from "react";

export default function GoogleButton({ disabled }: { disabled?: boolean }) {
	return (
		<Button
			type="button"
			onClick={() => signIn("google")}
			disabled={disabled}
			className="flex-1 flex items-center gap-2"
			variant={"outline"}
		>
			<Image src={"/assets/google.svg"} alt="google" width={22} height={22} />
			<span className="">Continue as Google</span>
		</Button>
	);
}
