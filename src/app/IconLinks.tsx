import { GithubIcon, LinkedInIcon, EmailIcon } from './Icons';

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
        href: 'mailto:justin@jedwards.cc',
        icon: <EmailIcon width={30} height={30} />,
    },
];

export default function IconLinks() {
    return (
        <div className="flex w-48 justify-between ">
            {links.map((link, i) => (
                <a
                    key={i}
                    title={link.title}
                    className="fill-neutral-600 transition-colors hover:fill-neutral-950 dark:fill-neutral-400 dark:hover:fill-neutral-50"
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
