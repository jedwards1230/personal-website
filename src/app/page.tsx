import type { Metadata } from 'next/types';

import Home from '@/components/Home';

export const runtime = 'edge';

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

export default async function Page() {
    return <Home />;
}
