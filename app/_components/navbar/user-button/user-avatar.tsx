import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";

export default function UserAvatar() {
	return (
		<Avatar>
			<AvatarFallback>
				<Image src={"/assets/placeholder.jpg"} alt="user" fill />
			</AvatarFallback>
		</Avatar>
	);
}
