function Tag({ tag }: { tag: string }) {
    return (
        <span className="rounded-full bg-blue-200 px-2.5 py-1 font-medium text-blue-700 dark:text-blue-900">
            {tag}
        </span>
    );
}

export default function TagList({ tags }: { tags: string[] }) {
    return (
        <div className="flex flex-wrap gap-2 pt-1 text-xs">
            {tags.map((t, i) => (
                <Tag tag={t} key={'experience-' + i} />
            ))}
        </div>
    );
}
