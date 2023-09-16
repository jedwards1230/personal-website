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
    email: z.string().nonempty(),
    location: z.string().nonempty(),
    phone: z.string().nonempty(),
    linkedin: z.string().nonempty(),
    github: z.string().nonempty(),
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
            email: about?.email || '',
            location: about?.location || '',
            phone: about?.phone || '',
            linkedin: about?.linkedin || '',
            github: about?.github || '',
        },
    });

    const handleSubmit = async (values: z.infer<typeof formSchema>) => {
        const updatedAbout: About = {
            ...about,
            ...values,
            tags: values.tags.split(', '),
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
                        <div className="grid w-full grid-cols-3 gap-2 sm:grid-cols-6 sm:gap-4">
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
                        <FormField
                            control={form.control}
                            name="location"
                            render={({ field }) => (
                                <FormItem className="col-span-3">
                                    <FormLabel>Location</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="grid w-full grid-cols-3 gap-2 sm:grid-cols-6 sm:gap-4">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem className="col-span-3">
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input type="email" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem className="col-span-3">
                                        <FormLabel>Phone</FormLabel>
                                        <FormControl>
                                            <Input type="tel" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="grid w-full grid-cols-3 gap-2 sm:grid-cols-6 sm:gap-4">
                            <FormField
                                control={form.control}
                                name="linkedin"
                                render={({ field }) => (
                                    <FormItem className="col-span-3">
                                        <FormLabel>LinkedIn</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="github"
                                render={({ field }) => (
                                    <FormItem className="col-span-3">
                                        <FormLabel>GitHub</FormLabel>
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
                            name="tags"
                            render={({ field }) => (
                                <FormItem className="">
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
                            name="description"
                            render={({ field }) => (
                                <FormItem className="">
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
