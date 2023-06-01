'use client';

import { useChat } from '@/lib/chatContext';

export default function ChatSuggestions() {
    const { suggestions, sendMessage } = useChat();

    if (suggestions.length === 0) return null;
    return (
        <div className="flex justify-end gap-x-4">
            {suggestions.map((suggestion) => (
                <button
                    key={suggestion}
                    type="submit"
                    onClick={() => {
                        sendMessage(suggestion);
                    }}
                    className="prose prose-neutral rounded-lg border border-gray-300 bg-white px-3 py-1 text-sm shadow-lg transition-colors hover:bg-gray-200 focus:outline-none dark:border-gray-300 dark:bg-gray-400 dark:text-white dark:hover:bg-gray-500"
                >
                    {suggestion}
                </button>
            ))}
        </div>
    );
}
