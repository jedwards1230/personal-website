'use client';

import Link from 'next/link';

import { ArrowLeft } from '@/components/Icons';
import { useNavigation } from '@/app/NavigationProvider';
import { useRouter } from 'next/navigation';

export default function BackButton({
    modal = false,
    intercept = false,
}: {
    modal?: boolean;
    intercept?: boolean;
}) {
    const {
        currentProject,
        setCurrentProject,
        currentExperience,
        setCurrentExperience,
    } = useNavigation();
    const router = useRouter();
    return modal ? (
        <div
            onClick={() => {
                if (intercept) router.back();
                else if (currentProject) setCurrentProject(null);
                else if (currentExperience) setCurrentExperience(null);
            }}
            className="group col-span-4 flex cursor-pointer select-none items-center gap-2 pl-2 hover:underline"
        >
            <span className="transition-all duration-150 group-hover:-translate-x-1">
                <ArrowLeft />
            </span>
            Back
        </div>
    ) : (
        <Link
            href="/"
            scroll={false}
            className="col-span-4 flex items-center gap-2 pl-2 transition-all hover:gap-4 hover:underline"
        >
            <ArrowLeft />
            Home
        </Link>
    );
}
