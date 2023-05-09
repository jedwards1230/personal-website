import Chat from '@/components/chat';
import IconLinks from '@/components/iconLinks';
import Header from './header';

export const metadata = {
    title: 'J. Edwards',
    description: 'Personal website for Justin Edwards',
};

export const runtime = 'edge';

export default async function Page() {
    return (
        <>
            <Header />
            {/* @ts-expect-error Async Server Component */}
            <Chat />
            <IconLinks />
        </>
    );
}
