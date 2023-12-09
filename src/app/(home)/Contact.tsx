'use client';

import { useEffect, useState } from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePlausible } from 'next-plausible';
import Link from 'next/link';

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
import DownloadResume from '@/components/DownloadResume';
import SectionTitle from '@/components/SectionTitle';

const ID = 'contact';

export default function Contact({
    about,
    pageViews,
}: {
    about: About;
    pageViews: number;
}) {
    const linkedInUsername = about.linkedin.replace(/\/$/, '').split('/').pop();
    const githubUsername = about.github.replace(/\/$/, '').split('/').pop();

    return (
        <section
            id={ID}
            className="flex h-full min-h-screen flex-col gap-4 sm:py-16 md:justify-between md:gap-8"
        >
            <SectionTitle id={ID} />
            <div className="flex flex-col gap-4 md:mt-4 md:flex-row">
                <div className="flex flex-col justify-start gap-4 md:w-1/2">
                    <p>
                        I am currently looking for new opportunities. Feel free
                        to reach out!
                    </p>
                    <p>
                        Email:{' '}
                        <Link
                            className="hover:underline"
                            href={'mailto:' + about.email + '?subject=Hello!'}
                            target="_blank"
                            rel="noreferrer"
                        >
                            {about.email}
                        </Link>
                    </p>
                    <p>
                        LinkedIn:{' '}
                        <Link
                            className="hover:underline"
                            href={about.linkedin}
                            target="_blank"
                            rel="noreferrer"
                        >
                            {'@' + linkedInUsername}
                        </Link>
                    </p>
                    <p>
                        GitHub:{' '}
                        <Link
                            className="hover:underline"
                            href={about.github}
                            target="_blank"
                            rel="noreferrer"
                        >
                            {'@' + githubUsername}
                        </Link>
                    </p>
                    <DownloadResume />
                </div>
                <ContactForm />
            </div>
            <div
                aria-label="Page Views"
                className="mb-8 mt-auto select-none text-center text-xs text-neutral-600 dark:text-neutral-500"
            >
                {pageViews} {pageViews === 1 ? 'visit' : 'visits'} this week
            </div>
        </section>
    );
}

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

function ContactForm() {
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
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="flex h-full w-full flex-1 flex-col justify-between"
            >
                <div className="flex w-full select-none flex-col gap-2">
                    <p className="mb-2 text-lg">Leave a message</p>
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
            </form>
        </Form>
    );
}
