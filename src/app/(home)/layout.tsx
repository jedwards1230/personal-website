import SectionNav from '@/components/SectionNav';
import IconLinks from '@/components/IconLinks';
import TagList from '@/components/TagList';
import { title } from '@/data';
import { NavigationProvider } from '../NavigationProvider';
import { getAllExperiences, getAllProjects } from '@/lib/actions';

export const runtime = 'edge';

export default async function RootLayout({
    children,
    projectListModal,
}: {
    children: React.ReactNode;
    projectListModal: React.ReactNode;
}) {
    const [experiences, projects] = await Promise.all([
        getAllExperiences('id'),
        getAllProjects('id'),
    ]);
    return (
        <NavigationProvider experiences={experiences} projects={projects}>
            <main className="max-w-screen flex w-full flex-col justify-between px-4 pt-8 sm:gap-4 sm:px-8 md:h-full md:flex-row md:px-16 md:pt-0 lg:px-32">
                <nav className="inset-0 flex flex-col justify-between gap-4 overflow-hidden pb-12 md:sticky md:h-screen md:pt-16 lg:left-32">
                    <div className="flex flex-col gap-12 transition-all lg:gap-32">
                        <Header />
                        <SectionNav />
                    </div>
                    <IconLinks />
                </nav>
                <div className="ml-auto flex h-full w-full flex-col gap-12 md:z-10 md:w-2/3 md:gap-24 lg:w-1/2">
                    {children}
                </div>
            </main>
            <div key="projectListModal">{projectListModal}</div>
        </NavigationProvider>
    );
}

function Header() {
    return (
        <div>
            <div className="text-4xl" aria-label="Name">
                {title.name}
            </div>
            <div
                className="pb-1 text-2xl text-neutral-600 dark:text-neutral-500"
                aria-label="Title"
            >
                {title.title}
            </div>
            <TagList tags={title.tags} />
        </div>
    );
}
