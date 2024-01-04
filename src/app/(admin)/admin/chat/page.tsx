"use client";

import { useChat } from "ai/react";

import Markdown from "@/components/Markdown";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function Page() {
	const { messages, input, handleInputChange, handleSubmit } = useChat();
	return (
		<div className="col-span-12 flex h-full flex-col justify-between gap-4 overflow-hidden p-4 lg:col-span-10">
			<div className="flex flex-col gap-4 overflow-y-scroll">
				{messages.length > 0
					? messages.map((m, i) => (
							<div
								key={m.content + i}
								className="rounded-md border border-border p-4"
							>
								<div className="text-sm font-semibold capitalize">
									{m.role}
								</div>
								<div className="pl-2">
									<Markdown>{m.content}</Markdown>
								</div>
							</div>
						))
					: null}
			</div>
			<form
				className="flex items-center justify-between gap-4"
				onSubmit={handleSubmit}
			>
				<Textarea
					value={input}
					placeholder="Say something..."
					onChange={handleInputChange}
				/>
				<Button className="h-full" type="submit">
					Send
				</Button>
			</form>
		</div>
	);
}
