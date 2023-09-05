import { getAllExperiences, getAllProjects } from '@/lib/actions';
import About from './About';
import Contact from './Contact';
import Experience from './Experiences';
import Projects from './Projects';
import { getPageViews } from '@/lib/actions';
import { NavigationProvider } from '../NavigationProvider';

export default async function Page() {
    const [experiences, projects, pageViews] = await Promise.all([
        getAllExperiences(),
        getAllProjects(),
        getPageViews(),
    ]);

    // sort by id
    const sortedExperiences = experiences.sort((a, b) => {
        if (a.id > b.id) {
            return 1;
        } else if (a.id < b.id) {
            return -1;
        } else {
            return 0;
        }
    });

    const sortedProjects = projects.sort((a, b) => {
        if (a.id > b.id) {
            return 1;
        } else if (a.id < b.id) {
            return -1;
        } else {
            return 0;
        }
    });

    return (
        <NavigationProvider experiences={experiences} projects={projects}>
            <About />
            <Experience experiences={sortedExperiences} />
            <Projects projects={sortedProjects} />
            <Contact pageViews={pageViews} />
        </NavigationProvider>
    );
}
