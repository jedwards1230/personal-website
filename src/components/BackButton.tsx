'use client';

import Link from 'next/link';

import { ArrowLeft } from '@/app/Icons';
import { useNavigation } from '@/app/NavigationProvider';
import { useRouter } from 'next/navigation';

export default function BackButton({
    modal = false,
    intercept = false,
}: {
    modal?: boolean;
    intercept?: boolean;
}) {
    const { setCurrentProject } = useNavigation();
    const router = useRouter();
    return modal ? (
        <div
            onClick={() => {
                if (intercept) router.back();
                else setCurrentProject(null);
            }}
            className="col-span-4 flex cursor-pointer items-center gap-2 pl-2 transition-all hover:gap-4 hover:underline"
        >
            <ArrowLeft />
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
