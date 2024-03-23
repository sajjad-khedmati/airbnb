"use client";
import Logo from "@/components/logo";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import React from "react";
import RegisterForm from "../_components/register/register-form";

export default function Register() {
	return (
		<main className="w-full flex justify-center items-center mt-4">
			<Card className="max-w-[780px] max-h-screen">
				<CardHeader>
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
		</main>
	);
}
