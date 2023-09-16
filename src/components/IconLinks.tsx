'use client';

import { HoverCardContent } from '@radix-ui/react-hover-card';
import Link from 'next/link';

import { HoverCard, HoverCardTrigger } from '@/components/ui/hover-card';
import { GithubIcon, LinkedInIcon, EmailIcon } from './Icons';

export default function IconLinks({ about }: { about: About }) {
    const linkedInUsername = about.linkedin.replace(/\/$/, '').split('/').pop();
    const githubUsername = about.github.replace(/\/$/, '').split('/').pop();

    const links = [
        {
            title: 'Github',
            copy: '@' + githubUsername,
            href: about.github,
            icon: <GithubIcon width={30} height={30} />,
        },
        {
            title: 'LinkedIn',
            copy: '@' + linkedInUsername,
            href: about.linkedin,
            icon: <LinkedInIcon width={30} height={30} />,
        },
        {
            title: 'Email',
            copy: about.email,
            href: 'mailto:' + about.email + '?subject=Hello!',
            icon: <EmailIcon width={30} height={30} />,
        },
    ];

    return (
        <div className="flex w-48 justify-between ">
            {links.map((link, i) => (
                <HoverCard key={'icon-link-' + i} openDelay={0} closeDelay={0}>
                    <HoverCardTrigger asChild>
                        <Link
                            title={link.title}
                            className="fill-neutral-600 transition-colors hover:fill-neutral-950 dark:fill-neutral-400 dark:hover:fill-neutral-50"
                            href={link.href}
                            target="_blank"
                            rel="noreferrer"
                        >
                            {link.icon}
                        </Link>
                    </HoverCardTrigger>
                    <HoverCardContent side="top" className="pb-4">
                        <div className="rounded border border-border p-2 text-sm">
                            {link.copy}
                        </div>
                    </HoverCardContent>
                </HoverCard>
            ))}
        </div>
    );
}
