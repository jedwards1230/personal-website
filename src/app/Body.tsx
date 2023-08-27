'use client';

import clsx from 'clsx';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useInView } from 'react-intersection-observer';

import IconLinks from './IconLinks';
import About from './About';
import Contact from './Contact';
import Experience from './Experience';
import Projects from './Projects';

const sections = ['about', 'experience', 'projects', 'contact'];

export default function Body() {
    const pathname = usePathname();
    const [refProjects, inViewProjects] = useInView({ threshold: 0.25 });
    const [refExperience, inViewExperience] = useInView({ threshold: 0.25 });
    const [refAbout, inViewAbout] = useInView({ threshold: 0.25 });
    const [refContact, inViewContact] = useInView({ threshold: 0.25 });

    const [isFrozen, setIsFrozen] = useState(false);
    const [currentSection, setCurrentSection] = useState<Section>('about');

    useEffect(() => {
        console.log({ pathname });
        if (pathname === '/') {
            setIsFrozen(false);
        } else {
            setIsFrozen(true);
        }
    }, [pathname]);

    useEffect(() => {
        if (isFrozen) return;
        // start/end sections first
        if (inViewAbout) setCurrentSection('about');
        else if (inViewContact) setCurrentSection('contact');
        // then middle sections
        else if (inViewExperience) setCurrentSection('experience');
        else if (inViewProjects) setCurrentSection('projects');
    }, [
        currentSection,
        inViewAbout,
        inViewContact,
        inViewExperience,
        inViewProjects,
        isFrozen,
    ]);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <main className="max-w-screen flex w-full flex-col justify-end px-4 pt-8 sm:px-8 md:h-full md:flex-row md:px-16 md:pt-0 lg:px-32">
            <nav className="flex w-full flex-col justify-between gap-4 pb-12 md:fixed md:left-16 md:top-0 md:h-screen md:w-1/3 md:pb-12 md:pt-16 lg:left-32 lg:w-1/2">
                <div className="flex flex-col gap-12 transition-all lg:gap-36">
                    <div>
                        <div className="text-4xl">Justin Edwards</div>
                        <div className="text-2xl text-neutral-600 dark:text-neutral-500">
                            Full Stack Software Developer
                        </div>
                    </div>
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
                </div>
                <IconLinks />
            </nav>
            <main className="ml-auto flex w-full flex-col gap-12 md:z-10 md:w-1/2 md:gap-24">
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
        </main>
    );
}
