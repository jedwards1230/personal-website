import TagList from '../TagList';
import BackButton from '../BackButton';
import { projects } from '@/data';
import ProjectList from '../ProjectList';

export default function ExperienceCard({
    experience,
    modal = false,
}: {
    experience: Experience;
    modal?: boolean;
}) {
    const relevantProjects = projects.filter(
        (p) => p.company === experience.company,
    );

    const relevantTags = Array.from(
        new Set(
            relevantProjects.reduce((acc, p) => {
                return [...acc, ...p.tags];
            }, [] as string[]),
        ),
    );

    const tags = [
        ...(relevantTags.length > 0 ? relevantTags : experience.tags),
        ...(experience.extraTags ? experience.extraTags : []),
    ];

    return (
        <div className="flex w-full flex-col pb-4 sm:px-4">
            {/* Title - Client - Year */}
            <div className="sticky top-0 grid grid-cols-12 bg-background py-4">
                <BackButton modal={modal} />
            </div>
            <div className="mb-4 flex w-full flex-col gap-2 sm:flex-row md:gap-4">
                <div className="flex w-full flex-col gap-2 py-2">
                    <div className="flex items-center justify-between">
                        {/* Details */}
                        <div>
                            <p className="text-xl ">{experience.company}</p>
                            <p className="text-lg text-neutral-600 dark:text-neutral-300">
                                {experience.title}
                            </p>
                        </div>
                        <div className="text-neutral-500 dark:text-neutral-400">
                            {experience.period}
                        </div>
                    </div>

                    {/* Tags */}
                    <TagList tags={tags} />
                </div>
            </div>
            <ul className="list-inside list-disc space-y-1">
                {experience.description.map((i) => (
                    <li key={'description-item-' + i}>{i}</li>
                ))}
            </ul>
            {relevantProjects.length > 0 && (
                <ProjectList
                    projects={relevantProjects}
                    inline={true}
                    modal={modal}
                />
            )}
        </div>
    );
}
