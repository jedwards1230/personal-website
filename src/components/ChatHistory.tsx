'use client';

import { motion } from 'framer-motion';

import { useChat } from '@/lib/chatContext';
import ChatBubble from './ChatBubble';

export default function ChatHistory() {
    const { messages } = useChat();

    return (
        <motion.div
            layout
            transition={{ duration: 0.1 }}
            className="items-between flex flex-col justify-center gap-2 overflow-hidden rounded border bg-white p-4 shadow-lg dark:border-none dark:bg-transparent dark:px-0"
        >
            {messages.map((msg, index) => {
                if (index === 0) return null;
                return (
                    <ChatBubble
                        key={msg.content + msg.role + index}
                        msg={msg}
                    />
                );
            })}
        </motion.div>
    );
}
