export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="max-w-screen flex w-full flex-col justify-between gap-4 px-4 pt-8 sm:px-8 md:h-full md:px-12 md:pt-0 lg:px-24 xl:px-32">
            {children}
        </main>
    );
}
