import '@/globals.css';

import { Analytics } from '@vercel/analytics/react';
import { Providers } from './providers';

export const runtime = 'edge';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html
            suppressHydrationWarning={true}
            lang="en"
            className="h-full w-full bg-white dark:bg-black"
        >
            <body className="flex h-full w-full overflow-hidden">
                <Providers>{children}</Providers>
                <Analytics />
            </body>
        </html>
    );
}
