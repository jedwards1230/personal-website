'use client';

import { useNavigation } from '@/app/NavigationProvider';
import { Button } from './ui/button';

const sections: Section[] = ['about', 'projects', 'history', 'contact'];

export default function SectionNav() {
    const { currentSection } = useNavigation();

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="hidden select-none flex-col gap-1.5 pb-24 text-secondary-foreground transition-all md:flex md:items-start md:justify-start">
            {sections.map((s, i) => {
                const size =
                    currentSection === s ? 'navLinkActive' : 'navLinkInactive';
                const variant =
                    currentSection === s ? 'navActive' : 'navInactive';
                return (
                    <Button
                        size={size}
                        key={'section-' + i}
                        variant={variant}
                        onClick={() => scrollToSection(s)}
                    >
                        {s.charAt(0).toUpperCase() + s.slice(1)}
                    </Button>
                );
            })}
        </div>
    );
}
