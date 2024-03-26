import ImageUploader from "@/components/inputs/image-uploader";
interface ImageUploadProps {
	onChange: (value: string) => void;
	value: string;
}
export default function ImageUpload({ value, onChange }: ImageUploadProps) {
	return (
		<div className="flex flex-col space-y-4 flex-1">
			<div>
				<h2 className="font-semibold text-lg">Add a photo of your place</h2>
				<p className="text-muted-foreground text-sm ">
					Show guests what your place looks like!
				</p>
			</div>

			<ImageUploader value={value} onChange={onChange} />
		</div>
	);
}
