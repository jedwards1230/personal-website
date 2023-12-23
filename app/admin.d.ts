type Message = {
	id: number;
	role: "system" | "assistant" | "user";
	content: string;
};

type Forms = "Cover Letter" | "Interview" | "Assistant";

interface StreamData {
	error?: {
		code: string | null;
		message: string;
		param: string | null;
		type: string;
	};
	choices?: Choice[];
	created: number;
	id: string;
	model: Model;
	object: string;
}

type Choice = {
	delta: {
		function_call?: {
			arguments?: string;
			name?: string;
		};
		content?: string;
	};
	finish_reason: "function_call" | null;
	index: number;
};

type Model = "gpt-3.5-turbo" | "gpt-3.5-turbo-16k" | "gpt-4" | "gpt-4-0613";

type InterviewPhase = "Initial" | "Technical" | "Personality";
