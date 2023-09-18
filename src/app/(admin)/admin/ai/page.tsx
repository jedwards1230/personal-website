import {
    getAbout,
    getAllExperiences,
    getAllJobs,
    getAllProjects,
} from '@/lib/actions';
import Assistant from './Assistant';

export const dynamic = 'force-dynamic';

export default async function Page() {
    const [experiences, projects, about, jobs] = await Promise.all([
        getAllExperiences('company'),
        getAllProjects('title'),
        getAbout(),
        getAllJobs(),
    ]);

    return (
        <Assistant
            experiences={experiences}
            projects={projects}
            about={about}
            jobs={jobs}
        />
    );
}
