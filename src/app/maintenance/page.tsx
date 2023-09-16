'use client';

import { usePlausible } from 'next-plausible';
import { useEffect } from 'react';

export default function Page() {
    const plausible = usePlausible();

    useEffect(() => {
        plausible('Maintenance');
    }, [plausible]);

    return (
        <div className="flex h-screen w-screen flex-col items-center justify-center gap-2">
            <p className="text-xl">Website is currently in maintenance mode.</p>
            <p>Please visit again in about 5 minutes.</p>
        </div>
    );
}
