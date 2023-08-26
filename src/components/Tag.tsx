import { Close } from '@/app/Icons';
import clsx from 'clsx';

function SkillTag({ tag, onClick }: { tag: string; onClick?: () => void }) {
    return (
        <span
            onClick={onClick}
            className={clsx(
                'rounded-full bg-blue-200 px-2.5 py-1 font-medium text-blue-700 dark:text-blue-900',
                onClick && 'cursor-pointer',
            )}
        >
            {tag}
        </span>
    );
}

export default function TagList({
    tags,
    className,
    handleTagClick,
}: {
    tags: string[];
    className?: string;
    handleTagClick?: (tag: string) => void;
}) {
    return (
        <div className={clsx('flex flex-wrap gap-2 pt-1 text-xs', className)}>
            {tags.map((t, i) => (
                <SkillTag
                    tag={t}
                    key={'experience-' + i}
                    onClick={() => handleTagClick(t)}
                />
            ))}
        </div>
    );
}

export function FilterTag({
    tag,
    onClick,
}: {
    tag: string;
    onClick: (tag: string) => void;
}) {
    return (
        <button
            onClick={() => onClick(tag)}
            className="flex items-center gap-1 rounded-full border border-neutral-600 px-2.5 py-1 text-sm font-medium text-neutral-950 hover:bg-neutral-300 dark:text-neutral-50 dark:hover:bg-neutral-500"
        >
            <Close /> {tag}
        </button>
    );
}
