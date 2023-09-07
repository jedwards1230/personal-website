import ProjectList from '@/components/ProjectList';
import { getAllProjects } from '@/lib/actions';

export default async function Page() {
    const projects = await getAllProjects('id');
    return <ProjectList projects={projects} />;
}
