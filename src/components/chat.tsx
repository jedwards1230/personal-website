import { getInitialState } from '@/lib/gpt';
import ChatInterface from './ChatInterface';
import { ChatContextProvider } from '@/lib/chatContext';

export default async function Chat() {
    const initialState = await getInitialState();
    return (
        <ChatContextProvider initialState={initialState}>
            <div className="flex w-full max-w-2xl flex-col gap-4 p-4 dark:gap-2 md:w-auto md:max-w-5xl lg:max-w-7xl">
                <ChatInterface />
            </div>
        </ChatContextProvider>
    );
}
