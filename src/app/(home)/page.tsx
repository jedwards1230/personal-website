import Contact from './Contact';
import Projects from './Projects';
import { getPageViews, getAllProjects, getAbout } from '@/lib/actions';
import Intro from './Intro';

export default async function Page() {
    const [projects, pageViews, about] = await Promise.all([
        getAllProjects('id'),
        getPageViews(),
        getAbout(),
    ]);

    return (
        <>
            <Intro about={about} />
            <Projects projects={projects} />
            <Contact about={about} pageViews={pageViews} />
        </>
    );
}
