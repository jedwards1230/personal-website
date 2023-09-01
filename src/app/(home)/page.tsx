import { getPageViews } from '@/lib/actions';
import About from './About';
import Contact from './Contact';
import Experience from './Experiences';
import Projects from './Projects';

export default async function Page() {
    const pageViews = await getPageViews();
    return (
        <>
            <About />
            <Experience />
            <Projects />
            <Contact pageViews={pageViews} />
        </>
    );
}
