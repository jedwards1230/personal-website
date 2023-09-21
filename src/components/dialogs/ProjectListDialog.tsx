'use client';

import ProjectList from '@/components/ProjectList';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';

export default function ProjectListDialog({
    projects,
}: {
    projects: Project[];
}) {
    const router = useRouter();
    return (
        <Dialog onOpenChange={router.back} defaultOpen={true}>
            <DialogContent forceMount={true} size="xl">
                <ProjectList projects={projects} modal={true} />
            </DialogContent>
        </Dialog>
    );
}
