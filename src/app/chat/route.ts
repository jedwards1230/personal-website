export const runtime = "experimental-edge";

export async function POST(request: Request) {
	const { messages } = (await request.json()) as {
		messages: ChatGPTMessage[];
	};

	const payload: OpenAIStreamPayload = {
		model: "gpt-3.5-turbo",
		messages,
		temperature: 0.7,
		top_p: 1,
		frequency_penalty: 0,
		presence_penalty: 0,
		max_tokens: 1000,
		stream: true,
	};

	const encoder = new TextEncoder();
	const decoder = new TextDecoder();

	let counter = 0;

	const res = await fetch("https://api.openai.com/v1/chat/completions", {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${process.env.OPENAI_KEY}`,
		},
		method: "POST",
		body: JSON.stringify(payload),
	});

	const stream = new ReadableStream<Uint8Array>({
		async start(controller) {
			if (!res.body) {
				controller.error("No response body");
				return;
			}

			const reader = res.body.getReader();

			async function processNextChunk() {
				const { done, value } = await reader.read();

				if (done) {
					controller.close();
					return;
				}

				if (value) {
					const text = decoder.decode(value);
					/* if (counter < 2 && text.match(/\n/).length) {
						counter++;
						await processNextChunk();
						return;
					} */
					const queue = encoder.encode(text);
					controller.enqueue(queue);
				}

				counter++;
				await processNextChunk();
			}

			await processNextChunk();
		},
	});

	return new Response(stream);
}
