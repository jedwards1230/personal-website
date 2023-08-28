import Modal from '@/components/Modal';
import ProjectList from '@/components/ProjectList';

export default function Page() {
    return (
        <Modal>
            <ProjectList modal={true} />
        </Modal>
    );
}
