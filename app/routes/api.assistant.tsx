import openai from "@/lib/openai";
import { invariant } from "@/utils";
import { type ActionFunctionArgs } from "@remix-run/node";
import { experimental_AssistantResponse } from "ai";
import type OpenAI from "openai";
import { MessageContentText } from "openai/resources/beta/threads/messages/messages";

export async function action({ request }: ActionFunctionArgs) {
	// Parse the request body
	const input: {
		threadId: string | null;
		message: string;
	} = await request.json();

	invariant(process.env.ASSISTANT_ID, "ASSISTANT_ID is not set");
	const assistant = await openai.beta.assistants.update(
		process.env.ASSISTANT_ID,
		{ tools: [{ type: "code_interpreter" }] }
	);

	// Create a thread if needed
	const threadId =
		input.threadId ?? (await openai.beta.threads.create({})).id;

	// Add a message to the thread
	const createdMessage = await openai.beta.threads.messages.create(threadId, {
		role: "user",
		content: input.message,
	});

	return experimental_AssistantResponse(
		{ threadId, messageId: createdMessage.id },
		async ({ threadId, sendMessage, sendDataMessage }) => {
			// Run the assistant on the thread
			const run = await openai.beta.threads.runs.create(threadId, {
				assistant_id:
					process.env.ASSISTANT_ID ??
					(() => {
						throw new Error("ASSISTANT_ID is not set");
					})(),
			});

			async function waitForRun(run: OpenAI.Beta.Threads.Runs.Run) {
				// Poll for status change
				while (
					run.status === "queued" ||
					run.status === "in_progress"
				) {
					// delay for 500ms:
					await new Promise((resolve) => setTimeout(resolve, 500));

					run = await openai.beta.threads.runs.retrieve(
						threadId!,
						run.id
					);
				}

				// Check the run status
				if (
					run.status === "cancelled" ||
					run.status === "cancelling" ||
					run.status === "failed" ||
					run.status === "expired"
				) {
					throw new Error(run.status);
				}

				if (run.status === "requires_action") {
					if (run.required_action?.type === "submit_tool_outputs") {
						const tool_outputs =
							run.required_action.submit_tool_outputs.tool_calls.map(
								(toolCall) => {
									/* const parameters = JSON.parse(
										toolCall.function.arguments
									); */

									switch (toolCall.function.name) {
										default:
											throw new Error(
												`Unknown tool call function: ${toolCall.function.name}`
											);
									}
								}
							);

						run = await openai.beta.threads.runs.submitToolOutputs(
							threadId!,
							run.id,
							{ tool_outputs }
						);

						await waitForRun(run);
					}
				}
			}

			await waitForRun(run);

			const runSteps = (
				await openai.beta.threads.runs.steps.list(threadId, run.id)
			).data;

			runSteps.forEach((step) => {
				if (step.step_details.type === "tool_calls") {
					for (const toolCall of step.step_details.tool_calls) {
						if (toolCall.type === "code_interpreter") {
							console.log(toolCall.code_interpreter.outputs);
							sendDataMessage({
								id: toolCall.id,
								role: "data",
								data: JSON.stringify(toolCall.code_interpreter),
							});
						}
					}
				}
			});

			// Get new thread messages (after our message)
			const responseMessages = (
				await openai.beta.threads.messages.list(threadId, {
					after: createdMessage.id,
					order: "asc",
				})
			).data;

			// Send the messages
			for (const message of responseMessages) {
				sendMessage({
					id: message.id,
					role: "assistant",
					content: message.content.filter(
						(content) => content.type === "text"
					) as Array<MessageContentText>,
				});
			}
		}
	);
}
