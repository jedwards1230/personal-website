import Section from '@/components/Section';
import Markdown from '@/components/Markdown';

export default function About({ about }: { about: About }) {
    return (
        <Section id="about">
            <div className="space-y-4 text-neutral-800 dark:text-neutral-300">
                <Markdown>{about.description}</Markdown>
            </div>
        </Section>
    );
}
