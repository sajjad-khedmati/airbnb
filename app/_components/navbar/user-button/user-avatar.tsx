"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function UserAvatar() {
	const session = useSession();
	return (
		<Avatar>
			{session.status === "authenticated" && (
				<AvatarImage
					src={session.data.user?.image as string}
					alt={session.data.user?.name as string}
				/>
			)}
			<AvatarFallback>
				<Image src={"/assets/placeholder.jpg"} alt="user" fill />
			</AvatarFallback>
		</Avatar>
	);
}
