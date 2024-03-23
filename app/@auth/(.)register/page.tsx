"use client";
import RegisterForm from "@/app/(auth)/_components/register/register-form";
import Logo from "@/components/logo";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { CircleX } from "lucide-react";
import { useRouter } from "next/navigation";

export default function RegisterIntercept() {
	const router = useRouter();
	return (
		<section
			className="fixed top-0 left-0 w-screen h-screen bg-black/60 backdrop-filter backdrop-blur-lg z-50
		flex items-center justify-center animate-in"
		>
			<Card className="relative max-w-[780px] max-h-screen">
				<CardHeader>
					<CircleX
						className="w-6 h-6 absolute right-4 top-4 cursor-pointer hover:text-rose-500 transition-all duration-300"
						onClick={() => router.back()}
					/>
					<CardTitle className="flex flex-col gap-4">
						<span className="md:hidden text-rose-500">Airbnb</span>
						<Logo />
					</CardTitle>
					<CardDescription>
						Welcome to <span className="font-semibold">Airbnb</span> , Please
						fill in the fields to join us
					</CardDescription>
				</CardHeader>
				<CardContent>
					<RegisterForm />
				</CardContent>
			</Card>
		</section>
	);
}
