import About from './About';
import Contact from './Contact';
import Experience from './Experiences';
import Projects from './Projects';
import { getPageViews, getAllExperiences, getAllProjects } from '@/lib/actions';

export default async function Page() {
    const [experiences, projects, pageViews] = await Promise.all([
        getAllExperiences('id'),
        getAllProjects('id'),
        getPageViews(),
    ]);

    return (
        <>
            <About />
            <Experience experiences={experiences} />
            <Projects projects={projects} />
            <Contact pageViews={pageViews} />
        </>
    );
}
