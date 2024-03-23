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

export default function LoginForm() {
	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			username: "",
			password: "",
		},
	});

	const onSubmit = async (values: z.infer<typeof loginSchema>) => {
		console.log(values);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
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

				<div className="flex items-center gap-2">
					<span className="flex-1 h-[1px] bg-gray-400 rounded-xl"></span>
					<span className="text-gray-500">or</span>
					<span className="flex-1 h-[1px] bg-gray-400 rounded-xl"></span>
				</div>

				<div className="flex gap-2 flex-wrap">
					<GoogleButton disabled />
					<GithubButton disabled />
				</div>

				<Button type="submit" className="w-full">
					Login
				</Button>
			</form>
		</Form>
	);
}
