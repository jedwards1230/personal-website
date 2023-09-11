'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Button } from '@/components/ui/button';

export default function Nav() {
    const pathname = usePathname();

    return (
        <div className="flex items-center gap-2">
            <Button
                asChild
                className={pathname === '/admin' ? 'underline' : ''}
                variant="link"
                size="sm"
            >
                <Link href="/admin">Data</Link>
            </Button>
            <Button
                asChild
                className={pathname === '/admin/ai' ? 'underline' : ''}
                variant="link"
                size="sm"
            >
                <Link href="/admin/ai">AI</Link>
            </Button>
        </div>
    );
}
