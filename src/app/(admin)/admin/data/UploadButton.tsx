"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { revalidateAction } from "@/lib/action.server";
import { uploadData } from "@/models/data.server";
import { UploadCloudIcon } from "lucide-react";
import { ChangeEvent, useState } from "react";

export default function Upload() {
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [statusMessage, setStatusMessage] = useState<string | null>(null);

	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		const target = event.target as HTMLInputElement;
		if (!target.files) return;
		const file = target.files[0];
		console.log({ file });
		setSelectedFile(file);
	};

	const handleUpload = async () => {
		if (selectedFile) {
			const reader = new FileReader();

			reader.onload = async e => {
				const text = e.target?.result;
				if (!text) return;
				if (typeof text !== "string") return;
				try {
					const json = JSON.parse(text);
					await uploadData(json);
					setStatusMessage("Data uploaded successfully");
					revalidateAction();
				} catch (error) {
					console.error("Error parsing JSON:", error);
					setStatusMessage("Error parsing JSON");
				}
			};

			reader.readAsText(selectedFile);
		}
	};

	return (
		<div className="space-y-1">
			<div className="flex gap-2">
				<Input type="file" onChange={handleFileChange} accept=".json" />
				<Button
					size="icon"
					disabled={!selectedFile}
					onClick={handleUpload}
				>
					<UploadCloudIcon />
				</Button>
			</div>
			{statusMessage && <p className="pl-2">{statusMessage}</p>}
		</div>
	);
}
