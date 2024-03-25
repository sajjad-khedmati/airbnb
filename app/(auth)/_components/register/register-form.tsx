"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { registerSchema } from "@/schemas/auth/register.schema";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import GoogleButton from "../google-button";
import GithubButton from "../github-button";
import { register } from "@/actions/auth";
import { toast } from "sonner";
import { PartyPopper, TriangleAlert } from "lucide-react";
import Link from "next/link";

export default function RegisterForm() {
	const form = useForm<z.infer<typeof registerSchema>>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			email: "",
			username: "",
			password: "",
			confirmPassword: "",
		},
	});

	const onSubmit = async (values: z.infer<typeof registerSchema>) => {
		try {
			const result = await register(values);
			result &&
				toast("Welcome to out community!", {
					description: `user ${result.name} successfully created`,
					icon: <PartyPopper className="mr-2" />,
				});
		} catch (error) {
			toast("an Error accurded when try to register ", {
				icon: <TriangleAlert className="mr-2" />,
			});
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
				<FormField
					name="email"
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email Address</FormLabel>
							<FormControl>
								<Input placeholder="example@gmail.com" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					name="username"
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Username</FormLabel>
							<FormControl>
								<Input placeholder="sajika" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					name="password"
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input type="password" placeholder="******" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					name="confirmPassword"
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Confirm Password</FormLabel>
							<FormControl>
								<Input type="password" placeholder="******" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="flex items-center gap-2">
					<span className="flex-1 h-[1px] bg-gray-400 rounded-xl"></span>
					<span className="text-gray-500">or</span>
					<span className="flex-1 h-[1px] bg-gray-400 rounded-xl"></span>
				</div>

				<div className="flex gap-2 flex-wrap">
					<GoogleButton />
					<GithubButton />
				</div>

				<Button
					disabled={form.formState.isSubmitting}
					type="submit"
					className="w-full"
				>
					Create an account
				</Button>
				<div className="flex items-center gap-2">
					<p className="text-muted-foreground text-sm">
						Already have an account?
					</p>
					<Link
						href={"/login"}
						className="text-rose-500 text-sm font-semibold hover:underline underline-offset-4 transition"
					>
						Login to airbnb
					</Link>
				</div>
			</form>
		</Form>
	);
}
