'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import ProjectCard from '@/components/cards/ProjectCard';
import Modal from '@/components/Modal';
import ExperienceCard from '@/components/cards/ExperienceCard';
import ImageCard from '@/components/cards/ImageCard';

const NavigationContext = createContext({
    refProjects: null,
    refExperience: null,
    refAbout: null,
    refContact: null,
    currentSection: 'about' as Section,
    setCurrentSection: (section: Section) => {},
    currentProject: null,
    setCurrentProject: (project: number | null) => {},
    setImageOpen: (open: boolean) => {},
    currentExperience: null,
    setCurrentExperience: (experience: number | null) => {},
});

export const NavigationProvider = ({
    children,
    experiences,
    projects,
}: {
    children: React.ReactNode;
    experiences: Experience[];
    projects: Project[];
}) => {
    const [currentSection, setCurrentSection] = useState<Section>('about');
    const [currentExperience, setCurrentExperience] = useState<number | null>(
        null,
    );
    const [currentProject, setCurrentProject] = useState<number | null>(null);
    const [imageOpen, setImageOpen] = useState(false);
    const experience = experiences.find(
        (experience) => experience.id === currentExperience,
    );
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
                currentProject,
                setCurrentProject,
                setImageOpen,
                currentExperience,
                setCurrentExperience,
            }}
        >
            {children}
            {currentExperience && (
                <Modal>
                    <ExperienceCard
                        modal={true}
                        experience={experience}
                        relevantProjects={projects.filter(
                            (p) => p.company === experience.company,
                        )}
                    />
                </Modal>
            )}
            {currentProject && (
                <Modal zIndex={20}>
                    <ProjectCard project={project} modal={true} />
                </Modal>
            )}
            {imageOpen && (
                <Modal zIndex={30} img={true} size="xl">
                    <ImageCard project={project} />
                </Modal>
            )}
        </NavigationContext.Provider>
    );
};

export const useNavigation = () => useContext(NavigationContext);
