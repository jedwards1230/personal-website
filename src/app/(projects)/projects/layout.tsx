export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="z-10 h-full w-full bg-neutral-50 dark:bg-neutral-950">
            {children}
        </div>
    );
}
