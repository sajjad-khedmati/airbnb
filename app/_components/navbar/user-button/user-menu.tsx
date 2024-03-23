"use client";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserAvatar from "./user-avatar";
import { KeyRound, UserPlus } from "lucide-react";
import Link from "next/link";

export default function UserMenu() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<UserAvatar />
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-[200px] pb-2">
				<DropdownMenuLabel>My Account</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<Link href={"/login"}>
						<DropdownMenuItem className={"cursor-pointer"}>
							<KeyRound className="w-4 h-4 mr-2" />
							<span className="text-sm">Login</span>
						</DropdownMenuItem>
					</Link>
					<Link href={"/register"}>
						<DropdownMenuItem className={"cursor-pointer"}>
							<UserPlus className="w-4 h-4 mr-2" />
							<span className="text-sm">Register</span>
						</DropdownMenuItem>
					</Link>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
