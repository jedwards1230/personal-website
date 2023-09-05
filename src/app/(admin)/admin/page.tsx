import { LogoutButton } from '@/components/buttons/LogoutButton';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { notFound, redirect } from 'next/navigation';
import {
    getAllMessages,
    getAllExperiences,
    getAllProjects,
} from '@/lib/actions';
import { ExperienceDialog } from '@/components/dialogs/admin/ExperienceDialog';
import { Button } from '@/components/ui/button';
import { ProjectDialog } from '@/components/dialogs/admin/ProjectDialog';
import MessageDialog from '@/components/dialogs/admin/MessageDialog';

const SECTIONS = {
    EXPERIENCE: 'Experience',
    PROJECTS: 'Projects',
    MESSAGES: 'Messages',
};

export const dynamic = 'force-dynamic';

export default async function Page() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect('/api/auth/signin');
    }

    if (session.user.email !== process.env.ADMIN_EMAIL) {
        notFound();
    }

    const [experiencesPromise, projectsPromise, messagesPromise] =
        await Promise.allSettled([
            getAllExperiences('company'),
            getAllProjects('title'),
            getAllMessages(),
        ]);

    // handle promise results
    if (experiencesPromise.status === 'rejected') {
        console.error(experiencesPromise.reason);
    }
    if (projectsPromise.status === 'rejected') {
        console.error(projectsPromise.reason);
    }
    if (messagesPromise.status === 'rejected') {
        console.error(messagesPromise.reason);
    }

    const experiences =
        experiencesPromise.status === 'fulfilled'
            ? experiencesPromise.value
            : [];
    const projects =
        projectsPromise.status === 'fulfilled' ? projectsPromise.value : [];
    const messages =
        messagesPromise.status === 'fulfilled' ? messagesPromise.value : [];

    return (
        <div className="mx-auto flex max-w-5xl flex-col gap-4 p-4">
            <div className="space-y-2">
                <div className="flex w-full justify-between">
                    <div className="text-xl font-medium">Admin Page</div>
                    <div>
                        <LogoutButton variant="outline">Log Out</LogoutButton>
                    </div>
                </div>
                <div>Hi, {session ? session.user.name : 'Guest'}</div>
            </div>

            <div className="flex flex-col justify-between gap-4 sm:flex-row">
                <Section
                    title={SECTIONS.EXPERIENCE}
                    addButtonDialog={
                        <ExperienceDialog>
                            <AddButton />
                        </ExperienceDialog>
                    }
                >
                    {experiences.map((e, i) => (
                        <ExperienceDialog
                            experience={e}
                            key={'experience-' + i}
                        >
                            <ListItem>{e.company}</ListItem>
                        </ExperienceDialog>
                    ))}
                </Section>
                <Section
                    title={SECTIONS.PROJECTS}
                    addButtonDialog={
                        <ProjectDialog>
                            <AddButton />
                        </ProjectDialog>
                    }
                >
                    {projects.map((p, i) => (
                        <ProjectDialog project={p} key={'project-' + i}>
                            <ListItem>{p.title}</ListItem>
                        </ProjectDialog>
                    ))}
                </Section>
            </div>
            <Section title={SECTIONS.MESSAGES}>
                <div className="grid grid-cols-6 pb-1 text-secondary-foreground sm:grid-cols-8 md:grid-cols-12">
                    <span className="col-span-2 underline">Date</span>
                    <span className="col-span-2 hidden underline sm:block">
                        Name
                    </span>
                    <span className="col-span-4 underline">Email</span>
                    <span className="col-span-4 hidden underline md:block">
                        Message
                    </span>
                </div>
                {messages.map((m, i) => (
                    <MessageDialog key={'message-' + i} message={m}>
                        <ListItem>
                            <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-12">
                                <span className="col-span-2">
                                    {m.createdAt.toLocaleDateString()}
                                </span>
                                <span className="col-span-2 hidden sm:block">
                                    {m.name}
                                </span>
                                <span className="col-span-4">{m.email}</span>
                                <span className="col-span-4 hidden truncate md:block">
                                    {m.message}
                                </span>
                            </div>
                        </ListItem>
                    </MessageDialog>
                ))}
            </Section>
        </div>
    );
}

function Section({
    children,
    title,
    addButtonDialog,
}: {
    children: React.ReactNode;
    title: string;
    addButtonDialog?: React.ReactNode;
}) {
    return (
        <div className="w-full rounded border border-border p-2 transition-all">
            <div className="flex w-full justify-between">
                <Title>{title}</Title>
                {addButtonDialog && (
                    <div className="flex justify-end">{addButtonDialog}</div>
                )}
            </div>
            <List>{children}</List>
        </div>
    );
}

function Title({ children }: { children: React.ReactNode }) {
    return <div className="py-2 text-lg font-bold">{children}</div>;
}

function List({ children }: { children: React.ReactNode }) {
    return <div className="w-full py-1">{children}</div>;
}

function ListItem({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full cursor-pointer rounded-lg p-1 underline-offset-4 hover:bg-secondary/60 hover:underline">
            {children}
        </div>
    );
}

function AddButton() {
    return (
        <Button className="text-xl font-medium" variant="outline" size="icon">
            +
        </Button>
    );
}
