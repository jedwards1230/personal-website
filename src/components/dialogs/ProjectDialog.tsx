import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import ProjectCard from '@/components/cards/ProjectCard';

export default function ProjectDialog({
    project,
    children,
}: {
    project: Project;
    children: React.ReactNode;
}) {
    return (
        <Dialog>
            <DialogTrigger>{children}</DialogTrigger>
            <DialogContent size="lg">
                <ProjectCard project={project} modal={true} />
            </DialogContent>
        </Dialog>
    );
}
