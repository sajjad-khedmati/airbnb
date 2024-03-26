"use client";
import { Minus, Plus } from "lucide-react";
import { useCallback } from "react";
import { Button } from "../ui/button";

interface CounterProps {
	title: string;
	subtitle: string;
	value: number;
	onChange: (value: number) => void;
}

const Counter: React.FC<CounterProps> = ({
	title,
	subtitle,
	value,
	onChange,
}) => {
	const onAdd = useCallback(() => {
		onChange(value + 1);
	}, [value, onChange]);

	const onReduce = useCallback(() => {
		if (value === 1) return;
		onChange(value - 1);
	}, [value, onChange]);

	return (
		<div className="flex flex-row items-center justify-between">
			<div className="flex flex-col">
				<div className="font-medium">{title}</div>
				<div className="font-light text-gray-600">{subtitle}</div>
			</div>

			<div className="flex flex-row items-center gap-4">
				<Button
					onClick={onReduce}
					asChild
					variant={"outline"}
					size={"icon"}
					className="cursor-pointer"
				>
					<Minus className="w-6 h-6" />
				</Button>

				<div className="font-light text-xl text-neutral-600 select-none">
					{value}
				</div>
				<Button
					onClick={onAdd}
					asChild
					variant={"outline"}
					size={"icon"}
					className="cursor-pointer"
				>
					<Plus className="w-6 h-6" />
				</Button>
			</div>
		</div>
	);
};

export default Counter;
