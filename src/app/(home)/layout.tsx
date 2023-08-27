import '@/globals.css';
import SectionNav from '@/components/SectionNav';
import IconLinks from '../IconLinks';

export default function RootLayout({
    children,
    modal,
}: {
    children: React.ReactNode;
    modal: React.ReactNode;
}) {
    return (
        <>
            <div className="h-full w-full overflow-y-scroll">
                <main className="max-w-screen flex w-full flex-col justify-end px-4 pt-8 sm:px-8 md:h-full md:flex-row md:px-16 md:pt-0 lg:px-32">
                    <nav className="flex w-full flex-col justify-between gap-4 pb-12 md:fixed md:left-16 md:top-0 md:h-screen md:w-1/3 md:pb-12 md:pt-16 lg:left-32 lg:w-1/2">
                        <div className="flex flex-col gap-12 transition-all lg:gap-36">
                            <Header />
                            <SectionNav />
                        </div>
                        <IconLinks />
                    </nav>
                    <div className="ml-auto flex w-full flex-col gap-12 md:z-10 md:w-1/2 md:gap-24">
                        {children}
                    </div>
                </main>
            </div>
            <div className="h-full w-full overflow-y-scroll">{modal}</div>
        </>
    );
}

function Header() {
    return (
        <div>
            <div className="text-4xl">Justin Edwards</div>
            <div className="text-2xl text-neutral-600 dark:text-neutral-500">
                Full Stack Software Developer
            </div>
        </div>
    );
}
