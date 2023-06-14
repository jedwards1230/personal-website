import { OpenAIEmbeddings } from 'langchain/embeddings/openai';

import supabase from './supabase';

export async function getInitialState() {
    const contextEntry = await getContextByTitle('base');
    const introEntry = await getContextByTitle('intro');
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
    const embeddings = new OpenAIEmbeddings();
    const res = await embeddings.embedQuery(body);

    return res;
}

// extract first message from messages (system message)
// add the data to the system message
export async function updateContext(
    messages: ChatGPTMessage[],
    documents?: string[]
) {
    const contextEntry = await getContextByTitle('base');
    const systemMessage = messages[0];
    systemMessage.content = documents
        ? `${contextEntry.body} \n # Context\n ${documents.join('\n')}
              Prioritize tables and strctured data. Use bulleted lists and headers to organize the information.`
        : contextEntry.body;

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
    messages: ChatGPTMessage[]
): Promise<EmbeddedDocument[]> {
    const queryEmbedding = await getEmbedding(JSON.stringify(messages));
    const { data, error } = await supabase.rpc('match_documents', {
        query_embedding: queryEmbedding,
        match_threshold: 0.5, // Adjust the similarity threshold as needed
        match_count: 4, // Adjust the number of matches you want to return
    });

    if (error) {
        throw new Error(error.message);
    }

    return data;
}
