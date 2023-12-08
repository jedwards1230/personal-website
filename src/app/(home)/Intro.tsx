'use client';

import { ChevronDown } from 'lucide-react';

import IconLinks from '@/components/IconLinks';
import TagList from '@/components/TagList';

export default function Intro({ about }: { about: About }) {
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
                className="absolute inset-x-auto bottom-12"
            >
                <ChevronDown className="transition-all hover:scale-150" />
            </button>
        </section>
    );
}
