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
import LoginForm from "../_components/login/login-form";

export default function Login() {
	return (
		<main className="w-full flex justify-center items-center mt-4">
			<Card className="max-w-[780px] max-h-screen">
				<CardHeader>
					<CardTitle className="flex flex-col gap-4">
						<span className="md:hidden text-rose-500">Airbnb</span>
						<Logo />
						<p className="mt-2">Welcome Back!</p>
					</CardTitle>
					<CardDescription>
						my dear user , please help me to know you
					</CardDescription>
				</CardHeader>
				<CardContent>
					<LoginForm />
				</CardContent>
			</Card>
		</main>
	);
}
