import clsx from 'clsx';

import { Badge } from './ui/badge';

export default function TagList({
    tags,
    className,
    onClick,
}: {
    tags: string[];
    className?: string;
    onClick?: (tag: string) => void;
}) {
    return (
        <div className={clsx('flex flex-wrap gap-2 pt-1 text-xs', className)}>
            {tags.map((t, i) =>
                onClick ? (
                    <Badge
                        key={'experience-' + i}
                        variant="primaryLink"
                        onClick={(e) => {
                            e.stopPropagation();
                            onClick(t);
                        }}
                    >
                        {t}
                    </Badge>
                ) : (
                    <Badge key={'experience-' + i}>{t}</Badge>
                ),
            )}
        </div>
    );
}
