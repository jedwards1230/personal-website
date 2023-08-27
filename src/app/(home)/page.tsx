import type { Metadata } from 'next/types';

import About from '../About';
import Contact from '../Contact';
import Experience from '../Experience';
import Projects from '../Projects';

const APP_NAME = 'J. Edwards Personal Website';
const APP_DEFAULT_TITLE = 'J. Edwards';
const APP_TITLE_TEMPLATE = 'J. Edwards | %s';
const APP_DESCRIPTION = 'Personal website for Justin Edwards';

export const metadata: Metadata = {
    applicationName: APP_NAME,
    title: {
        default: APP_DEFAULT_TITLE,
        template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
};

export default function Page() {
    return (
        <>
            <About />
            <Experience />
            <Projects />
            <Contact />
        </>
    );
}
