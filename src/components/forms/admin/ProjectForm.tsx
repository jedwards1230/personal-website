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
import { createProject, updateProject } from '@/lib/actions';
import { useRouter } from 'next/navigation';
import { Checkbox } from '@/components/ui/checkbox';

const formSchema = z.object({
    year: z.number().int().min(2000).max(2024),
    month: z.number().int().min(1).max(12),
    company: z.string().nonempty(),
    client: z.string().optional(),
    title: z.string().nonempty(),
    description: z.string().nonempty(),
    info: z.string().nonempty(),
    href: z.string().optional(),
    tags: z.string().nonempty(),
    showcase: z.boolean().optional(),
    favorite: z.boolean().optional(),
    images: z.string().optional(),
});

export default function ProjectForm({
    data,
    setEdit,
}: {
    data?: Project;
    setEdit: (open: boolean) => void;
}) {
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            year: data?.year,
            month: data?.month,
            company: data?.company,
            client: data?.client ?? '',
            title: data?.title,
            description: data?.description,
            info: data?.info,
            href: data?.href ?? '',
            tags: data?.tags.join(', '),
            showcase: data?.showcase || false,
            favorite: data?.favorite || false,
            images: data?.images.join(', '),
        },
    });

    const handleSubmit = async (values: z.infer<typeof formSchema>) => {
        const updatedProject: Project = {
            ...data,
            year: values.year,
            month: values.month,
            company: values.company,
            client: values.client,
            title: values.title,
            description: values.description,
            info: values.info,
            href: values.href,
            tags: values.tags.split(', '),
            showcase: values.showcase,
            favorite: values.favorite,
            images: values.images.split(', '),
        };

        try {
            if (!data) {
                createProject(updatedProject)
                    .then((res) => {
                        console.log(res);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            } else {
                updateProject(updatedProject);
            }
            setEdit(false);
            router.refresh();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
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
                    <div className="grid grid-cols-3 gap-2 sm:grid-cols-6 sm:gap-4">
                        <div className="col-span-3 flex gap-4">
                            <FormField
                                control={form.control}
                                name="month"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Month</FormLabel>
                                        <FormControl>
                                            <Input type="month" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="year"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Year</FormLabel>
                                        <FormControl>
                                            <Input type="year" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="client"
                            render={({ field }) => (
                                <FormItem className="col-span-3">
                                    <FormLabel>Client</FormLabel>
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
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea className="h-24" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="grid grid-cols-3 gap-2 sm:grid-cols-6 sm:gap-4">
                        <FormField
                            control={form.control}
                            name="showcase"
                            render={({ field }) => (
                                <FormItem className="col-span-3 flex items-center gap-2">
                                    <FormLabel>Showcase</FormLabel>
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="favorite"
                            render={({ field }) => (
                                <FormItem className="flex items-center gap-2">
                                    <FormLabel>Favorite</FormLabel>
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                        control={form.control}
                        name="href"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Link</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="images"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Images</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="info"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Info</FormLabel>
                                <FormControl>
                                    <Textarea className="h-64" {...field} />
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
                </div>
                <DialogFooter>
                    <Button type="submit">
                        Save {data ? 'Changes' : 'Experience'}
                    </Button>
                </DialogFooter>
            </form>
        </Form>
    );
}
