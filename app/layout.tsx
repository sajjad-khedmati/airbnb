import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "./_components/navbar";
import { cn } from "@/lib/utils";

const nunito = Nunito({ subsets: ["latin"], variable: "--font-nunito" });

export const metadata: Metadata = {
	title: "Airbnb",
	description: "airbnb clone by sajjad khedmati",
};

export default function RootLayout({
	children,
	auth,
}: Readonly<{
	children: React.ReactNode;
	auth: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={cn("font-nunito antialiased", nunito.variable)}>
				<Navbar />
				{auth}
				{children}
			</body>
		</html>
	);
}
