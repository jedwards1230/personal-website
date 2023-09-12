import { getAbout, getAllExperiences, getAllProjects } from '@/lib/actions';
import FormOptions from './FormOptions';

export const dynamic = 'force-dynamic';

export default async function Page() {
    const [experiences, projects, about] = await Promise.all([
        getAllExperiences('company'),
        getAllProjects('title'),
        getAbout(),
    ]);

    return <FormOptions experiences={experiences} about={about} />;
}
