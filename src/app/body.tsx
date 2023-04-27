'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

import useWindowSize from '@/lib/windowSize';
import { EmailIcon, GithubIcon, LinkedInIcon } from '@/components/icons';
import Game from '@/components/gameComponent';
import Chat from '@/components/chat';

const links = [
    {
        title: 'Github',
        href: '//www.github.com/jedwards1230',
        icon: <GithubIcon width={30} height={30} />,
    },
    {
        title: 'LinkedIn',
        href: '//www.linkedin.com/in/justinedwards1230',
        icon: <LinkedInIcon width={30} height={30} />,
    },
    {
        title: 'Email',
        href: 'mailto:justinedwards1230@gmail.com',
        icon: <EmailIcon width={30} height={30} />,
    },
];

export default function Body() {
    const [idx, setIdx] = useState(0);
    const size = useWindowSize();

    // reset the game when the window size changes
    const reset = () => setIdx(idx + 1);

    useEffect(() => {
        reset();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [size]);

    return (
        <>
            <Game key={idx} />
            <div className="flex h-full w-full flex-col items-center justify-center overflow-y-scroll py-4 text-center sm:py-8 md:py-16">
                <Link
                    href="/"
                    title="Click to reset Game of Life"
                    passHref
                    className="mx-4 my-0 text-center text-5xl font-medium text-black underline decoration-black/50 hover:decoration-black/100 dark:text-white dark:decoration-white/50 dark:hover:decoration-white/100 md:pb-4 md:text-7xl"
                    onClick={reset}
                >
                    Justin Edwards
                </Link>
                <Chat />
                <IconLinks />
            </div>
        </>
    );
}

function IconLinks() {
    return (
        <div className="mt-2 flex w-48 justify-between fill-black dark:fill-white">
            {links.map((link, i) => (
                <a
                    key={i}
                    title={link.title}
                    className="transform transition duration-200 ease-in-out hover:scale-125"
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                >
                    {link.icon}
                </a>
            ))}
        </div>
    );
}
