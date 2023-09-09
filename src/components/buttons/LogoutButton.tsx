'use client';

import { signOut } from 'next-auth/react';
import { Button } from '../ui/button';
import Link from 'next/link';

export const LogoutButton = ({
    children,
    variant = 'link',
}: {
    children: React.ReactNode;
    variant?: 'link' | 'outline';
}) => {
    return (
        <Button asChild variant={variant}>
            <Link onClick={() => signOut({ redirect: false })} href="/">
                {children}
            </Link>
        </Button>
    );
};
