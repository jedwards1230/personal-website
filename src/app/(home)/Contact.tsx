'use client';

import { useEffect, useState } from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePlausible } from 'next-plausible';

import Section from '@/components/Section';
import { createContact } from '@/lib/actions';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';

const formSchema = z.object({
    name: z.string().optional(),
    email: z.preprocess(
        (email) => {
            if (!email || typeof email !== 'string') return undefined;
            return email === '' ? undefined : email;
        },
        z
            .string()
            .email({
                message: 'Please correct your email address',
            })
            .optional(),
    ),
    message: z.string().nonempty(),
});

export default function Contact({ pageViews }: { pageViews: number }) {
    const plausible = usePlausible();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: '',
            message: '',
        },
    });
    // TODO: use hook error handling
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await createContact(values.name, values.email, values.message);
            plausible('Contact Form Submission');
            setSuccess(true);
        } catch (error: any) {
            setError(error.message);
        }
    };

    useEffect(() => {
        if (success) setTimeout(() => setSuccess(false), 5000);
    }, [success]);

    return (
        <Section id="contact">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleSubmit)}
                    className="flex h-full w-full flex-1 flex-col justify-between pb-16"
                >
                    <div className="flex w-full select-none flex-col gap-2 pb-20">
                        <p className="text-lg">Leave a message</p>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                className="md:w-2/3"
                                                {...field}
                                            />
                                        </FormControl>
                                    </div>
                                    <div className="flex justify-end">
                                        <FormMessage />
                                    </div>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                className="md:w-2/3"
                                                type="email"
                                                {...field}
                                            />
                                        </FormControl>
                                    </div>
                                    <div className="flex justify-end">
                                        <FormMessage />
                                    </div>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
                                        <FormLabel>Message</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                {...field}
                                                className="md:w-2/3"
                                                rows={5}
                                            />
                                        </FormControl>
                                    </div>
                                    <div className="flex justify-end">
                                        <FormMessage />
                                    </div>
                                </FormItem>
                            )}
                        />
                        <Button variant="link" type="submit">
                            Send
                        </Button>
                        <div className="pt-2 text-center">
                            {success && (
                                <p className="text-green-500">Message sent!</p>
                            )}
                            {error && <p className="text-red-500">{error}</p>}
                        </div>
                    </div>
                    <div
                        aria-label="Page Views"
                        className="select-none text-center text-xs text-neutral-600 dark:text-neutral-500"
                    >
                        {pageViews} {pageViews === 1 ? 'visit' : 'visits'} this
                        week
                    </div>
                </form>
            </Form>
        </Section>
    );
}
