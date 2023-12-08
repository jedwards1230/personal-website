'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

const NavigationContext = createContext({
    refProjects: null,
    refIntro: null,
    refContact: null,
    currentSection: 'intro' as Section,
    setCurrentSection: (section: Section) => {},
});

export const NavigationProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [currentSection, setCurrentSection] = useState<Section>('intro');

    // Intersection Observer
    const [refProjects, inViewProjects] = useInView({ threshold: 0.25 });
    const [refIntro, inViewIntro] = useInView({ threshold: 0.25 });
    const [refContact, inViewContact] = useInView({ threshold: 0.25 });

    useEffect(() => {
        if (inViewIntro) setCurrentSection('intro');
        else if (inViewContact) setCurrentSection('contact');
        else if (inViewProjects) setCurrentSection('projects');
    }, [inViewContact, inViewIntro, inViewProjects]);

    return (
        <NavigationContext.Provider
            value={{
                refProjects,
                refIntro,
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
