import Link from 'next/link';

import {
    getAllMessages,
    getAllExperiences,
    getAllProjects,
    getAbout,
} from '@/lib/actions';
import { ExperienceDialog } from '@/components/dialogs/admin/ExperienceDialog';
import { ProjectDialog } from '@/components/dialogs/admin/ProjectDialog';
import MessageDialog from '@/components/dialogs/admin/MessageDialog';
import { Label } from '@/components/ui/label';
import AboutDialog from '@/components/dialogs/admin/AboutDialog';
import Markdown from '@/components/Markdown';
import { AddButton, EditButton, ListItem, Section } from './UIHelpers';

const SECTIONS = {
    ABOUT: 'About',
    EXPERIENCE: 'Experience',
    PROJECTS: 'Projects',
    MESSAGES: 'Messages',
};

export const dynamic = 'force-dynamic';

export default async function Page() {
    const [experiences, projects, messages, about] = await Promise.all([
        getAllExperiences('company'),
        getAllProjects('title'),
        getAllMessages(),
        getAbout(),
    ]);

    const linkedInUsername = about.linkedin.replace(/\/$/, '').split('/').pop();
    const githubUsername = about.github.replace(/\/$/, '').split('/').pop();

    return (
        <>
            <Section
                addButtonDialog={
                    <AboutDialog about={about}>
                        <EditButton />
                    </AboutDialog>
                }
                title={SECTIONS.ABOUT}
            >
                {about && (
                    <div className="space-y-2 px-2">
                        <div className="flex">
                            <div className="w-1/2">
                                <Label>Name</Label>
                                <div>{about.name}</div>
                            </div>
                            <div className="w-1/2">
                                <Label>Title</Label>
                                <div>{about.title}</div>
                            </div>
                        </div>
                        <div>
                            <Label>Location</Label>
                            <div>{about.location}</div>
                        </div>
                        <div className="flex">
                            <div className="w-1/2">
                                <Label>Email</Label>
                                <div>{about.email}</div>
                            </div>
                            <div className="w-1/2">
                                <Label>Phone</Label>
                                <div>{about.phone}</div>
                            </div>
                        </div>
                        <div className="flex">
                            <div className="w-1/2">
                                <Label>Github</Label>
                                <div>
                                    <Link
                                        className="hover:underline"
                                        href={about.github}
                                        target="_blank"
                                    >
                                        {githubUsername}
                                    </Link>
                                </div>
                            </div>
                            <div className="w-1/2">
                                <Label>LinkedIn</Label>
                                <div>
                                    <Link
                                        className="hover:underline"
                                        href={about.linkedin}
                                        target="_blank"
                                    >
                                        {linkedInUsername}
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div>
                            <Label>Tags</Label>
                            <div>{about.tags.join(', ')}</div>
                        </div>
                        <div>
                            <Label>Bio</Label>
                            <div className="space-y-2">
                                <Markdown>{about.description}</Markdown>
                            </div>
                        </div>
                    </div>
                )}
            </Section>
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
                {messages.length > 0 ? (
                    <>
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
                                            <span className="font-bold text-primary-foreground">
                                                {m.readAt ? '' : '  •'}
                                            </span>
                                        </span>
                                        <span className="col-span-2 hidden sm:block">
                                            {m.name}
                                        </span>
                                        <span className="col-span-4">
                                            {m.email}
                                        </span>
                                        <span className="col-span-4 hidden truncate md:block">
                                            {m.message}
                                        </span>
                                    </div>
                                </ListItem>
                            </MessageDialog>
                        ))}
                    </>
                ) : (
                    <div className="px-2">No Messages</div>
                )}
            </Section>
        </>
    );
}
