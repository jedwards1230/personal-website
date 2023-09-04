'use client';

import { useState } from 'react';

import ExperienceForm from '@/components/forms/admin/ExperienceForm';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';

export function ExperienceDialog({
    children,
    experience,
}: {
    children: React.ReactNode;
    experience?: Experience;
}) {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <ExperienceForm experience={experience} setOpen={setOpen} />
        </Dialog>
    );
}
