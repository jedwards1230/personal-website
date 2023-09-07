export default async function RootLayout({
    children,
    projectListModal,
}: {
    children: React.ReactNode;
    projectListModal: React.ReactNode;
}) {
    return (
        <>
            <main className="max-w-screen flex w-full flex-col justify-between px-4 pt-8 sm:gap-4 sm:px-8 md:h-full md:flex-row md:px-16 md:pt-0 lg:px-32">
                {children}
            </main>
            <div key="projectListModal">{projectListModal}</div>
        </>
    );
}
