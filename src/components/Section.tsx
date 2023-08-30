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
    const { refProjects, refExperience, refAbout, refContact } =
        useNavigation();

    const ref = useMemo(() => {
        switch (id) {
            case 'about':
                return refAbout;
            case 'experience':
                return refExperience;
            case 'projects':
                return refProjects;
            case 'contact':
                return refContact;
        }
    }, [id, refAbout, refContact, refExperience, refProjects]);

    return (
        <section
            aria-label={id.charAt(0).toUpperCase() + id.slice(1) + ' section'}
            ref={ref}
            className="flex h-full flex-col sm:min-h-screen sm:pt-16"
            id={id}
        >
            <div className="text-xl font-medium md:hidden">
                {id.charAt(0).toUpperCase() + id.slice(1)}
            </div>
            {children}
        </section>
    );
}
