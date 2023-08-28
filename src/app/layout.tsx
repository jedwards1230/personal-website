import PlausibleProvider from 'next-plausible';
import type { Metadata } from 'next/types';

import '@/globals.css';
import { Providers } from './providers';

const APP_NAME = 'J. Edwards Personal Website';
const APP_DEFAULT_TITLE = 'J. Edwards';
const APP_TITLE_TEMPLATE = 'J. Edwards | %s';
const APP_DESCRIPTION = 'Personal website for Justin Edwards';

export const metadata: Metadata = {
    applicationName: APP_NAME,
    title: {
        default: APP_DEFAULT_TITLE,
        template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
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
            className="scroll-smooth bg-neutral-50 selection:bg-neutral-300 selection:text-neutral-900 dark:bg-neutral-950 dark:selection:bg-neutral-400 dark:selection:text-neutral-900"
        >
            <head>
                <PlausibleProvider
                    domain="jedwards.cc"
                    trackOutboundLinks={true}
                />
            </head>
            <body className="relative h-full w-full">
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
