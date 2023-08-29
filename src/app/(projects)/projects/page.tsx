import ProjectList from '@/components/ProjectList';
import { projects } from '@/data';

export default function Page() {
    return <ProjectList projects={projects} />;
}
