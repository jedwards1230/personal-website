declare module "*.md";

type ChatGPTAgent = "user" | "system" | "assistant";

interface ChatGPTMessage {
	role: ChatGPTAgent;
	content: string;
}

interface OpenAIStreamPayload {
	model: string;
	messages: ChatGPTMessage[];
	temperature: number;
	top_p: number;
	frequency_penalty: number;
	presence_penalty: number;
	max_tokens: number;
	stream: boolean;
}
