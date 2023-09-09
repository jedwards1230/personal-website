'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';

import { Button } from '../ui/button';
import { Profile } from '../Icons';

export const ProfileButton = () => {
    const { data } = useSession();
    if (!data) return null;
    return (
        <Button variant="outline" asChild size="icon">
            <Link href="/admin">
                <Profile />
            </Link>
        </Button>
    );
};
