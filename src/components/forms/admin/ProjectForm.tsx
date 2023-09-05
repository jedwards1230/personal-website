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
import { createProject, updateProject } from '@/lib/actions';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
    year: z.number().int().min(2000).max(2021),
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
    images: z.array(z.string()).optional(),
});

export default function ProjectForm({
    project,
    setOpen,
}: {
    project?: Project;
    setOpen: (open: boolean) => void;
}) {
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            year: project?.year,
            month: project?.month,
            company: project?.company,
            client: project?.client,
            title: project?.title,
            description: project?.description,
            info: project?.info,
            href: project?.href,
            tags: project?.tags.join(', '),
            showcase: project?.showcase,
            favorite: project?.favorite,
            images: project?.images,
        },
    });

    const handleSubmit = (values: z.infer<typeof formSchema>) => {
        const updatedProject: Project = {
            ...project,
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
            images: values.images,
        };

        try {
            if (!project) {
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
            setOpen(false);
            router.refresh();
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
                            {project ? 'Edit' : 'Add'} experience
                        </DialogTitle>
                        <DialogDescription>
                            {project
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
                        <div className="grid grid-cols-3 gap-2 sm:grid-cols-6 sm:gap-4">
                            <div className="col-span-3 flex gap-4">
                                <FormField
                                    control={form.control}
                                    name="month"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Month</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
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
                                                <Input {...field} />
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
                    </div>
                    <DialogFooter>
                        <Button
                            onClick={form.handleSubmit(handleSubmit)}
                            type="submit"
                        >
                            Save {project ? 'Changes' : 'Experience'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Form>
    );
}
