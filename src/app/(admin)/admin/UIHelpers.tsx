'use client';

import { Edit } from '@/components/Icons';
import { Button } from '@/components/ui/button';
import { forwardRef } from 'react';

export const Section = forwardRef<
    HTMLDivElement,
    {
        children: React.ReactNode;
        title: string;
        addButtonDialog?: React.ReactNode;
    }
>(({ children, title, addButtonDialog, ...props }, forwardedRef) => (
    <div
        className="w-full rounded border border-border p-2 transition-all"
        {...props}
        ref={forwardedRef}
    >
        <div className="flex w-full justify-between">
            <Title>{title}</Title>
            {addButtonDialog && (
                <div className="flex justify-end">{addButtonDialog}</div>
            )}
        </div>
        <List>{children}</List>
    </div>
));

Section.displayName = 'Section';

export const Title = forwardRef<HTMLDivElement, { children: React.ReactNode }>(
    ({ children, ...props }, forwardedRef) => (
        <div className="py-2 text-lg font-bold" {...props} ref={forwardedRef}>
            {children}
        </div>
    ),
);

Title.displayName = 'Title';

export const List = forwardRef<HTMLDivElement, { children: React.ReactNode }>(
    ({ children, ...props }, forwardedRef) => (
        <div className="w-full py-1" {...props} ref={forwardedRef}>
            {children}
        </div>
    ),
);

List.displayName = 'List';

export const ListItem = forwardRef<
    HTMLDivElement,
    { children: React.ReactNode }
>(({ children, ...props }, forwardedRef) => (
    <div
        className="w-full cursor-pointer rounded-lg p-1 underline-offset-4 hover:bg-secondary/60 hover:underline"
        {...props}
        ref={forwardedRef}
    >
        {children}
    </div>
));

ListItem.displayName = 'ListItem';

export const AddButton = forwardRef<HTMLButtonElement>(
    (props, forwardedRef) => (
        <Button
            type="button"
            className="text-xl font-medium"
            variant="outline"
            size="icon"
            {...props}
            ref={forwardedRef}
        >
            +
        </Button>
    ),
);

AddButton.displayName = 'AddButton';

export const EditButton = forwardRef<HTMLButtonElement>(
    (props, forwardedRef) => (
        <Button
            type="button"
            className="text-xl font-medium"
            variant="outline"
            size="icon"
            {...props}
            ref={forwardedRef}
        >
            <Edit />
        </Button>
    ),
);

EditButton.displayName = 'EditButton';
