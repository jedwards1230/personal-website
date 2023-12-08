'use client';

import { useNavigation } from '@/app/NavigationProvider';
import { useMemo } from 'react';

export default function Section({
    children,
    id,
}: {
    children: React.ReactNode;
    id: Section;
}) {
    const { refProjects, refIntro, refContact } = useNavigation();

    const ref = useMemo(() => {
        switch (id) {
            case 'intro':
                return refIntro;
            case 'projects':
                return refProjects;
            case 'contact':
                return refContact;
        }
    }, [id, refIntro, refContact, refProjects]);

    return (
        <section
            aria-label={id.charAt(0).toUpperCase() + id.slice(1) + ' section'}
            ref={ref}
            className="flex h-full min-h-screen flex-col gap-4 sm:py-16 md:justify-between"
            id={id}
        >
            <div className="text-xl font-medium md:text-center md:text-2xl">
                {id.charAt(0).toUpperCase() + id.slice(1)}
            </div>
            {children}
        </section>
    );
}
