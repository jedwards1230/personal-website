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

    const [experiences, projects, messages] = await Promise.all([
        getAllExperiences('company'),
        getAllProjects('title'),
        getAllMessages(),
    ]);

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

            <div className="flex flex-col justify-between gap-4 sm:flex-row md:gap-8">
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
                {messages.map((m, i) => (
                    <ListItem key={'message-' + i}>
                        <div className="flex w-full justify-between">
                            <span>{m.name}</span>
                            <span>{m.email}</span>
                            <span>{m.createdAt.toLocaleDateString()}</span>
                        </div>
                    </ListItem>
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
        <div className="w-full cursor-pointer rounded-lg p-1 hover:bg-secondary/60 hover:underline">
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
