"use client";
import { useCallback } from "react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { UploadCloud } from "lucide-react";

declare global {
	var cloudinary: any;
}

const uploadPreset = "bnop4j7w";

interface ImageUploaderProps {
	onChange: (value: string) => void;
	value: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ value, onChange }) => {
	const handleUpload = useCallback(
		(result: any) => {
			onChange(result.info.secure_url);
		},
		[onChange],
	);

	return (
		<CldUploadWidget
			onSuccess={handleUpload}
			uploadPreset={uploadPreset}
			options={{
				maxFiles: 1,
			}}
		>
			{({ open }) => {
				return (
					<div
						onClick={() => open?.()}
						className="
              relative 
              cursor-pointer
              hover:opacity-70
              transition
              border-dashed 
              border-2 
              p-20 
              border-neutral-300
              flex
              flex-col
              justify-center
              items-center
              gap-4
              text-neutral-600
            "
					>
						<UploadCloud className="w-12 h-12" />
						<p className="font-semibold text-lg">Click to upload</p>
						<div
							className="
              absolute inset-0 w-full h-full"
						>
							{value && (
								<Image
									fill
									style={{ objectFit: "cover" }}
									src={value}
									alt="House"
								/>
							)}
						</div>
					</div>
				);
			}}
		</CldUploadWidget>
	);
};
export default ImageUploader;
