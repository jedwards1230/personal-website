import Markdown from '@/components/Markdown';
import { Label } from '@/components/ui/label';

export default function ExperienceView({ data }: { data?: Experience }) {
    return (
        <div className="grid gap-2 sm:gap-4">
            <div>
                <Label>Title</Label>
                <p>{data?.title}</p>
            </div>
            <div>
                <Label>Period</Label>
                <p>{data?.period}</p>
            </div>
            <div>
                <Label>Summary</Label>
                <p>{data?.summary}</p>
            </div>
            <div>
                <Label>Description</Label>
                <Markdown>{data?.description.join('\n')}</Markdown>
            </div>
            <div>
                <Label>Tags</Label>
                <p>{data?.tags.join(', ')}</p>
            </div>
            {data?.extraTags?.length > 0 && (
                <div>
                    <Label>Extra Tags</Label>
                    <p>{data?.extraTags?.join(', ')}</p>
                </div>
            )}
        </div>
    );
}
