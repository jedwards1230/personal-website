import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import ImageCard from '@/components/cards/ImageCard';

export default function ImagesDialog({
    project,
    children,
}: {
    project: Project;
    children: React.ReactNode;
}) {
    return (
        <Dialog>
            <DialogTrigger className="object-cover">{children}</DialogTrigger>
            <DialogContent size="full">
                <ImageCard project={project} />
            </DialogContent>
        </Dialog>
    );
}
