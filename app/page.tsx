import { auth } from "@/auth";

export default async function Home() {
	const session = await auth();
	return <main className="">session : {JSON.stringify(session)}</main>;
}
