import { useChat } from "ai/react";

import Markdown from "@/components/Markdown";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function Chat() {
	const { messages, input, handleInputChange, handleSubmit } = useChat();
	return (
		<div className="flex col-span-12 gap-4 lg:col-span-10 overflow-hidden h-full p-4 flex-col justify-between">
			<div className="flex overflow-y-scroll flex-col gap-4">
				{messages.length > 0
					? messages.map((m, i) => (
							<div
								key={m.content + i}
								className="border border-border rounded-md p-4"
							>
								<div className="capitalize font-semibold text-sm">
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
				className="flex gap-4 justify-between items-center"
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
