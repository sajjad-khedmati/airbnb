import React, { Dispatch } from "react";
import { FieldErrors, FieldValues, UseFormWatch } from "react-hook-form";
import { STEPS } from "..";
import FieldError from "./_components/field-error";
import { Badge } from "@/components/ui/badge";

import { categories } from "@/constants/categories";
import { Caravan, MapPin, ShowerHead, UsersRound } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface PreviewProps {
	watch: UseFormWatch<FieldValues>;
	errors: FieldErrors<FieldValues>;
	setStep: Dispatch<React.SetStateAction<STEPS>>;
}

const Preview: React.FC<PreviewProps> = ({ watch, errors, setStep }) => {
	const category = watch("category");
	const location = watch("location");
	const guestCount = watch("guestCount");
	const roomCount = watch("roomCount");
	const bathroomCount = watch("bathroomCount");
	const imageSrc = watch("imageSrc");
	const price = watch("price");
	const title = watch("title");
	const description = watch("description");

	const categoryData:
		| { label: string; icon: string; description: string }
		| undefined =
		category && categories.find((item) => item.label === category);

	return (
		<div className="flex flex-col flex-1 space-y-4">
			<div>
				<h2 className="font-semibold text-lg">
					Are you ready to airbnb your home?
				</h2>
				<p className="text-muted-foreground text-sm ">
					final check your data and click on create button to finalized!
				</p>
			</div>

			<ScrollArea className="h-96 max-h-max">
				<div className="space-y-2 px-2">
					<div className="flex flex-col gap-1">
						{title && !errors.title ? (
							<h3 className="text-lg font-semibold truncate">{title}</h3>
						) : (
							<FieldError
								error="We need a title for your airbnb's"
								setStep={setStep}
								step={STEPS.DESCRIPTION}
							/>
						)}

						{description && !errors.description ? (
							<p className="font-medium text-neutral-600 truncate -mt-2">
								{description}
							</p>
						) : (
							<FieldError
								error="We need a description for your airbnb's"
								setStep={setStep}
								step={STEPS.DESCRIPTION}
							/>
						)}

						<div className="relative h-[35vh] flex items-center justify-center bg-rose-50 text-rose-400 p-12">
							{imageSrc && !errors.ImageSrc ? (
								<Image
									fill
									style={{ objectFit: "cover" }}
									src={imageSrc}
									alt="House"
								/>
							) : (
								<div className="text-center">
									<p>
										{" "}
										you actuly present your home with an Picture from it, make
										sure you have cerrect upload it
									</p>

									<Button
										onClick={() => setStep(STEPS.IMAGES)}
										variant={"outline"}
										size={"sm"}
										className="mx-auto mt-2"
									>
										go to step {STEPS.IMAGES}
									</Button>
								</div>
							)}
						</div>

						{location && !errors.locatio ? (
							<div className="flex items-center gap-2 text-sm">
								<MapPin className="w-4 h-4 mr-2" />
								<div className="flex items-center gap-2">
									{location?.flag}
									<p>{location?.label}</p>
								</div>
								<span className="text-neutral-500 text-xs">
									{location?.region}
								</span>
							</div>
						) : (
							<FieldError
								error="We need a location of your airbnb's"
								setStep={setStep}
								step={STEPS.LOCATION}
							/>
						)}

						{!category && errors.category && (
							<FieldError
								error="If you pick a category , we can give you an better exprience, please pick an category"
								setStep={setStep}
								step={STEPS.CATEGORY}
							/>
						)}

						<div className="flex items-center justify-between gap-8 mt-2">
							<div className="flex items-center flex-wrap gap-2">
								{categoryData && (
									<Badge>
										<span className="text-sm">
											<categoryData.icon />
										</span>
										<span className="ml-1">{categoryData.label}</span>
									</Badge>
								)}
								<Badge>
									<UsersRound className="w-3 h-3" />
									<span className="ml-1">{guestCount}</span>
								</Badge>

								<Badge>
									<Caravan className="w-3 h-3" />
									<span className="ml-1">{roomCount}</span>
								</Badge>

								<Badge>
									<ShowerHead className="w-3 h-3" />
									<span className="ml-1">{bathroomCount}</span>
								</Badge>
							</div>

							<span className="text-sm font-semibold">{price} $ per night</span>
						</div>
					</div>
				</div>
			</ScrollArea>
		</div>
	);
};

export default Preview;
