import Markdown from '@/components/Markdown';
import { Label } from '@/components/ui/label';

export default function JobView({ data }: { data?: Job }) {
    return (
        <div className="grid gap-2 sm:gap-4">
            <div>
                <Label>Company</Label>
                <p>{data?.company}</p>
            </div>
            <div>
                <Label>Title</Label>
                <p>{data?.title}</p>
            </div>
            <div>
                <Label>Pay</Label>
                <Markdown>{data?.pay}</Markdown>
            </div>
            <div>
                <Label>Description</Label>
                <p>{data?.ad}</p>
            </div>
        </div>
    );
}
