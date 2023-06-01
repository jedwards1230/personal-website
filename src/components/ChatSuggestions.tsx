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
                    className="prose prose-neutral rounded-lg border border-gray-300 bg-white px-3 py-1 text-sm shadow-lg transition-colors hover:bg-gray-200 focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
                >
                    {suggestion}
                </button>
            ))}
        </div>
    );
}
