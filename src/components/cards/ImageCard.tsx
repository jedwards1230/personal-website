'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { usePlausible } from 'next-plausible';

import { ChevronLeft, ChevronRight } from '../Icons';

export default function ImageCard({ project }: { project: Project }) {
    const plausible = usePlausible();
    const [idx, setIdx] = useState(0);

    const next = () => setIdx(idx < project.images.length - 1 ? idx + 1 : 0);
    const prev = () => setIdx(idx > 0 ? idx - 1 : project.images.length - 1);

    useEffect(() => {
        plausible('Image', {
            props: {
                project: project.title,
                image: project.images[idx],
            },
        });
    }, [idx, plausible, project.images, project.title]);

    return (
        <div className="relative h-full min-h-[700px] w-full select-none overflow-hidden">
            <div className="absolute flex h-full w-full">
                {project.images.map((image, i) => (
                    <Image
                        style={{
                            transform: `translateX(-${idx * 100}%)`,
                            left: `${i * 100}%`,
                        }}
                        key={i}
                        src={image}
                        alt={project.title}
                        width={1920}
                        height={1080}
                        className="absolute h-full w-full transition-transform duration-500 ease-in-out"
                    />
                ))}
            </div>
            <div className="absolute inset-y-0 left-0 flex items-center">
                <button
                    onClick={prev}
                    className="flex h-12 w-12 items-center justify-center rounded-r border border-border bg-background/20 transition-all hover:bg-background/80"
                >
                    <ChevronLeft />
                </button>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center">
                <button
                    onClick={next}
                    className="flex h-12 w-12 items-center justify-center rounded-l border border-border transition-all hover:bg-background/80 dark:bg-background/20"
                >
                    <ChevronRight />
                </button>
            </div>
        </div>
    );
}
