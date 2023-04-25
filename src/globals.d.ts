declare module '*.md';

type ChatGPTAgent = 'user' | 'system' | 'assistant';

interface ChatGPTMessage {
    role: ChatGPTAgent;
    content: string;
}

interface OpenAIStreamPayload {
    model: string;
    messages: ChatGPTMessage[];
    temperature: number;
    max_tokens: number;
    stream: boolean;
}

interface ChatResponse {
    id: string;
    object: string;
    created: number;
    choices: {
        index: number;
        message: {
            role: string;
            content: string;
        };
        finish_reason: string;
    }[];
    usage: {
        prompt_tokens: number;
        completion_tokens: number;
        total_tokens: number;
    };
}
