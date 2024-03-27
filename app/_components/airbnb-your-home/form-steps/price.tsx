"use client";
import { Input } from "@/components/ui/input";
import { DollarSignIcon } from "lucide-react";
import React from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

interface PriceProps {
	register: UseFormRegister<FieldValues>;
}

export default function Price({ register }: PriceProps) {
	return (
		<div className="flex flex-col space-y-4 flex-1">
			<div>
				<h2 className="font-semibold text-lg">Now , set your price</h2>
				<p className="text-muted-foreground text-sm ">
					How much do you charge per night?
				</p>
			</div>

			<div className="relative">
				<DollarSignIcon className="size-5 absolute inset-y-1/2 -translate-y-1/2 left-4" />
				<Input
					type="number"
					placeholder="Price"
					{...register("price")}
					className="flex-1 pl-12 tracking-widest placeholder:tracking-normal"
				/>
			</div>
		</div>
	);
}
