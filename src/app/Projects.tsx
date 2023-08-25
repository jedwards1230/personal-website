import Link from 'next/link';
import Image from 'next/image';

export default function Projects() {
    const projects = [
        {
            title: 'ChatUI',
            description: 'UI for managing chats with LLMs',
            href: 'https://github.com/jedwards1230/chat',
            preview:
                'https://raw.githubusercontent.com/jedwards1230/chat/main/screenshots/screenshot-0.png',
        },
        {
            title: 'SearchAI',
            description: 'AI assisted search engine',
            href: 'https://github.com/jedwards1230/search',
            preview:
                'https://raw.githubusercontent.com/jedwards1230/search/main/home.png',
        },
        {
            title: 'go-kerbal',
            description: 'CLI for managing Kerbal Space Program mods',
            href: 'https://github.com/jedwards1230/go-kerbal',
            preview:
                'https://raw.githubusercontent.com/jedwards1230/go-kerbal/main/extras/screenshots/main.png',
        },
        {
            title: 'Personal Website',
            description: 'My corner of the internet',
            href: 'https://github.com/jedwards1230/personal-website',
            preview:
                'https://raw.githubusercontent.com/jedwards1230/personal-website/main/screenshot.png',
        },
    ];
    return (
        <div id="projects">
            <div className="text-xl font-medium md:hidden">Projects</div>
            <div className="group/list flex flex-col gap-2 pb-16">
                {projects.map((p, i) => {
                    return (
                        <div
                            className="group grid w-full grid-cols-12 gap-1 rounded p-2 text-neutral-500 transition-all dark:text-neutral-400 lg:gap-4 hover:lg:bg-neutral-100 hover:lg:!opacity-100 group-hover/list:lg:opacity-50 hover:lg:dark:bg-neutral-800"
                            key={'projects-' + i}
                        >
                            {/* Preview */}
                            <Image
                                width={800}
                                height={400}
                                src={p.preview}
                                alt={'Preview ' + p.title}
                                className="col-span-12 aspect-video w-full bg-neutral-100 lg:col-span-4"
                            />
                            {/* Title */}
                            <Link
                                href={p.href}
                                target="_blank"
                                className="col-span-12 flex flex-col gap-1 lg:col-span-8"
                            >
                                <div className="font-medium text-neutral-950 dark:text-neutral-50">
                                    {p.title}
                                </div>
                                {/* Description */}
                                <div>{p.description}</div>
                            </Link>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
