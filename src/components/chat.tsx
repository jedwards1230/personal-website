import { FormEvent, useEffect, useState } from "react";
import useChat from "@/lib/useChat";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function Chat() {
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState("");
	const { messages, sendMessage } = useChat();

	async function handleSubmit(e: FormEvent) {
		e.preventDefault();
		if (message.trim()) {
			setLoading(true);
			setMessage("");

			const streamResponse = await sendMessage(message.trim());
			setLoading(false);
		}
	}

	return (
		<div className="p-4 max-w-2xl w-2xl">
			<div className="bg-white p-4 rounded overflow-y-scroll max-h-full shadow">
				{messages.map((msg, index) => (
					<div
						key={index}
						className={`mb-2 ${
							msg.role === "user" ? "text-right" : "text-left"
						}`}
					>
						<span
							className={`inline-block p-2 rounded ${
								msg.role === "user"
									? "bg-blue-500 text-white"
									: "bg-gray-200"
							}`}
						>
							<ReactMarkdown
								className="prose"
								remarkPlugins={[remarkGfm]}
							>
								{msg.content}
							</ReactMarkdown>
						</span>
					</div>
				))}
			</div>
			<form onSubmit={handleSubmit} className="mt-4">
				{/* todo: limit to something reasonable */}
				<input
					type="text"
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					className="w-full p-2 border rounded"
					placeholder="Type your message"
				/>
				<button
					type="submit"
					disabled={loading}
					className="mt-2 w-full p-2 bg-blue-500 text-white rounded"
				>
					{loading ? (
						<div className="animate-pulse font-bold tracking-widest">
							...
						</div>
					) : (
						"Send"
					)}
				</button>
			</form>
		</div>
	);
}
