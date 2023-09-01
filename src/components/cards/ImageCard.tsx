'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from '../Icons';
import { usePlausible } from 'next-plausible';

export default function ImageCard({ project }: { project: Project }) {
    const plausible = usePlausible();
    const [idx, setIdx] = useState(0);

    // go to next image
    const next = () => {
        if (idx < project.images.length - 1) {
            setIdx(idx + 1);
        } else {
            setIdx(0);
        }
    };

    // go to previous image
    const prev = () => {
        if (idx > 0) {
            setIdx(idx - 1);
        } else {
            setIdx(project.images.length - 1);
        }
    };

    // track image per project
    useEffect(() => {
        plausible('Image', {
            props: {
                project: project.title,
                image: project.images[idx],
            },
        });
    }, [idx, plausible, project.images, project.title]);

    return (
        <div className="relative h-full w-full">
            {project.images[idx - 1] && (
                <div className="absolute inset-y-0 left-0 flex items-center">
                    <button
                        onClick={prev}
                        className="flex h-12 w-12 items-center justify-center rounded-r border border-border bg-background/20 transition-all hover:bg-background/80"
                    >
                        <ChevronLeft />
                    </button>
                </div>
            )}
            {project.images[idx + 1] && (
                <div className="absolute inset-y-0 right-0 flex items-center">
                    <button
                        onClick={next}
                        className="flex h-12 w-12 items-center justify-center rounded-l border border-border transition-all hover:bg-background/80 dark:bg-background/20"
                    >
                        <ChevronRight />
                    </button>
                </div>
            )}
            <Image
                width={1920}
                height={1080}
                key={project.images[idx]}
                src={project.images[idx]}
                alt={project.title}
                className="aspect-video select-none"
            />
        </div>
    );
}
