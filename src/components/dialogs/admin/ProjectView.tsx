import Markdown from '@/components/Markdown';
import { Label } from '@/components/ui/label';

export default function ExperienceView({ data }: { data?: Project }) {
    return (
        <div className="grid gap-2 sm:gap-4">
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-6 sm:gap-4">
                <div className="col-span-3 grid gap-2 sm:gap-4">
                    <div>
                        <Label>Company</Label>
                        <p>{data?.title}</p>
                    </div>
                    <div>
                        <Label>Client</Label>
                        <p>{data?.client ? data.client : 'None'}</p>
                    </div>
                </div>
                <div className="grid gap-2 sm:gap-4">
                    <div>
                        <Label>Date</Label>
                        <p>
                            {data?.month} / {data?.year}
                        </p>
                    </div>
                    <div className="grid grid-cols-6 gap-8">
                        <div className="col-span-3">
                            <Label>Showcase</Label>
                            <p>{data?.showcase === true ? 'True' : 'False'}</p>
                        </div>
                        <div>
                            <Label>Favorite</Label>
                            <p>{data?.favorite === true ? 'True' : 'False'}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <Label>Link</Label>
                <p>{data?.href ? data.href : 'None'}</p>
            </div>
            <div>
                <Label>Images</Label>
                <p>
                    {data?.images.length > 0 ? data?.images.join(', ') : 'None'}
                </p>
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
