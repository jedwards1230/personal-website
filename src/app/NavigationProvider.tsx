import React, { createContext, useContext, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { usePathname } from 'next/navigation';

const NavigationContext = createContext({
    refProjects: null,
    refExperience: null,
    refAbout: null,
    refContact: null,
    currentSection: 'about',
    setCurrentSection: (section: string) => {},
    isFrozen: false,
    setIsFrozen: (isFrozen: boolean) => {},
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

    useEffect(() => {
        if (pathname === '/') {
            setIsFrozen(false);
        } else {
            setIsFrozen(true);
        }
    }, [pathname]);

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
            }}
        >
            {children}
        </NavigationContext.Provider>
    );
};

export const useNavigation = () => useContext(NavigationContext);
