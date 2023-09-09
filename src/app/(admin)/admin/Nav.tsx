'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Button } from '@/components/ui/button';

export default function Nav() {
    const pathname = usePathname();

    return (
        <div className="flex items-center gap-2">
            <Button
                className={pathname === '/admin' ? 'underline' : ''}
                variant="link"
                size="sm"
            >
                <Link href="/admin">Data</Link>
            </Button>
            <Button
                className={pathname === '/admin/cover' ? 'underline' : ''}
                variant="link"
                size="sm"
            >
                <Link href="/admin/cover">Cover</Link>
            </Button>
        </div>
    );
}
