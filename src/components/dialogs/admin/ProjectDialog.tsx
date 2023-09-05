'use client';

import { useState } from 'react';

import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import ProjectForm from '@/components/forms/admin/ProjectForm';

export function ProjectDialog({
    children,
    project,
}: {
    children: React.ReactNode;
    project?: Project;
}) {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <ProjectForm project={project} setOpen={setOpen} />
        </Dialog>
    );
}
