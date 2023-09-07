import Markdown from '@/components/Markdown';
import { Label } from '@/components/ui/label';

export default function ExperienceView({ data }: { data?: Project }) {
    return (
        <div className="grid gap-2 sm:gap-4">
            <div>
                <Label>Company</Label>
                <p>{data?.title}</p>
            </div>
            <div>
                <Label>Client</Label>
                <p>{data?.client}</p>
            </div>
            <div>
                <Label>Month</Label>
                <p>{data?.month}</p>
            </div>
            <div>
                <Label>Year</Label>
                <p>{data?.year}</p>
            </div>
            <div>
                <Label>Link</Label>
                <p>{data?.href}</p>
            </div>
            <div>
                <Label>Showcase</Label>
                <p>{data?.showcase}</p>
            </div>
            <div>
                <Label>Favorite</Label>
                <p>{data?.favorite}</p>
            </div>
            <div>
                <Label>Images</Label>
                <p>{data?.images.join(', ')}</p>
            </div>
            <div>
                <Label>Description</Label>
                <p>{data?.description}</p>
            </div>
            <div>
                <Label>Info</Label>
                <Markdown>{data?.info}</Markdown>
            </div>
            <div>
                <Label>Tags</Label>
                <p>{data?.tags.join(', ')}</p>
            </div>
        </div>
    );
}
