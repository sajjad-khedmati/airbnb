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
import { KeyRound, LogOut, User, UserPlus } from "lucide-react";
import { TbHomeDollar } from "react-icons/tb";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { userMenu } from "@/constants/user-menu";

export default function UserMenu() {
	const session = useSession();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="focus-visible:ring-0">
				<UserAvatar />
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-[200px]">
				{session.status === "authenticated" ? (
					<>
						<DropdownMenuLabel className="flex items-center text-xs gap-1 truncate">
							<User className="w-4 h-4" />
							{session.data.user?.email}
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuLabel>My Actions</DropdownMenuLabel>
							{userMenu.map((item) => (
								<Link href={item.href} key={item.id}>
									<DropdownMenuItem className={"cursor-pointer"}>
										<item.icon size={"16"} className="mr-2" />
										<span className="text-sm">{item.label}</span>
									</DropdownMenuItem>
								</Link>
							))}
						</DropdownMenuGroup>
					</>
				) : (
					<DropdownMenuLabel>Accounting</DropdownMenuLabel>
				)}
				<DropdownMenuSeparator />
				{session.status === "unauthenticated" && (
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
				)}

				{session.status === "authenticated" && (
					<DropdownMenuGroup>
						<DropdownMenuItem className="cursor-pointer">
							<LogOut className="w-4 h-4 mr-2" />
							<button onClick={() => signOut()}>Sign out</button>
						</DropdownMenuItem>
					</DropdownMenuGroup>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
