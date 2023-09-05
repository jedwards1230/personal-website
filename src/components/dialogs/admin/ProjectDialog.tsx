'use client';

import { GenericDialog } from './GenericDialog';
import ProjectForm from '@/components/forms/admin/ProjectForm';
import ProjectView from './ProjectView';

export function ProjectDialog({
    children,
    project,
}: {
    children: React.ReactNode;
    project?: Project;
}) {
    return (
        <GenericDialog
            dataType="project"
            FormComponent={ProjectForm}
            ViewComponent={ProjectView}
            data={project}
        >
            {children}
        </GenericDialog>
    );
}
