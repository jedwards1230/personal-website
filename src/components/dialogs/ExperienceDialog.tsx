import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import ExperienceCard from '../cards/ExperienceCard';

export default function ExperienceDialog({
    experience,
    projects,
    children,
}: {
    experience: Experience;
    projects: Project[];
    children: React.ReactNode;
}) {
    return (
        <Dialog>
            <DialogTrigger>{children}</DialogTrigger>
            <DialogContent size="xl">
                <ExperienceCard
                    experience={experience}
                    relevantProjects={projects}
                    modal={true}
                />
            </DialogContent>
        </Dialog>
    );
}
