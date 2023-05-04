import DarkModeHandler from '@/components/darkMode';
import '@/globals.css';

import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <DarkModeHandler>
            <html lang="en">
                <body className="flex h-full w-full flex-col items-center justify-center overflow-y-scroll py-4 text-center sm:py-8 md:py-16">
                    {children}
                    <Analytics />
                </body>
            </html>
        </DarkModeHandler>
    );
}
