"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { uploadData } from "@/models/upload.server";
import { ChangeEvent, useState } from "react";

export default function Upload() {
	const [selectedFile, setSelectedFile] = useState<File | null>(null);

	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		const target = event.target as HTMLInputElement;
		if (!target.files) return;
		const file = target.files[0];
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
					uploadData(json); // Call the uploadData function with the parsed JSON
				} catch (error) {
					console.error("Error parsing JSON:", error);
				}
			};

			reader.readAsText(selectedFile);
		}
	};

	return (
		<>
			<Input type="file" onChange={handleFileChange} accept=".json" />
			<Button variant="link" onClick={handleUpload}>
				Upload Data
			</Button>
		</>
	);
}
