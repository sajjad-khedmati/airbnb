"use client";
import CountrySelect, {
	type CountrySelectValue,
} from "@/components/inputs/country-select";
import dynamic from "next/dynamic";
import { useMemo } from "react";

interface LocationProps {
	location?: CountrySelectValue;
	onChange: (value: CountrySelectValue) => void;
}

export default function Location({ location, onChange }: LocationProps) {
	const Map = useMemo(() => {
		return dynamic(() => import("@/components/map"), {
			ssr: false,
		});
	}, [location]);
	return (
		<div className="flex flex-col space-y-4 flex-1">
			<div>
				<h2 className="form-semibold text-lg">Where is your place location?</h2>
				<p className="text-muted-foreground text-sm">
					Help guests to find you!
				</p>
			</div>

			<div className="space-y-2">
				<CountrySelect value={location} onChange={(value) => onChange(value)} />
				<Map center={location?.latlng} />
			</div>
		</div>
	);
}
