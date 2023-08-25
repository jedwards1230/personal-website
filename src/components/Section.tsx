export default function Section({
    children,
    id,
}: {
    children: React.ReactNode;
    id: Section;
}) {
    return (
        <div className="flex flex-col" id={id}>
            <div className="text-xl font-medium md:hidden">
                {id.charAt(0).toUpperCase() + id.slice(1)}
            </div>
            {children}
        </div>
    );
}
