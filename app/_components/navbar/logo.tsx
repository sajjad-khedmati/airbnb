import Image from "next/image";

export default function Logo() {
	return (
		<Image
			className="hidden md:block"
			src={"/assets/logo.png"}
			alt="logo"
			width={120}
			height={20}
		/>
	);
}
