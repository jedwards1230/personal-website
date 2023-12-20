'use client';

import ExperienceForm from '../forms/ExperienceForm';
import ExperienceView from './ExperienceView';
import { GenericDialog } from './GenericDialog';

export function ExperienceDialog({
    children,
    experience,
}: {
    children: React.ReactNode;
    experience?: Experience;
}) {
    return (
        <GenericDialog
            dataType="experience"
            FormComponent={ExperienceForm}
            ViewComponent={ExperienceView}
            data={experience}
        >
            {children}
        </GenericDialog>
    );
}
