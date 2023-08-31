import PlausibleProvider from 'next-plausible';
import type { Metadata } from 'next/types';

import '@/globals.css';
import { Providers } from './providers';
import ThemeToggle from '@/components/ThemeToggle';

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
    openGraph: {
        url: '/og',
        images: ['/og'],
        type: 'website',
        siteName: APP_NAME,
        title: {
            default: APP_DEFAULT_TITLE,
            template: APP_TITLE_TEMPLATE,
        },
        description: APP_DESCRIPTION,
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
            className="background-background select-none scroll-smooth text-foreground selection:bg-neutral-300 selection:text-neutral-900 dark:selection:bg-neutral-400 dark:selection:text-neutral-900 sm:select-auto"
        >
            <head>
                <PlausibleProvider
                    domain="jedwards.cc"
                    trackOutboundLinks={true}
                />
            </head>
            <body className="relative mx-auto h-full w-full max-w-10xl">
                <Providers>
                    <div className="fixed bottom-8 right-8 z-10 sm:bottom-12">
                        <ThemeToggle />
                    </div>
                    {children}
                </Providers>
            </body>
        </html>
    );
}
