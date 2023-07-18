import '@/globals.css';

import { Analytics } from '@vercel/analytics/react';
import { Providers } from './providers';

export const metadata = {
    viewport: {
        width: 'device-width',
        minimumScale: 1,
        initialScale: 1,
        maximumScale: 1,
        userScalable: false,
    },
};

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
            <body className="container flex h-full w-full flex-col items-center justify-center overflow-y-scroll py-4 text-center sm:py-8 md:py-16">
                <Providers>{children}</Providers>
                <Analytics />
            </body>
        </html>
    );
}
