'use client';

import { ChevronDown } from 'lucide-react';

import IconLinks from '@/components/IconLinks';
import TagList from '@/components/TagList';
import { useEffect } from 'react';

export default function Intro({ about }: { about: About }) {
    useEffect(() => {
        const handleScroll = () => {
            const chevron = document.querySelector('.chevron') as HTMLElement;
            if (chevron) {
                const windowHeight = window.innerHeight;
                const scrollY = window.scrollY;
                const offset = -150;
                const opacity = 1 - scrollY / (windowHeight + offset);
                chevron.style.opacity = Math.max(opacity, 0).toString();
            }
        };

        // Attach the event listener
        window.addEventListener('scroll', handleScroll);

        // Remove the event listener on cleanup
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section
            id="intro"
            className="relative flex h-screen flex-col items-center justify-center gap-4 overflow-hidden"
        >
            <div className="flex flex-col items-center gap-2 text-center transition-all">
                <div>
                    <div className="text-5xl font-medium" aria-label="Name">
                        {about.name}
                    </div>
                    <div
                        className="pb-1 text-2xl text-secondary-foreground"
                        aria-label="Title"
                    >
                        {about.title}
                    </div>
                </div>
                <TagList tags={about.tags} />
            </div>
            <div className="flex items-center justify-between">
                <IconLinks about={about} />
            </div>
            <button
                onClick={() =>
                    document
                        .getElementById('projects')
                        .scrollIntoView({ behavior: 'smooth' })
                }
                className="chevron absolute inset-x-auto bottom-12"
            >
                <ChevronDown className="transition-all hover:scale-150" />
            </button>
        </section>
    );
}
