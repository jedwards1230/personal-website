import type OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

import openai from "@/lib/openai";
import { getAbout } from "@/models/about.server";
import { getAllExperiences } from "@/models/experience.server";
import { getAllProjects } from "@/models/project.server";
import { getAllData } from "@/models/data.server";

export const runtime = "edge";

type ResponseMessages = {
	messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[];
};

type SystemMessage = OpenAI.Chat.Completions.ChatCompletionSystemMessageParam;

export async function POST(request: Request) {
	const { messages } = (await request.json()) as ResponseMessages;

	// Fetch data from your models
	const { about, educations, experiences, projects } = await getAllData();

	const dataString = `I have these experiences: ${JSON.stringify(
		experiences
	)}. And these are my projects: ${JSON.stringify(
		projects
	)}. And these are my educations: ${JSON.stringify(educations)}.`;

	// Insert the data into the system instruction
	const systemInstruction: SystemMessage = {
		role: "system",
		content:
			`You are a helpful assistant for ${about.name}. Here's some information about them: ${about.description}.\n\n` +
			dataString,
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
