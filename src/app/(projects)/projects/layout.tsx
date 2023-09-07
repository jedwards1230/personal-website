export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex w-full flex-col gap-2 px-4 pt-8 sm:px-8 md:gap-8 md:px-16 md:pt-16 lg:px-32">
            {children}
        </div>
    );
}
