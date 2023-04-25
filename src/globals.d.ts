declare module '*.md';

type ChatGPTAgent = 'user' | 'system' | 'assistant';

interface ChatHistoryEntry {
    id: number;
    role: ChatGPTAgent;
    content: string;
}

interface ChatGPTMessage {
    id?: number;
    role: ChatGPTAgent;
    content: string;
}

interface OpenAIStreamPayload {
    model: 'gpt-3.5-turbo' | 'gpt-4';
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
