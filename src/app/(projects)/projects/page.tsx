import ProjectList from '@/components/ProjectList';

export default function Page() {
    return (
        <div className="flex h-full min-h-screen w-full flex-col gap-2 px-4 pt-8 sm:px-8 md:gap-8 md:px-16 md:pt-16 lg:px-32">
            <ProjectList />
        </div>
    );
}
