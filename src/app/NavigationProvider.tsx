import React, { createContext, useContext, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { usePathname } from 'next/navigation';
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
    isFrozen: false,
    setIsFrozen: (isFrozen: boolean) => {},
    setCurrentProject: (project: string | null) => {},
});

export const NavigationProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const pathname = usePathname();
    const [refProjects, inViewProjects] = useInView({ threshold: 0.25 });
    const [refExperience, inViewExperience] = useInView({ threshold: 0.25 });
    const [refAbout, inViewAbout] = useInView({ threshold: 0.25 });
    const [refContact, inViewContact] = useInView({ threshold: 0.25 });

    const [isFrozen, setIsFrozen] = useState(false);
    const [currentSection, setCurrentSection] = useState('about');
    const [currentProject, setCurrentProject] = useState<string | null>(null);
    const project = projects.find((project) => project.id === currentProject);

    /* useEffect(() => {
        if (pathname === '/') {
            setIsFrozen(false);
        } else {
            setIsFrozen(true);
        }
    }, [pathname]); */

    useEffect(() => {
        if (isFrozen) return;
        if (inViewAbout) setCurrentSection('about');
        else if (inViewContact) setCurrentSection('contact');
        else if (inViewExperience) setCurrentSection('experience');
        else if (inViewProjects) setCurrentSection('projects');
    }, [
        inViewAbout,
        inViewContact,
        inViewExperience,
        inViewProjects,
        isFrozen,
    ]);

    return (
        <NavigationContext.Provider
            value={{
                refProjects,
                refExperience,
                refAbout,
                refContact,
                currentSection,
                setCurrentSection,
                isFrozen,
                setIsFrozen,
                setCurrentProject,
            }}
        >
            {children}
            {currentProject && (
                <Modal zIndex={20} size="sm">
                    <ProjectCard project={project} modal={true} />
                </Modal>
            )}
        </NavigationContext.Provider>
    );
};

export const useNavigation = () => useContext(NavigationContext);
