'use client';

import { NewTab } from '@/app/Icons';
import { usePlausible } from 'next-plausible';
import Link from 'next/link';

export default function DownloadResume() {
    const plausible = usePlausible();
    return (
        <Link
            href="/resume"
            onClick={() => plausible('Resume Download')}
            target="_blank"
            className="inline-flex select-none justify-center gap-2 pt-8 text-lg hover:underline"
        >
            View Full Resume <NewTab />
        </Link>
    );
}
