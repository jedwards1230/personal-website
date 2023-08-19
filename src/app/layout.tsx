import '@/globals.css';
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
                    src="https://plausible.io/js/script.tagged-events.outbound-links.js"
                ></script>
            </head>
            <body className="flex h-full w-full overflow-hidden">
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
