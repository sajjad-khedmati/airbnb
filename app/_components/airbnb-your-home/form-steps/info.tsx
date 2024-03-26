"use client";
import Counter from "@/components/inputs/counter";
import { FieldValues, UseFormWatch } from "react-hook-form";

interface InfoProps {
	watch: UseFormWatch<FieldValues>;
	customSetValue: (id: string, value: any) => void;
}

export default function Info({ watch, customSetValue }: InfoProps) {
	const guestCount = watch("guestCount");
	const roomCount = watch("roomCount");
	const bathroomCount = watch("bathroomCount");
	return (
		<div className="flex flex-col space-y-4 flex-1">
			<div>
				<h2 className="font-semibold text-lg">
					Share some basics about your place
				</h2>
				<p className="text-muted-foreground text-sm ">
					What amenities do you have?
				</p>
			</div>

			<Counter
				title="Number of Guests"
				subtitle="How many guests?"
				value={guestCount}
				onChange={(value) => customSetValue("guestCount", value)}
			/>

			<hr />

			<Counter
				title="Number of Rooms"
				subtitle="How many rooms do you have?"
				value={roomCount}
				onChange={(value) => customSetValue("roomCount", value)}
			/>
			<hr />
			<Counter
				title="Number of Bathrooms"
				subtitle="How many bathrooms do you have?"
				value={bathroomCount}
				onChange={(value) => customSetValue("bathroomCount", value)}
			/>
		</div>
	);
}
