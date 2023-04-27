import supabase from './supabase';

const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.OPENAI_KEY}`,
};

let context: string;

export async function getInitialState() {
    const contextEntry = await getContextByTitle('base');
    const introEntry = await getContextByTitle('intro');
    context = contextEntry.body;
    const initialState: ChatGPTMessage[] = [
        {
            role: 'system',
            content: contextEntry.body,
        },
        {
            role: 'assistant',
            content: introEntry.body,
        },
    ];

    return initialState;
}

export async function getEmbedding(body: string) {
    const embedding = await fetch('https://api.openai.com/v1/embeddings', {
        headers,
        method: 'POST',
        body: JSON.stringify({
            model: 'text-embedding-ada-002',
            input: body,
        }),
    });

    const jsonData: EmbedResponse = await embedding.json();

    return jsonData.data[0].embedding;
}

export async function getChat(messages: ChatGPTMessage[], stream = true) {
    const payload: OpenAIStreamPayload = {
        model: 'gpt-3.5-turbo',
        messages,
        temperature: 0.1,
        max_tokens: 1000,
        stream,
    };

    const res = await fetch('https://api.openai.com/v1/chat/completions', {
        headers,
        method: 'POST',
        body: JSON.stringify(payload),
    });

    return res;
}

// extract first message from messages (system message)
// add the data to the system message
export function updateContext(messages: ChatGPTMessage[], documents?: string) {
    const systemMessage = messages[0];
    systemMessage.content = documents
        ? `${context}\n\n# Context\n\n${documents}`
        : context;
    return [systemMessage, ...messages.slice(1)];
}

export async function getContextByTitle(title: 'base' | 'intro') {
    const { data, error } = await supabase
        .from('context')
        .select('*')
        .eq('title', title);

    if (error) {
        throw error;
    }

    return data[0];
}

export async function searchSimilarDocuments(
    queryEmbedding: number[]
): Promise<EmbeddedDocument[]> {
    const { data, error } = await supabase.rpc('match_documents', {
        query_embedding: queryEmbedding,
        match_threshold: 0.5, // Adjust the similarity threshold as needed
        match_count: 5, // Adjust the number of matches you want to return
    });

    if (error) {
        throw new Error(error.message);
    }

    return data;
}

export async function reviewDocuments(
    documents: EmbeddedDocument[],
    query: string
) {
    const messages: ChatGPTMessage[] = [
        {
            role: 'system',
            content: `
                Based on the query, consolidate the documents into a list of facts, organized by topic
                
                # Query

                ${query}

                # Documents

                ${documents.map((document) => document.body).join('\n\n')}
                `,
        },
    ];

    const payload: OpenAIStreamPayload = {
        model: 'gpt-3.5-turbo',
        messages,
        temperature: 0.3,
        max_tokens: 1000,
        stream: false,
    };

    const res = await fetch('https://api.openai.com/v1/chat/completions', {
        headers,
        method: 'POST',
        body: JSON.stringify(payload),
    });

    const answer = (await res.json()) as ChatResponse;

    return answer;
}
