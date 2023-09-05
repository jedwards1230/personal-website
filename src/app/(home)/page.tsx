import IconLinks from '@/components/IconLinks';
import SectionNav from '@/components/SectionNav';
import { NavigationProvider } from '../NavigationProvider';
import About from './About';
import Contact from './Contact';
import Experience from './Experiences';
import Projects from './Projects';
import { title } from '@/data';
import { getPageViews, getAllExperiences, getAllProjects } from '@/lib/actions';
import TagList from '@/components/TagList';

export default async function Page() {
    const [experiences, projects, pageViews] = await Promise.all([
        getAllExperiences('id'),
        getAllProjects('id'),
        getPageViews(),
    ]);

    return (
        <NavigationProvider experiences={experiences} projects={projects}>
            <nav className="inset-0 flex flex-col justify-between gap-4 overflow-hidden pb-12 md:sticky md:h-screen md:pt-16 lg:left-32">
                <div className="flex flex-col gap-12 transition-all lg:gap-32">
                    <Header />
                    <SectionNav />
                </div>
                <IconLinks />
            </nav>
            <div className="ml-auto flex h-full w-full flex-col gap-12 md:z-10 md:w-2/3 md:gap-24 lg:w-1/2">
                <About />
                <Experience experiences={experiences} />
                <Projects projects={projects} />
                <Contact pageViews={pageViews} />
            </div>
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
