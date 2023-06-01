'use client';

import { useChat } from '@/lib/chatContext';
import { ResetIcon } from './icons';

export default function Buttons() {
    const { reset, loading } = useChat();
    return (
        <div className="flex gap-2">
            <button
                title="Reset chat"
                onClick={reset}
                disabled={loading}
                className="rounded bg-purple-500 p-3 text-white shadow-md transition-colors hover:bg-purple-600 dark:bg-purple-600 dark:hover:bg-purple-500"
            >
                <ResetIcon width={24} height={24} />
            </button>
            <button
                title='Send message (or press "Enter")'
                className="w-full rounded bg-blue-500 p-3 text-white shadow-md transition-colors hover:bg-blue-400 dark:bg-blue-600 dark:hover:bg-blue-500"
            >
                Send
            </button>
        </div>
    );
}
