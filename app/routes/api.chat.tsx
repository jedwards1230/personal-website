import { ActionFunctionArgs } from "@remix-run/node";
import { OpenAIStream, StreamingTextResponse } from "ai";
import type OpenAI from "openai";

import openai from "@/lib/openai";
import { getAbout } from "@/models/about.server";
import { getAllExperiences } from "@/models/experience.server";
import { getAllProjects } from "@/models/project.server";

export const config = { runtime: "edge" };

type ResponseMessages = {
	messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[];
};

type SystemMessage = OpenAI.Chat.Completions.ChatCompletionSystemMessageParam;

export async function action({ request }: ActionFunctionArgs) {
	const { messages } = (await request.json()) as ResponseMessages;

	// Fetch data from your models
	const [about, experiences, projects] = await Promise.all([
		getAbout(),
		getAllExperiences("id"),
		getAllProjects("id"),
	]);

	// Insert the data into the system instruction
	const systemInstruction: SystemMessage = {
		role: "system",
		content: `You are a helpful assistant for ${
			about.name
		}. Here's some information about them: ${
			about.description
		}. I have these experiences: ${experiences
			.map((e) => e.title)
			.join(", ")}. And these are my projects: ${projects
			.map((p) => p.title)
			.join(", ")}.`,
	};

	// Add the system instruction to the messages
	messages.unshift(systemInstruction);

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
