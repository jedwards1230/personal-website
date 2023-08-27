import '@/globals.css';
import { Providers } from './providers';
import PlausibleProvider from 'next-plausible';

export default function RootLayout({
    children,
    modal,
}: {
    children: React.ReactNode;
    modal: React.ReactNode;
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
            <body className="overflow-none relative h-full w-full">
                <Providers>
                    <div className="h-full w-full overflow-y-scroll">
                        {children}
                    </div>
                    <div className="h-full w-full overflow-y-scroll">
                        {modal}
                    </div>
                </Providers>
            </body>
        </html>
    );
}
