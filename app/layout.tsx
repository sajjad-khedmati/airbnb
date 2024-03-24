import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "./_components/navbar";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";

const nunito = Nunito({ subsets: ["latin"], variable: "--font-nunito" });

export const metadata: Metadata = {
	title: "Airbnb",
	description: "airbnb clone by sajjad khedmati",
};

import { auth as authSession } from "@/auth";
import { SessionProvider } from "next-auth/react";

export default async function RootLayout({
	children,
	auth,
}: Readonly<{
	children: React.ReactNode;
	auth: React.ReactNode;
}>) {
	const session = await authSession();
	return (
		<html lang="en">
			<SessionProvider session={session}>
				<body className={cn("font-nunito antialiased", nunito.variable)}>
					<Navbar />
					{auth}
					{children}
					<Toaster />
				</body>
			</SessionProvider>
		</html>
	);
}
