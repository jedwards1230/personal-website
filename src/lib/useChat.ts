"use client";

import { useState } from "react";
import aboutContent from "@/about.md";
import ruleContent from "@/rules.md";

const combinedContent = `rules: ${ruleContent}\nresume: ${aboutContent}`;

export default function useChat() {
	const [messages, setMessages] = useState<ChatGPTMessage[]>([
		{
			role: "system",
			content: combinedContent,
		},
		{
			role: "assistant",
			content:
				"Hello, I am Justin's personal assistant. How can I help you?",
		},
	]);

	const sendMessage = async (message: string) => {
		setMessages((prevMessages) => [
			...prevMessages,
			{ role: "user", content: message },
		]);

		const response = await fetch("/chat", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				messages: [...messages, { role: "user", content: message }],
			}),
		});

		const reader = response.body?.getReader();

		if (reader) {
			let aiResponse = "";
			while (true) {
				const { done, value } = await reader.read();
				if (done) break;
				if (value) {
					const decoded = new TextDecoder().decode(value);
					const cleanDecoded =
						removeNonPrintableChars(decoded).trim();
					const jsonStrings = extractJSON(cleanDecoded);

					for (const jsonString of jsonStrings) {
						if (jsonString.includes("[DONE]")) break;
						const parsed = JSON.parse(jsonString);
						if (!parsed.choices[0].delta.content) continue;
						try {
							aiResponse += parsed.choices[0].delta.content;
						} catch (error) {
							console.error("Error parsing JSON:", error);
						}
					}
				}
			}

			setMessages((prevMessages) => [
				...prevMessages,
				{ role: "assistant", content: aiResponse },
			]);
		}
	};

	return { messages: messages.slice(1), sendMessage };
}

function removeNonPrintableChars(str: string) {
	return str.replace(/[\x00-\x1F\x7F-\x9F]/g, "");
}

function extractJSON(str: string) {
	return str.split("data:").filter((part) => part.trim().length > 0);
}
