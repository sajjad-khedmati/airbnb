import React, { Dispatch } from "react";
import { STEPS } from "../..";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FieldErrorProps {
	error: string;
	step: number;
	setStep: Dispatch<React.SetStateAction<STEPS>>;
}

const FieldError: React.FC<FieldErrorProps> = ({ error, step, setStep }) => {
	return (
		<div className="bg-rose-50 text-rose-400 flex items-center justify-between gap-2 rounded-md px-4 py-2">
			<div className="flex items-center gap-2">
				<AlertCircle className="w-4 h-4" />
				<p className="font-semibold text-sm flex-1 break-words">{error}</p>
			</div>
			<Button onClick={() => setStep(step)} size={"sm"} variant={"outline"}>
				go to step {step + 1}
			</Button>
		</div>
	);
};

export default FieldError;
