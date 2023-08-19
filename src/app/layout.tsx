import '@/globals.css';

import { Analytics } from '@vercel/analytics/react';
import { Providers } from './providers';

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
            <head>
                <script
                    defer
                    data-domain="jedwards.cc"
                    src="https://plausible.io/js/script.js"
                ></script>
            </head>
            <body className="flex h-full w-full overflow-hidden">
                <Providers>{children}</Providers>
                <Analytics />
            </body>
        </html>
    );
}
