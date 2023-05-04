import { useChat } from '@/lib/chatContext';
import ChatBubble from './ChatBubble';

export default function ChatHistory() {
    const { messages } = useChat();

    return (
        <div className="flex flex-col gap-2 rounded border bg-white p-4 shadow-lg dark:border-none dark:bg-transparent dark:px-0">
            {messages.map((msg, index) => {
                if (index === 0) return null;
                return (
                    <ChatBubble
                        key={msg.content + msg.role + index}
                        msg={msg}
                    />
                );
            })}
        </div>
    );
}
