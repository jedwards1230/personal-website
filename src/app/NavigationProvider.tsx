'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import ProjectCard from '@/components/ProjectCard';
import Modal from '@/components/Modal';
import { projects } from '@/data';

const NavigationContext = createContext({
    refProjects: null,
    refExperience: null,
    refAbout: null,
    refContact: null,
    currentSection: 'about',
    setCurrentSection: (section: Section) => {},
    setCurrentProject: (project: string | null) => {},
});

export const NavigationProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [currentSection, setCurrentSection] = useState('about');
    const [currentProject, setCurrentProject] = useState<string | null>(null);
    const project = projects.find((project) => project.id === currentProject);

    // Intersection Observer
    const [refProjects, inViewProjects] = useInView({ threshold: 0.25 });
    const [refExperience, inViewExperience] = useInView({ threshold: 0.25 });
    const [refAbout, inViewAbout] = useInView({ threshold: 0.25 });
    const [refContact, inViewContact] = useInView({ threshold: 0.25 });

    useEffect(() => {
        if (inViewAbout) setCurrentSection('about');
        else if (inViewContact) setCurrentSection('contact');
        else if (inViewExperience) setCurrentSection('experience');
        else if (inViewProjects) setCurrentSection('projects');
    }, [inViewAbout, inViewContact, inViewExperience, inViewProjects]);

    return (
        <NavigationContext.Provider
            value={{
                refProjects,
                refExperience,
                refAbout,
                refContact,
                currentSection,
                setCurrentSection,
                setCurrentProject,
            }}
        >
            {children}
            {currentProject && (
                <Modal zIndex={20}>
                    <ProjectCard project={project} modal={true} />
                </Modal>
            )}
        </NavigationContext.Provider>
    );
};

export const useNavigation = () => useContext(NavigationContext);
