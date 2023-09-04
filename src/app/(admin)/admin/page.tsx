import { projects } from '@/data';
import { LogoutButton } from '@/components/buttons/LogoutButton';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { notFound, redirect } from 'next/navigation';
import { getAllExperiences, getAllMessages } from '@/lib/actions';
import { ExperienceDialog } from '@/components/dialogs/admin/ExperienceDialog';
import { Button } from '@/components/ui/button';

export default async function Page() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect('/api/auth/signin');
    }

    if (session.user.email !== process.env.ADMIN_EMAIL) {
        notFound();
    }

    // TODO: parallelize
    const experiences = await getAllExperiences();
    const messages = await getAllMessages();

    return (
        <div className="mx-auto flex max-w-5xl flex-col gap-4 p-4">
            <div className="space-y-2">
                <div className="flex w-full justify-between">
                    <div className="text-xl font-medium">Admin Page</div>
                    <div>
                        <LogoutButton variant="outline">Log Out</LogoutButton>
                    </div>
                </div>
                <div>Hi, {session.user.name}</div>
            </div>

            <div className="flex flex-col justify-between gap-4 sm:flex-row md:gap-8">
                <Section>
                    <div className="flex w-full justify-between">
                        <Title>Experience</Title>
                        <div className="flex justify-end">
                            <ExperienceDialog>
                                <AddButton />
                            </ExperienceDialog>
                        </div>
                    </div>
                    <List>
                        {experiences.map((e, i) => (
                            <ExperienceDialog
                                experience={e}
                                key={'experience-' + i}
                            >
                                <ListItem>{e.company}</ListItem>
                            </ExperienceDialog>
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
        <div className="w-full rounded border border-border p-2 transition-all">
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
    return (
        <div className="w-full cursor-pointer hover:underline">{children}</div>
    );
}

function AddButton() {
    return (
        <Button variant="outline" size="icon">
            +
        </Button>
    );
}
