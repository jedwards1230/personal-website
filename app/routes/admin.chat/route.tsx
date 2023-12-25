import { useChat } from "ai/react";
import { Message, experimental_useAssistant as useAssistant } from "ai/react";

import Markdown from "@/components/Markdown";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import clsx from "clsx";

const roleToColorMap: Record<Message["role"], string> = {
	system: "text-red-500",
	user: "text-foreground",
	function: "text-blue-500",
	assistant: "text-green-500",
	data: "text-orange-500",
	tool: "text-purple-500",
};

export default function Chat() {
	const { status, messages, input, submitMessage, handleInputChange } =
		useAssistant({ api: "/api/assistant" });

	return (
		<div className="flex h-full flex-col justify-between gap-4">
			<div className="flex flex-col h-full overflow-y-scroll gap-4">
				{messages.map((m: Message) => {
					const input = m.data ? (m.data as any) : null;
					return (
						<div key={m.id} className="">
							<div
								className={clsx(
									roleToColorMap[m.role],
									"capitalize font-semibold text-sm"
								)}
							>{`${m.role}: `}</div>
							{m.role !== "data" && (
								<Markdown>{m.content}</Markdown>
							)}
							{m.role === "data" && (
								<>
									{/* here you would provide a custom display for your app-specific data:*/}
									{(m.data as any).description}
									<br />
									<pre className={"bg-secondary"}>
										{JSON.parse(input).input}
									</pre>
									<br />
									<pre className={"bg-secondary"}>
										{JSON.parse(input).outputs.map(
											(o: any, i: number) => (
												<span key={i}>
													{JSON.stringify(o.logs)}
													<br />
												</span>
											)
										)}
									</pre>
								</>
							)}
						</div>
					);
				})}
			</div>

			<form className="flex gap-2" onSubmit={submitMessage}>
				<Textarea
					disabled={status !== "awaiting_message"}
					value={input}
					placeholder="Type your message..."
					onChange={handleInputChange}
				/>
				<Button className="h-full" variant="ghost" type="submit">
					Send
				</Button>
			</form>
		</div>
	);
}

/* export default function Chat() {
	const { messages, input, handleInputChange, handleSubmit } = useChat();
	return (
		<div className="flex h-full flex-col justify-between">
			<div className="flex flex-col gap-4">
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
			<form onSubmit={handleSubmit}>
				<Textarea
					value={input}
					placeholder="Say something..."
					onChange={handleInputChange}
				/>
				<Button type="submit">Send</Button>
			</form>
		</div>
	);
}
 */
