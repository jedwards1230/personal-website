import Modal from '@/components/Modal';
import ProjectList from '@/components/ProjectList';
import { projects } from '@/data';

export default function Page() {
    return (
        <Modal intercept={true}>
            <ProjectList projects={projects} modal={true} />
        </Modal>
    );
}
