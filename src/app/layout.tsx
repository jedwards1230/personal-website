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
            className="h-full w-full scroll-smooth bg-neutral-50 dark:bg-neutral-950"
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
