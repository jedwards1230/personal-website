'use client';

import { useState } from 'react';

import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export function GenericDialog({
    children,
    data,
    FormComponent,
    ViewComponent,
    dataType,
}: {
    children: React.ReactNode;
    data?: Experience | Project | Job;
    FormComponent: any;
    ViewComponent: any;
    dataType: 'experience' | 'project' | 'job';
}) {
    const [edit, setEdit] = useState(!data);

    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="max-h-screen overflow-y-scroll sm:max-h-[95%] sm:max-w-xl md:max-w-2xl lg:max-w-3xl">
                <DialogHeader>
                    <DialogTitle className="flex gap-6">
                        {edit ? (
                            <>{data ? `Edit ${dataType}` : `Add ${dataType}`}</>
                        ) : data ? (
                            <p>
                                {dataType === 'job' && data?.company}
                                {dataType === 'experience' && data?.title}
                                {dataType === 'project' && data?.company}
                            </p>
                        ) : null}
                        {data && (
                            <div className="flex items-center gap-3 transition-all">
                                <Switch
                                    checked={edit}
                                    onCheckedChange={() =>
                                        setEdit((prev) => !prev)
                                    }
                                    id="edit-mode"
                                />
                                <Label htmlFor="edit-mode">Edit</Label>
                            </div>
                        )}
                    </DialogTitle>
                    {edit && (
                        <DialogDescription>
                            {data
                                ? `Make changes to your ${dataType} here.`
                                : `Add a ${dataType} here.`}{' '}
                            Click save when you're done.
                        </DialogDescription>
                    )}
                </DialogHeader>
                {edit ? (
                    <FormComponent data={data} setEdit={setEdit} />
                ) : (
                    <ViewComponent data={data} />
                )}
            </DialogContent>
        </Dialog>
    );
}
