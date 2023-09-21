import ProjectListDialog from '@/components/dialogs/ProjectListDialog';
import { getAllProjects } from '@/lib/actions';

export default async function Page() {
    const projects = await getAllProjects('id');
    return <ProjectListDialog projects={projects} />;
}
