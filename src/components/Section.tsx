export default function Section({
    children,
    id,
}: {
    children: React.ReactNode;
    id: Section;
}) {
    return (
        <div className="flex h-full flex-col sm:min-h-screen sm:pt-16" id={id}>
            <div className="text-xl font-medium md:hidden">
                {id.charAt(0).toUpperCase() + id.slice(1)}
            </div>
            {children}
        </div>
    );
}
