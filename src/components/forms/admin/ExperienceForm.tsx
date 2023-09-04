import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import {
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { createExperience, updateExperience } from '@/lib/actions';

const formSchema = z.object({
    title: z.string().nonempty(),
    company: z.string().nonempty(),
    period: z.string().nonempty(),
    summary: z.string().nonempty(),
    description: z.string().nonempty(),
    tags: z.string().nonempty(),
    extraTags: z.string(),
});

export default function ExperienceForm({
    experience,
    setOpen,
}: {
    experience?: Experience;
    setOpen: (open: boolean) => void;
}) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: experience?.title || '',
            company: experience?.company || '',
            period: experience?.period || '',
            summary: experience?.summary || '',
            description: experience?.description.join('\n') || '',
            tags: experience?.tags.join(', ') || '',
            extraTags: experience?.extraTags
                ? experience.extraTags.join(', ')
                : '',
        },
    });

    const handleSubmit = (values: z.infer<typeof formSchema>) => {
        const updatedExperience: Experience = {
            ...experience,
            title: values.title,
            company: values.company,
            period: values.period,
            summary: values.summary,
            description: values.description.split('\n'),
            tags: values.tags.split(', '),
            extraTags: values.extraTags.split(', '),
        };

        try {
            if (!experience) {
                createExperience(updatedExperience)
                    .then((res) => {
                        console.log(res);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            } else {
                updateExperience(updatedExperience);
            }
            setOpen(false);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Form {...form}>
            <form>
                <DialogContent className="max-h-screen overflow-y-scroll sm:max-h-[95%] sm:max-w-lg md:max-w-xl lg:max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>
                            {experience ? 'Edit' : 'Add'} experience
                        </DialogTitle>
                        <DialogDescription>
                            {experience
                                ? 'Make changes to your experience here.'
                                : 'Add an experience here.'}{' '}
                            Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-2 py-4 sm:gap-4">
                        <div className="grid grid-cols-3 gap-2 sm:grid-cols-6 sm:gap-4">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem className="col-span-3">
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="company"
                                render={({ field }) => (
                                    <FormItem className="col-span-3">
                                        <FormLabel>Company</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="period"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Period</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="summary"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Summary</FormLabel>
                                    <FormControl>
                                        <Textarea className="h-24" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea className="h-32" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="tags"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tags</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="extraTags"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Extra Tags</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <DialogFooter>
                        <Button
                            onClick={form.handleSubmit(handleSubmit)}
                            type="submit"
                        >
                            Save {experience ? 'Changes' : 'Experience'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Form>
    );
}
