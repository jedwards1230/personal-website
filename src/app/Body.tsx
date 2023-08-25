'use client';

import clsx from 'clsx';
import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import IconLinks from './IconLinks';
import About from './About';
import Contact from './Contact';
import Experience from './Experience';
import Projects from './Projects';

const sections = ['about', 'experience', 'projects', 'contact'];

export default function Body() {
    const [refProjects, inViewProjects] = useInView({ threshold: 0.6 });
    const [refExperience, inViewExperience] = useInView({ threshold: 0.6 });
    const [refAbout, inViewAbout] = useInView({ threshold: 0.6 });
    const [refContact, inViewContact] = useInView({ threshold: 0.6 });

    const [currentSection, setCurrentSection] = useState<Section>('about');

    useEffect(() => {
        if (inViewAbout) setCurrentSection('about');
        if (inViewExperience) setCurrentSection('experience');
        if (inViewProjects) setCurrentSection('projects');
        if (inViewContact) setCurrentSection('contact');
    }, [
        currentSection,
        inViewAbout,
        inViewContact,
        inViewExperience,
        inViewProjects,
    ]);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="max-w-screen flex w-full flex-col justify-end px-4 pt-8 md:h-screen md:max-h-screen md:flex-row md:px-24 md:pt-0 lg:px-32">
            <nav className="flex w-full flex-col justify-between gap-4 pb-12 md:fixed md:left-24 md:top-0 md:h-screen  md:w-1/3 md:pb-12 md:pt-16 lg:left-32 lg:w-1/2">
                <div className="flex flex-col gap-12 transition-all lg:gap-36">
                    <div>
                        <div className="text-4xl">Justin Edwards</div>
                        <div className="text-2xl text-neutral-600 dark:text-neutral-500">
                            Full Stack Software Developer
                        </div>
                    </div>
                    <div className="hidden select-none flex-col pb-24 text-neutral-400 transition-all md:flex">
                        {sections.map((s, i) => {
                            return (
                                <div
                                    key={'section-' + i}
                                    className={clsx(
                                        'cursor-pointer transition-all hover:text-neutral-800 hover:dark:text-neutral-200',
                                        currentSection === s
                                            ? 'text-xl text-neutral-950 dark:text-neutral-50'
                                            : '',
                                    )}
                                    onClick={() => scrollToSection(s)}
                                >
                                    {s.charAt(0).toUpperCase() + s.slice(1)}
                                </div>
                            );
                        })}
                    </div>
                </div>
                <IconLinks />
            </nav>
            <main className="ml-auto flex w-full flex-col gap-12 md:z-10 md:w-1/2 md:gap-32">
                <div ref={refAbout}>
                    <About />
                </div>
                <div ref={refExperience}>
                    <Experience />
                </div>
                <div ref={refProjects}>
                    <Projects />
                </div>
                <div ref={refContact}>
                    <Contact />
                </div>
            </main>
        </div>
    );
}
