"use client";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from "@/components/ui/dialog";
import Category from "./form-steps/category";
import { FieldValues, useForm } from "react-hook-form";

enum STEPS {
	CATEGORY = 0,
	LOCATION = 1,
	INFO = 2,
	IMAGES = 3,
	DESCRIPTION = 4,
	PRICE = 5,
}

export default function AirbnbYourHome() {
	const [step, setStep] = useState(STEPS.CATEGORY);

	const onBack = () => {
		setStep((value) => value - 1);
	};

	const onNext = () => {
		setStep((value) => value + 1);
	};

	const actionLabel: "Create" | "Next" = useMemo(() => {
		if (step === STEPS.PRICE) {
			return "Create";
		}

		return "Next";
	}, [step]);

	const secondaryActionLabel: undefined | "Back" = useMemo(() => {
		if (step === STEPS.CATEGORY) {
			return undefined;
		}

		return "Back";
	}, [step]);

	// form state - managed with react-hook-form

	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors },
		reset,
	} = useForm<FieldValues>({
		defaultValues: {
			category: "",
			location: null,
			guestCount: 1,
			roomCount: 1,
			bathroomCount: 1,
			imageSrc: "",
			price: 1,
			title: "",
			description: "",
		},
	});

	const category = watch("category");

	// apply changes for setValue methods - customize it!
	const customSetValue = (id: string, value: any) => {
		setValue(id, value, {
			shouldValidate: true,
			shouldDirty: true,
			shouldTouch: true,
		});
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant={"outline"} size={"sm"} className="hidden md:block">
					Airbnb your home
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[550px] max-h-screen flex flex-col justify-between">
				<DialogHeader>
					<DialogTitle className="font-bold text-xl text-rose-500 text-center">
						Airbnb your home
					</DialogTitle>
					<hr />
				</DialogHeader>
				{step === STEPS.CATEGORY && (
					<Category
						category={category}
						onClick={(category) => customSetValue("category", category)}
					/>
				)}

				<DialogFooter>
					{secondaryActionLabel && (
						<Button
							type="button"
							variant={"outline"}
							className="w-32"
							onClick={onBack}
						>
							{secondaryActionLabel}
						</Button>
					)}
					{step === STEPS.PRICE ? (
						<Button type="submit" className="w-32">
							{actionLabel}
						</Button>
					) : (
						<Button type="button" className="w-32" onClick={onNext}>
							{actionLabel}
						</Button>
					)}
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
