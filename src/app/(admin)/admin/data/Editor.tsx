"use client";

import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { uploadData } from "@/models/data.server";

export default function Editor({ data }: { data: string }) {
	const [loading, setLoading] = useState(false);
	const [dataString, setDataString] = useState(data);
	const ref = useRef<HTMLTextAreaElement>(null);

	const saveData = async () => {
		if (ref.current) {
			try {
				setLoading(true);
				const json = JSON.parse(ref.current.value);
				await uploadData(json);
				setLoading(false);
			} catch (error) {
				console.error(error);
			}
		}
	};

	return (
		<div className="flex flex-col gap-4">
			<Textarea
				ref={ref}
				className="w-full h-96"
				value={dataString}
				onChange={e => setDataString(e.target.value)}
			></Textarea>
			<Button
				disabled={dataString === data || loading}
				onClick={saveData}
			>
				Save
			</Button>
		</div>
	);
}
