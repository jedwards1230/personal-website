import Link from 'next/link';

import { Button } from '../ui/button';
import { Profile } from '../Icons';
import { getSession } from '@/lib/auth';

export const ProfileButton = async () => {
    const session = await getSession();
    if (!session) return null;

    return (
        <Button variant="outline" asChild size="icon">
            <Link href="/admin">
                <Profile />
            </Link>
        </Button>
    );
};
