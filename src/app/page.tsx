import Home from '@/components/Home';

export const metadata = {
    title: 'J. Edwards',
    description: 'Personal website for Justin Edwards',
};

export const runtime = 'edge';

export default async function Page() {
    return <Home />;
}
