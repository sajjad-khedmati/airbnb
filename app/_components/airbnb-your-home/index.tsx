"use client";
import React, { useMemo, useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Location from "./form-steps/location";
import Info from "./form-steps/info";
import ImageUpload from "./form-steps/image-upload";
import Description from "./form-steps/description";
import Price from "./form-steps/price";

enum STEPS {
	CATEGORY = 0,
	LOCATION = 1,
	INFO = 2,
	IMAGES = 3,
	DESCRIPTION = 4,
	PRICE = 5,
}

const schema = z.object({
	category: z.string().min(1, { message: "required" }),
	location: z.object({}),
	guestCount: z.number(),
	roomCount: z.number(),
	bathroomCount: z.number(),
	imageSrc: z.string().min(1, { message: "required" }),
	price: z.number(),
	title: z.string().min(1, { message: "required" }),
	description: z.string().min(1, { message: "required" }),
});

function AirbnbYourHome() {
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
		resolver: zodResolver(schema),
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
	const location = watch("location");
	const imageSrc = watch("imageSrc");

	// apply changes for setValue methods - customize it!
	const customSetValue = (id: string, value: any) => {
		setValue(id, value, {
			shouldValidate: true,
			shouldDirty: true,
			shouldTouch: true,
		});
	};
	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		console.log("SUBMITING...", data, errors);
	};

	return (
		<Dialog modal={false}>
			<DialogTrigger asChild>
				<Button variant={"outline"} size={"sm"} className="hidden md:block">
					Airbnb your home
				</Button>
			</DialogTrigger>

			<DialogContent
				onInteractOutside={(e) => e.preventDefault()}
				className="sm:max-w-[550px] max-h-screen flex flex-col justify-between"
			>
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

				{step === STEPS.LOCATION && (
					<Location
						location={location}
						onChange={(value) => customSetValue("location", value)}
					/>
				)}

				{step === STEPS.INFO && (
					<Info watch={watch} customSetValue={customSetValue} />
				)}

				{step === STEPS.IMAGES && (
					<ImageUpload
						value={imageSrc}
						onChange={(value) => customSetValue("imageSrc", value)}
					/>
				)}

				{step === STEPS.DESCRIPTION && <Description register={register} />}
				{step === STEPS.PRICE && <Price register={register} />}

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

					{step !== STEPS.PRICE ? (
						<Button className="w-32" type="button" onClick={onNext}>
							{actionLabel}
						</Button>
					) : (
						<Button className="w-32" onClick={handleSubmit(onSubmit)}>
							{actionLabel}
						</Button>
					)}
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

export default React.memo(AirbnbYourHome);
