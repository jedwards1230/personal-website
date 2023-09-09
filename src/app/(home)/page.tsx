import IconLinks from '@/components/IconLinks';
import SectionNav from '@/components/SectionNav';
import About from './About';
import Contact from './Contact';
import Experience from './Experiences';
import Projects from './Projects';
import {
    getPageViews,
    getAllExperiences,
    getAllProjects,
    getAbout,
} from '@/lib/actions';
import TagList from '@/components/TagList';

export default async function Page() {
    const [experiences, projects, pageViews, about] = await Promise.all([
        getAllExperiences('id'),
        getAllProjects('id'),
        getPageViews(),
        getAbout(),
    ]);

    return (
        <>
            <nav className="inset-0 flex flex-col justify-between gap-4 overflow-hidden pb-12 md:sticky md:h-screen md:pt-16 lg:left-32">
                <div className="flex flex-col gap-12 transition-all lg:gap-32">
                    <div>
                        <div className="text-4xl" aria-label="Name">
                            {about.name}
                        </div>
                        <div
                            className="pb-1 text-2xl text-neutral-600 dark:text-neutral-500"
                            aria-label="Title"
                        >
                            {about.title}
                        </div>
                        <TagList tags={about.tags} />
                    </div>
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
        </>
    );
}
