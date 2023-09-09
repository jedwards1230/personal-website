import { Home } from '@/components/Icons';
import { LogoutButton } from '@/components/buttons/LogoutButton';
import { Button } from '@/components/ui/button';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { redirect, notFound } from 'next/navigation';
import Nav from './Nav';

export default async function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect('/api/auth/signin');
    }

    if (session.user.email !== process.env.ADMIN_EMAIL) {
        notFound();
    }

    return (
        <div className="mx-auto flex max-w-5xl flex-col gap-4 p-4">
            <div className="space-y-2">
                <div className="flex w-full justify-between">
                    <div className="text-xl font-medium">Admin Page</div>
                    <div className="flex gap-4 sm:gap-8">
                        <Nav />
                        <div className="flex items-center gap-2 sm:gap-4">
                            <Button variant="outline" size="icon">
                                <Link href="/">
                                    <Home />
                                </Link>
                            </Button>
                            <LogoutButton variant="outline">
                                Log Out
                            </LogoutButton>
                            L
                        </div>
                    </div>
                </div>
                <div>Hi, {session.user.name}</div>
            </div>
            {children}
        </div>
    );
}
