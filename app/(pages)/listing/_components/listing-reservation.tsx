"use client";
import Calendar from "@/components/inputs/calendar";
import { Button } from "@/components/ui/button";
import React from "react";
import { Range } from "react-date-range";

interface ListingReservationProps {
	price: number;
	dateRange: Range;
	totalPrice: number;
	onChangeDate: (value: Range) => void;
	onSubmit: () => void;
	disabled?: boolean;
	disabledDates: Date[];
}

export default function ListingReservation({
	price,
	dateRange,
	totalPrice,
	onChangeDate,
	onSubmit,
	disabledDates,
	disabled,
}: ListingReservationProps) {
	return (
		<div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
			<div className="flex flex-row items-center gap-1 p-4">
				<div className="text-2xl font-semibold">$ {price}</div>
				<div className="font-light text-neutral-600">night</div>
			</div>
			<hr />

			<Calendar
				value={dateRange}
				disabledDates={disabledDates}
				onChange={(value) => onChangeDate(value.selection)}
			/>

			<hr />
			<div className="p-4">
				<Button className="w-full" disabled={disabled} onClick={onSubmit}>
					Reserve
				</Button>
			</div>
			<div
				className="
                p-4
                flex
                flex-row
                items-center
                justify-between
                font-semibold
                text-lg
            "
			>
				<div>total</div>
				<div>${totalPrice}</div>
			</div>
		</div>
	);
}
