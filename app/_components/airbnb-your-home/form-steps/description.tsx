"use client";
import { Input } from "@/components/ui/input";
import React from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

interface DescriptionProps {
	register: UseFormRegister<FieldValues>;
}

export default function Description({ register }: DescriptionProps) {
	return (
		<div className="flex flex-col space-y-4 flex-1">
			<div>
				<h2 className="font-semibold text-lg">
					How would you describe your place?
				</h2>
				<p className="text-muted-foreground text-sm ">
					short and sweet works best!
				</p>
			</div>

			<Input placeholder="Title" {...register("title", { required: true })} />
			<Input
				placeholder="Description"
				{...register("description", { required: true })}
			/>
		</div>
	);
}
