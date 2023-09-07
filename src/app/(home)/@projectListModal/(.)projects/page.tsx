import Modal from '@/components/Modal';
import ProjectList from '@/components/ProjectList';
import { getAllProjects } from '@/lib/actions';

export default async function Page() {
    const projects = await getAllProjects('id');
    return (
        <Modal intercept={true}>
            <ProjectList projects={projects} modal={true} />
        </Modal>
    );
}
