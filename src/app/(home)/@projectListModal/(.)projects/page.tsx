import Modal from '@/components/Modal';
import ProjectList from '@/components/ProjectList';

export default function Page() {
    return (
        <Modal intercept={true}>
            <ProjectList modal={true} />
        </Modal>
    );
}
