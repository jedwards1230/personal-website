'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

const NavigationContext = createContext({
    refProjects: null,
    refExperience: null,
    refAbout: null,
    refContact: null,
    currentSection: 'about' as Section,
    setCurrentSection: (section: Section) => {},
});

export const NavigationProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [currentSection, setCurrentSection] = useState<Section>('about');

    // Intersection Observer
    const [refProjects, inViewProjects] = useInView({ threshold: 0.25 });
    const [refExperience, inViewExperience] = useInView({ threshold: 0.25 });
    const [refAbout, inViewAbout] = useInView({ threshold: 0.25 });
    const [refContact, inViewContact] = useInView({ threshold: 0.25 });

    useEffect(() => {
        if (inViewAbout) setCurrentSection('about');
        else if (inViewContact) setCurrentSection('contact');
        else if (inViewExperience) setCurrentSection('history');
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
            }}
        >
            {children}
        </NavigationContext.Provider>
    );
};

export const useNavigation = () => useContext(NavigationContext);
