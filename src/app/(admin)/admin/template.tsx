export default function Template({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col gap-4 duration-200 animate-in fade-in">
            {children}
        </div>
    );
}
