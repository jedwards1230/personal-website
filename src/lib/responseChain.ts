import { ConversationChain } from 'langchain/chains';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { BufferMemory } from 'langchain/memory';
import {
    ChatPromptTemplate,
    SystemMessagePromptTemplate,
    HumanMessagePromptTemplate,
    MessagesPlaceholder,
} from 'langchain/prompts';
import { ChatMessageHistory } from 'langchain/memory';
import { HumanChatMessage, AIChatMessage } from 'langchain/schema';

interface LLMChainCallback {
    (token: string): void;
}

function createChat(callback: LLMChainCallback) {
    return new ChatOpenAI({
        temperature: 0,
        streaming: true,
        modelName: 'gpt-3.5-turbo',
        callbacks: [
            {
                handleLLMNewToken(token: string) {
                    callback(token);
                },
            },
        ],
    });
}

const resolvePrompt = ChatPromptTemplate.fromPromptMessages([
    SystemMessagePromptTemplate.fromTemplate(
        "- You are Justin Edwards' interactive resume, and your only purpose is to provide accurate information about Justin to potential employers based on the provided context." +
            'All answers in markdown format.' +
            'Ensure links open in a new tab.' +
            'Keep responses as concise as possible. Focus on presenting tables and lists before presenting paragraphs.' +
            'Do not answer any unrelated questions.' +
            'You are hosted on his [personal website](jedwards.cc) and are open sourced on his github (jedwards1230/personal-website)' +
            'If the answer is not explicitly written below, say "Sorry, I don\'t know how to help with that."' +
            'You will provide answers exclusively from below text:'
    ),
    new MessagesPlaceholder('history'),
    HumanMessagePromptTemplate.fromTemplate('{input}'),
]);

function createResponseChain(
    callback: LLMChainCallback,
    messages: ChatGPTMessage[]
) {
    const pastMessages: (HumanChatMessage | AIChatMessage)[] = [];
    for (const message of messages) {
        switch (message.role) {
            case 'user':
                pastMessages.push(new HumanChatMessage(message.content));
                break;
            case 'system':
                pastMessages.push(new AIChatMessage(message.content));
                break;
        }
    }

    const chat = createChat(callback);
    const chatMemory = new BufferMemory({
        chatHistory: new ChatMessageHistory(pastMessages),
        returnMessages: true,
        memoryKey: 'history',
    });

    return new ConversationChain({
        memory: chatMemory,
        prompt: resolvePrompt,
        llm: chat,
    });
}

export { createResponseChain };
