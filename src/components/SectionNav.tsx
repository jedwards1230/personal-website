'use client';

import { useNavigation } from '@/app/NavigationProvider';
import clsx from 'clsx';

const sections = ['about', 'experience', 'projects', 'contact'];

export default function SectionNav() {
    const { currentSection } = useNavigation();
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="hidden select-none flex-col gap-1 pb-24 text-neutral-400 transition-all md:flex">
            {sections.map((s, i) => {
                return (
                    <div
                        key={'section-' + i}
                        className={clsx(
                            'cursor-pointer transition-all hover:text-neutral-800 hover:dark:text-neutral-200',
                            currentSection === s
                                ? 'pl-2 text-xl text-neutral-950 dark:text-neutral-50'
                                : '',
                        )}
                        onClick={() => scrollToSection(s)}
                    >
                        {s.charAt(0).toUpperCase() + s.slice(1)}
                    </div>
                );
            })}
        </div>
    );
}
