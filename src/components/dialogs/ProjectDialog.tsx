import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import ProjectCard from '@/components/cards/ProjectCard';

export default function ProjectDialog({
    project,
    className,
    children,
}: {
    project: Project;
    className?: string;
    children: React.ReactNode;
}) {
    return (
        <Dialog>
            <DialogTrigger className={className}>{children}</DialogTrigger>
            <DialogContent size="lg">
                <ProjectCard project={project} modal={true} />
            </DialogContent>
        </Dialog>
    );
}
