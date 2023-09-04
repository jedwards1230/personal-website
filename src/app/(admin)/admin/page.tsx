import { experiences, projects } from '@/data';

export default function Page() {
    return (
        <div className="flex flex-col gap-4 p-4">
            <div>Admin Page</div>
            <Section>
                <Title>Experience</Title>
                <List>
                    {experiences.map((e, i) => (
                        <ListItem key={i}>{e.company}</ListItem>
                    ))}
                </List>
            </Section>
            <Section>
                <Title>Projects</Title>
                <List>
                    {projects.map((p, i) => (
                        <ListItem key={i}>{p.title}</ListItem>
                    ))}
                </List>
            </Section>
        </div>
    );
}

function Section({ children }: { children: React.ReactNode }) {
    return <div className="rounded border border-border p-2">{children}</div>;
}

function Title({ children }: { children: React.ReactNode }) {
    return <div className="text-lg font-bold">{children}</div>;
}

function List({ children }: { children: React.ReactNode }) {
    return <div className="">{children}</div>;
}

function ListItem({ children }: { children: React.ReactNode }) {
    return <div className="">{children}</div>;
}
