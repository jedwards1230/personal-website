import DarkModeHandler from '@/components/darkMode';
import '@/globals.css';
import { ChatContextProvider } from '@/lib/chatContext';

import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <DarkModeHandler>
            <ChatContextProvider>
                <html lang="en">
                    <body>
                        {children}
                        <Analytics />
                    </body>
                </html>
            </ChatContextProvider>
        </DarkModeHandler>
    );
}
