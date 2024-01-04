import type { PutBlobResult } from "@vercel/blob";
import { useRef } from "react";

import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function ImageUpload({
	addUrl,
}: {
	addUrl: (url: string) => void;
}) {
	const inputFileRef = useRef<HTMLInputElement>(null);
	return (
		<>
			<div className="flex gap-4">
				<Input name="file" ref={inputFileRef} type="file" />
				<Button
					disabled={
						inputFileRef.current
							? inputFileRef.current?.files === null ||
								inputFileRef.current.files.length === 0
							: true
					}
					onClick={async e => {
						e.preventDefault();

						if (!inputFileRef.current?.files) {
							throw new Error("No file selected");
						}

						const file = inputFileRef.current.files[0];

						const response = await fetch(
							`/api/upload?filename=${file.name}`,
							{
								method: "POST",
								body: file,
							}
						);

						try {
							const newBlob: PutBlobResult =
								await response.json();
							addUrl(newBlob.url);
						} catch (error) {
							console.error(error);
						}
					}}
					type="button"
				>
					Upload
				</Button>
			</div>
		</>
	);
}
