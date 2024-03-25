import { categories } from "@/constants/categories";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface CategoryFormProps {
	onClick: (value: string) => void;
	category: string;
}

export default function Category({ onClick, category }: CategoryFormProps) {
	return (
		<div className="flex flex-col space-y-4 flex-1">
			<div>
				<h2 className="font-semibold text-lg">
					Which of these best describes your place?
				</h2>
				<p className="text-muted-foreground text-sm ">pick a category</p>
			</div>

			<ScrollArea className="h-96 max-h-max">
				<div className="px-4 py-2 grid grid-cols-1 md:grid-cols-3 gap-2">
					{categories.map((categoryItem) => (
						<div
							onClick={() => onClick(categoryItem.label)}
							key={categoryItem.label}
							className={cn(
								`flex flex-col items-center gap-2 group
                                px-4 py-2 rounded-lg border-2 hover:bg-neutral-50 transition 
                                cursor-pointer hover:border-neutral-300`,
								category === categoryItem.label &&
									"bg-neutral-100 hover:bg-neutral-100 border-neutral-300",
							)}
						>
							<categoryItem.icon
								size={26}
								className={cn(
									"text-neutral-500 transition group-hover:text-neutral-900",
									category === categoryItem.label && "text-nutral-900 ",
								)}
							/>
							<p>{categoryItem.label}</p>
						</div>
					))}
				</div>
			</ScrollArea>
		</div>
	);
}
