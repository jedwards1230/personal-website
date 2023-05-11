'use client';

import { useChat } from '@/lib/chatContext';

export default function ChatSuggestions({
    setMessage,
}: {
    setMessage: (message: string) => void;
}) {
    const { suggestions } = useChat();

    if (suggestions.length === 0) return null;
    return (
        <div className="flex justify-end gap-x-6">
            {suggestions.map((suggestion) => (
                <button
                    key={suggestion}
                    type="submit"
                    onClick={() => {
                        setMessage(suggestion);
                    }}
                    className="prose prose-neutral rounded-full border border-gray-300 bg-white px-4 py-2 shadow-lg transition-colors hover:bg-gray-200 focus:outline-none dark:border-gray-300 dark:bg-gray-400 dark:text-white dark:hover:bg-gray-500"
                >
                    {suggestion}
                </button>
            ))}
        </div>
    );
}
