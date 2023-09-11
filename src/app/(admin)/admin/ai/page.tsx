import { getAbout, getAllExperiences, getAllProjects } from '@/lib/actions';
import Form from './Form';

export const dynamic = 'force-dynamic';

export default async function Page() {
    const [experiences, projects, about] = await Promise.all([
        getAllExperiences('company'),
        getAllProjects('title'),
        getAbout(),
    ]);

    return <Form experiences={experiences} about={about} />;
}
