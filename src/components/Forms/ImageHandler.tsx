"use client";

import { Plus, X } from "lucide-react";
import { useState } from "react";
import clsx from "clsx";

import ImageUpload from "../ImageUpload";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { deleteBlob } from "@/lib/action.server";

export default function ImageHandler({ imageData }: { imageData: string[] }) {
	const [images, setImages] = useState(imageData);
	const [imgUrl, setImgUrl] = useState("");

	const addUrl = (url: string) => {
		setImages([...images, url]);
	};

	const imagesAvailable = images.length > 0 && images[0].length > 0;

	return (
		<>
			<Label>Images</Label>
			<div
				className={clsx(
					"flex gap-4 justify-between",
					imagesAvailable ?? "items-end"
				)}
			>
				<input
					type="hidden"
					name="images"
					defaultValue={images.join(", ")}
				/>
				<div className="py-1 space-y-4">
					{imagesAvailable ? (
						images.map((image, index) => (
							<button
								className="flex group items-center justify-between gap-4"
								key={index}
								type="button"
								onClick={() => {
									setImages(
										images.filter((_, i) => i !== index)
									);
									deleteBlob(image);
								}}
							>
								<span className="w-48 whitespace-nowrap overflow-x-scroll group-hover:bg-secondary text-left px-2 py-1 border border-border rounded rounded-rounded">
									{image}
								</span>
								<X size={16} />
							</button>
						))
					) : (
						<div>No Images</div>
					)}
				</div>
				<div className="space-y-4">
					<div className="flex items-center gap-4">
						<Input
							value={imgUrl}
							onChange={e => setImgUrl(e.target.value)}
						/>
						<Button
							type="button"
							size="icon"
							onClick={() => {
								addUrl(imgUrl);
								setImgUrl("");
							}}
						>
							<Plus />
						</Button>
					</div>
					<ImageUpload addUrl={addUrl} />
				</div>
			</div>
		</>
	);
}
