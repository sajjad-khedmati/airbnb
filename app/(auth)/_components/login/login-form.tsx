import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schemas/auth/login.schema";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import GoogleButton from "../google-button";
import GithubButton from "../github-button";
import { Input } from "@/components/ui/input";
import { signIn } from "@/auth";
import { login } from "@/actions/auth";
import { toast } from "sonner";
import { useTransition } from "react";

export default function LoginForm() {
	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});
	const [isPending, startTransition] = useTransition();

	const onSubmit = async (values: z.infer<typeof loginSchema>) => {
		startTransition(() => {
			login(values)
				.then((res) => {
					if (res?.error) {
						toast("please try again", {
							description: res.error,
							className: "bg-rose-500 text-white",
						});
					}
				})
				.catch((err) => {
					toast("please try again", {
						className: "bg-rose-500 text-white",
					});
				});
		});
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
				<FormField
					name="email"
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input placeholder="example@gmail.com" {...field} />
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

				<div className="flex items-center gap-2">
					<span className="flex-1 h-[1px] bg-gray-400 rounded-xl"></span>
					<span className="text-gray-500">or</span>
					<span className="flex-1 h-[1px] bg-gray-400 rounded-xl"></span>
				</div>

				<div className="flex gap-2 flex-wrap">
					<GoogleButton />
					<GithubButton />
				</div>

				<Button disabled={isPending} type="submit" className="w-full">
					Login
				</Button>
			</form>
		</Form>
	);
}
