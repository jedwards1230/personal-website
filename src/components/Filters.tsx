'use client';

import { useFilter } from '@/FilterProvider';
import { Close } from './Icons';
import { Badge } from './ui/badge';

export default function Filters() {
    const {
        companyFilter,
        clientFilter,
        yearFilter,
        tagFilter,
        removeCompanyFilter,
        removeClientFilter,
        removeYearFilter,
        removeTagFilter,
    } = useFilter();

    return (
        <div>
            {/* Filters */}
            <div className="flex flex-wrap justify-center gap-2 pt-1">
                {companyFilter.map((c, i) => (
                    <FilterTag
                        key={'company-' + i}
                        tag={c}
                        onClick={() => removeCompanyFilter(c)}
                    />
                ))}
                {clientFilter.map((c, i) => (
                    <FilterTag
                        key={'client-' + i}
                        tag={c}
                        onClick={() => removeClientFilter(c)}
                    />
                ))}
                {yearFilter.map((y, i) => (
                    <FilterTag
                        key={'year-' + i}
                        tag={y.toString()}
                        onClick={() => removeYearFilter(y)}
                    />
                ))}
                {tagFilter.map((t, i) => (
                    <FilterTag
                        key={'tag-' + i}
                        tag={t}
                        onClick={() => removeTagFilter(t)}
                    />
                ))}
            </div>
        </div>
    );
}

function FilterTag({
    tag,
    onClick,
}: {
    tag: string;
    onClick: (tag: string) => void;
}) {
    return (
        <Badge onClick={() => onClick(tag)} variant="secondary">
            <Close /> {tag}
        </Badge>
    );
}
