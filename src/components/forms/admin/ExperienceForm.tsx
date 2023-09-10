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
import { DialogFooter } from '@/components/ui/dialog';
import { createExperience, updateExperience } from '@/lib/actions';
import { useRouter } from 'next/navigation';

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
    data,
    setEdit,
}: {
    data?: Experience;
    setEdit: (edit: boolean) => void;
}) {
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: data?.title || '',
            company: data?.company || '',
            period: data?.period || '',
            summary: data?.summary || '',
            description: data?.description.join('\n') || '',
            tags: data?.tags.join(', ') || '',
            extraTags: data?.extraTags ? data.extraTags.join(', ') : '',
        },
    });

    const handleSubmit = async (values: z.infer<typeof formSchema>) => {
        const updatedExperience: Experience = {
            ...data,
            title: values.title,
            company: values.company,
            period: values.period,
            summary: values.summary,
            description: values.description.split('\n'),
            tags: values.tags.split(', '),
            extraTags: values.extraTags.split(', '),
        };

        try {
            if (!data) {
                await createExperience(updatedExperience);
            } else {
                await updateExperience(updatedExperience);
            }
            setEdit(false);
            router.refresh();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Form {...form}>
            <form>
                <div className="grid gap-2 pb-4 sm:gap-4">
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
                        Save {data ? 'Changes' : 'Experience'}
                    </Button>
                </DialogFooter>
            </form>
        </Form>
    );
}
