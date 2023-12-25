import openai from "@/lib/openai";
import { ActionFunctionArgs } from "@remix-run/node";
import { OpenAIStream, StreamingTextResponse } from "ai";

export const config = { runtime: "edge" };

export async function action({ request }: ActionFunctionArgs) {
	const { messages } = await request.json();
	const response = await openai.chat.completions.create({
		model: "gpt-4-1106-preview",
		stream: true,
		messages,
	});

	// Convert the response into a friendly text-stream
	const stream = OpenAIStream(response);
	// Respond with the stream
	return new StreamingTextResponse(stream);
}
