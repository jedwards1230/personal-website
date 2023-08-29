'use client';

import { HoverCard, HoverCardTrigger } from '@/components/ui/hover-card';
import { GithubIcon, LinkedInIcon, EmailIcon } from './Icons';
import { HoverCardContent } from '@radix-ui/react-hover-card';

const links = [
    {
        title: 'Github',
        copy: '@jedwards1230',
        href: '//www.github.com/jedwards1230',
        icon: <GithubIcon width={30} height={30} />,
    },
    {
        title: 'LinkedIn',
        copy: '@justinedwards1230',
        href: '//www.linkedin.com/in/justinedwards1230',
        icon: <LinkedInIcon width={30} height={30} />,
    },
    {
        title: 'Email',
        copy: 'justin@jedwards.cc',
        href: 'mailto:justin@jedwards.cc',
        icon: <EmailIcon width={30} height={30} />,
    },
];

export default function IconLinks() {
    return (
        <div className="flex w-48 justify-between ">
            {links.map((link, i) => (
                <HoverCard key={'icon-link-' + i} openDelay={0} closeDelay={0}>
                    <HoverCardTrigger asChild>
                        <a
                            title={link.title}
                            className="fill-neutral-600 transition-colors hover:fill-neutral-950 dark:fill-neutral-400 dark:hover:fill-neutral-50"
                            href={link.href}
                            target="_blank"
                            rel="noreferrer"
                        >
                            {link.icon}
                        </a>
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
