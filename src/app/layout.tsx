import '@/globals.css';
import { Providers } from './providers';
import PlausibleProvider from 'next-plausible';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html
            suppressHydrationWarning={true}
            lang="en"
            className="scroll-smooth bg-neutral-50 selection:bg-neutral-300 selection:text-neutral-900 dark:bg-neutral-950 dark:selection:bg-neutral-400 dark:selection:text-neutral-900"
        >
            <head>
                <PlausibleProvider
                    domain="jedwards.cc"
                    trackOutboundLinks={true}
                />
            </head>
            <body className="h-full w-full">
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
