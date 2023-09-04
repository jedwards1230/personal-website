import { experiences, projects } from '@/data';
import { LogoutButton } from '@/components/buttons/LogoutButton';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { notFound, redirect } from 'next/navigation';
import { getAllMessages } from '@/lib/actions';

export default async function Page() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect('/api/auth/signin');
    }

    if (session.user.email !== process.env.ADMIN_EMAIL) {
        notFound();
    }

    const messages = await getAllMessages();

    return (
        <div className="mx-auto flex max-w-5xl flex-col gap-4 p-4">
            <div className="space-y-2">
                <div className="flex w-full justify-between">
                    <div className="text-xl font-medium">Admin Page</div>
                    <div>
                        <LogoutButton />
                    </div>
                </div>
                <div>Hi, {session.user.name}</div>
            </div>

            <div className="flex justify-between gap-8">
                <Section>
                    <Title>Experience</Title>
                    <List>
                        {experiences.map((e, i) => (
                            <ListItem key={'experience-' + i}>
                                {e.company}
                            </ListItem>
                        ))}
                    </List>
                </Section>
                <Section>
                    <Title>Projects</Title>
                    <List>
                        {projects.map((p, i) => (
                            <ListItem key={'projects-' + i}>{p.title}</ListItem>
                        ))}
                    </List>
                </Section>
            </div>
            <Section>
                <Title>Messages</Title>
                <List>
                    {messages.map((m, i) => (
                        <ListItem key={'message-' + i}>
                            <div className="flex w-full justify-between">
                                <span>{m.name}</span>
                                <span>{m.email}</span>
                                <span>{m.createdAt.toLocaleDateString()}</span>
                            </div>
                        </ListItem>
                    ))}
                </List>
            </Section>
        </div>
    );
}

function Section({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full rounded border border-border p-2">
            {children}
        </div>
    );
}

function Title({ children }: { children: React.ReactNode }) {
    return <div className="text-lg font-bold">{children}</div>;
}

function List({ children }: { children: React.ReactNode }) {
    return <div className="w-full">{children}</div>;
}

function ListItem({ children }: { children: React.ReactNode }) {
    return <div className="w-full">{children}</div>;
}
