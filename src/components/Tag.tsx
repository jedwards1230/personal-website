import clsx from 'clsx';

function Tag({ tag }: { tag: string }) {
    return (
        <span className="rounded-full bg-blue-200 px-2.5 py-1 font-medium text-blue-700 dark:text-blue-900">
            {tag}
        </span>
    );
}

export default function TagList({
    tags,
    className,
}: {
    tags: string[];
    className?: string;
}) {
    return (
        <div className={clsx('flex flex-wrap gap-2 pt-1 text-xs', className)}>
            {tags.map((t, i) => (
                <Tag tag={t} key={'experience-' + i} />
            ))}
        </div>
    );
}
