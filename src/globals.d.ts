type ChatGPTAgent = 'user' | 'system' | 'assistant';

type EmbedResponse = {
    object: string;
    data: { embedding: number[]; object: string; index: number }[];
    model: string;
    usage: { prompt_tokens: number; total_tokens: number };
};

interface EmbeddedDocument {
    id: number;
    title: string;
    body: string;
    category: string;
    src: string;
    similarity: number;
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
        message: ChatGPTMessage;
        finish_reason: string;
    }[];
    usage: {
        prompt_tokens: number;
        completion_tokens: number;
        total_tokens: number;
    };
}
