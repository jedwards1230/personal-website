'use client';

import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import IconLinks from './IconLinks';
import About from './About';
import Experience from './Experience';
import Projects from './Projects';

export default function Body() {
    const [refProjects, inViewProjects] = useInView({ threshold: 0.6 });
    const [refExperience, inViewExperience] = useInView({ threshold: 0.6 });
    const [refAbout, inViewAbout] = useInView({ threshold: 0.6 });

    const [currentSection, setCurrentSection] = useState('');

    useEffect(() => {
        if (inViewAbout) setCurrentSection('about');
        if (inViewExperience) setCurrentSection('experience');
        if (inViewProjects) setCurrentSection('projects');
    }, [inViewAbout, inViewExperience, inViewProjects]);

    const sections = ['about', 'experience', 'projects'];

    return (
        <div className="max-w-screen flex w-full flex-col justify-end px-4 pt-8 md:h-screen md:max-h-screen md:flex-row md:px-24 md:pt-0 lg:px-32">
            <nav className="flex w-full flex-col justify-between gap-4 pb-12 md:fixed md:left-24 md:top-0 md:h-screen  md:w-1/3 md:pb-12 md:pt-16 lg:left-32 lg:w-1/2">
                <div className="flex flex-col gap-36">
                    <div>
                        <div className="text-4xl">Justin Edwards</div>
                        <div className="text-2xl text-neutral-600">
                            Full Stack Software Developer
                        </div>
                    </div>
                    <div className="hidden flex-col pb-24 text-neutral-400 md:flex">
                        {sections.map((s, i) => {
                            return (
                                <a
                                    key={'section-' + i}
                                    className={
                                        currentSection === s
                                            ? 'text-neutral-950 dark:text-neutral-50'
                                            : ''
                                    }
                                    href={'#' + s}
                                >
                                    {s.charAt(0).toUpperCase() + s.slice(1)}
                                </a>
                            );
                        })}
                    </div>
                </div>
                <IconLinks />
            </nav>
            <main className="ml-auto flex w-full flex-col gap-16 md:z-10 md:w-1/2">
                <div ref={refAbout}>
                    <About />
                </div>
                <div ref={refExperience}>
                    <Experience />
                </div>
                <div ref={refProjects}>
                    <Projects />
                </div>
            </main>
        </div>
    );
}
