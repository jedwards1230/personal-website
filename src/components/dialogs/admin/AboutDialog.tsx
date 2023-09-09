'use client';

import { useState } from 'react';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { updateAbout } from '@/lib/actions';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';

const formSchema = z.object({
    name: z.string().nonempty(),
    title: z.string().nonempty(),
    tags: z.string().nonempty(),
    description: z.string().nonempty(),
});

export default function AboutDialog({
    children,
    about,
}: {
    children: React.ReactNode;
    about: About;
}) {
    const router = useRouter();
    const [open, setOpen] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: about?.name || '',
            title: about?.title || '',
            tags: about?.tags.join(', ') || '',
            description: about?.description || '',
        },
    });

    const handleSubmit = async (values: z.infer<typeof formSchema>) => {
        const updatedAbout: About = {
            ...about,
            name: values.name,
            title: values.title,
            tags: values.tags.split(', '),
            description: values.description,
        };

        try {
            await updateAbout(updatedAbout);
            setOpen(false);
            router.refresh();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Dialog open={open} onOpenChange={(o) => setOpen(o)}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="max-h-screen overflow-y-scroll sm:max-h-[95%] sm:max-w-lg md:max-w-xl lg:max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="flex gap-6">Message</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleSubmit)}
                        className="space-y-2 sm:space-y-4"
                    >
                        <div className="flex w-full flex-col gap-2 sm:flex-row sm:gap-4">
                            <div className="w-full space-y-2 sm:w-1/2 sm:space-y-4">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem className="col-span-3">
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
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
                            </div>
                            <div className="w-full sm:w-1/2">
                                <FormField
                                    control={form.control}
                                    name="tags"
                                    render={({ field }) => (
                                        <FormItem className="col-span-3">
                                            <FormLabel>Tags</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem className="col-span-3">
                                    <FormLabel>Bio</FormLabel>
                                    <FormControl>
                                        <Textarea {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Save</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
