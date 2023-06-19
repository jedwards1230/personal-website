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
            className="flex flex-col justify-center gap-2 overflow-hidden p-0"
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
