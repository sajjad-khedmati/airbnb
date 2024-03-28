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
import Preview from "./form-steps/preview";
import { Progress } from "@/components/ui/progress";
import { listingSchema } from "@/schemas/listing.schema";
import { createListing } from "@/actions/listing";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Ban, CheckCheck, Loader2 } from "lucide-react";

export enum STEPS {
	CATEGORY = 0,
	LOCATION = 1,
	INFO = 2,
	IMAGES = 3,
	DESCRIPTION = 4,
	PRICE = 5,
	PREVIEW = 6,
}

function AirbnbYourHome() {
	const router = useRouter();
	const [step, setStep] = useState(STEPS.CATEGORY);
	const progress = Math.floor((step / 6) * 100);
	// form state - managed with react-hook-form

	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors, isSubmitting, isDirty, isValid },
		reset,
	} = useForm<FieldValues>({
		resolver: zodResolver(listingSchema),
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

	// apply changes for setValue methods - customize it!
	const customSetValue = (id: string, value: any) => {
		setValue(id, value, {
			shouldValidate: true,
			shouldDirty: true,
			shouldTouch: true,
		});
	};
	const onSubmit: SubmitHandler<FieldValues> = async (data) => {
		if (step === STEPS.PRICE) return;

		try {
			const result = await createListing(data);
			console.log("Result:", result);

			toast("your airbnb's successfully added!", {
				description: "you can see your airbnb's on the list of airbnb's",
				icon: <CheckCheck className="mr-2" />,
			});

			reset();
			setStep(STEPS.CATEGORY);
			router.refresh();
		} catch (error) {
			if (error instanceof Error) {
				toast(error?.message, {
					description:
						"An error accurded when try to register your airbnb's, please try again",
					icon: <Ban className="mr-2" />,
				});
			}
		}
	};

	const onBack = () => {
		setStep((value) => value - 1);
	};

	const onNext = () => {
		if (step === STEPS.PRICE) {
			setStep((value) => value + 1);
			return handleSubmit(onSubmit)();
		}
		setStep((value) => value + 1);
	};

	const actionLabel: "Create" | "Next" = useMemo(() => {
		if (step === STEPS.PREVIEW) {
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

	const category = watch("category");
	const location = watch("location");
	const imageSrc = watch("imageSrc");

	return (
		<Dialog modal={false}>
			<DialogTrigger asChild>
				<Button variant={"outline"} size={"sm"} className="hidden md:block">
					Airbnb your home
				</Button>
			</DialogTrigger>

			<DialogContent
				onInteractOutside={(e) => e.preventDefault()}
				className="sm:max-w-[550px] max-h-[95vh] flex flex-col justify-between"
			>
				<DialogHeader>
					<DialogTitle className="font-bold text-xl text-rose-500 text-center">
						Airbnb your home
					</DialogTitle>
					<hr />
				</DialogHeader>

				<div className="flex items-center gap-2">
					<Progress value={progress} className="flex-1 h-1 rounded-none" />
					<span className="text-xs font-light text-neutral-600">
						{progress}% complited
					</span>
				</div>

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

				{step === STEPS.PREVIEW && (
					<Preview watch={watch} errors={errors} setStep={setStep} />
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

					{step !== STEPS.PREVIEW ? (
						<Button className="w-32" type="button" onClick={onNext}>
							{actionLabel}
						</Button>
					) : (
						<Button
							disabled={Object.keys(errors).length > 0 || isSubmitting}
							className="w-32"
							onClick={handleSubmit(onSubmit)}
						>
							{isSubmitting && (
								<Loader2 className="w-4 h-4 animate-spin transition mr-1" />
							)}
							{actionLabel}
						</Button>
					)}
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

export default React.memo(AirbnbYourHome);
