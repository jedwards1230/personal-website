'use client';

import { Button } from '@/components/ui/button';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="flex h-screen w-screen flex-col items-center justify-center gap-4">
            <div className="text-xl font-medium">User not authorized</div>
            <div className="flex flex-col">
                <Button variant="link">
                    <Link onClick={() => signOut({ redirect: false })} href="/">
                        Return Home{' '}
                    </Link>
                </Button>
                <p className="text-sm">(Will revoke auth session)</p>
            </div>
        </div>
    );
}
