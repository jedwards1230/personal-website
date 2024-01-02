"use client";

import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function Editor({ data }: { data: string }) {
	const [dataString, setDataString] = useState(data);
	const ref = useRef<HTMLTextAreaElement>(null);

	const saveData = () => {
		if (ref.current) {
			const json = JSON.parse(ref.current.value);
			console.log(json);
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
			<Button disabled={dataString === data} onClick={saveData}>
				Save
			</Button>
		</div>
	);
}
