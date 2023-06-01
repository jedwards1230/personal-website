import { getInitialState } from '@/lib/gpt';
import ChatInterface from './ChatInterface';
import { ChatProvider } from '@/lib/chatContext';
import ChatHistory from './ChatHistory';

export default async function Chat() {
    const initialState = await getInitialState();
    return (
        <ChatProvider initialChat={initialState}>
            <div className="flex w-full max-w-2xl flex-col gap-4 p-4 dark:gap-2 md:w-auto md:max-w-5xl lg:max-w-7xl">
                <ChatHistory />
                <ChatInterface />
            </div>
        </ChatProvider>
    );
}
