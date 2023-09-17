'use client';

import { useEffect, useState } from 'react';

import Section from '@/components/Section';
import { createContact, getPageViews } from '@/lib/actions';
import clsx from 'clsx';
import { usePlausible } from 'next-plausible';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function Contact({ pageViews }: { pageViews: number }) {
    const plausible = usePlausible();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await createContact(name, email, message);
            plausible('Contact Form Submission');
            setSuccess(true);
            setName('');
            setEmail('');
            setMessage('');
        } catch (error: any) {
            setError(error.message);
        }
    };

    useEffect(() => {
        if (success) {
            setTimeout(() => {
                setSuccess(false);
            }, 5000);
        }
    }, [success]);

    return (
        <Section id="contact">
            <div className="flex h-full w-full flex-1 flex-col justify-between pb-16">
                <form
                    className="flex w-full select-none flex-col gap-2 pb-20"
                    onSubmit={handleSubmit}
                >
                    <p
                        className={clsx(
                            'text-lg',
                            success || error ? 'pb-1' : 'pb-2',
                        )}
                    >
                        Leave a message
                    </p>
                    {success && <p className="text-green-500">Message sent!</p>}
                    {error && <p className="text-red-500">{error}</p>}
                    <div
                        className={clsx(
                            'flex items-center justify-between',
                            success || error ? 'pt-1' : 'pt-2',
                        )}
                    >
                        <Label htmlFor="name">Name:</Label>
                        <Input
                            className="w-2/3"
                            type="text"
                            id="name"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <Label htmlFor="email">Email:</Label>
                        <Input
                            className="w-2/3"
                            type="email"
                            id="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <Label htmlFor="message">Message:</Label>
                        <Textarea
                            className="w-2/3"
                            value={message}
                            id="message"
                            rows={5}
                            onChange={(event) => setMessage(event.target.value)}
                            required
                        />
                    </div>
                    <button className="pt-4 hover:underline" type="submit">
                        Send
                    </button>
                </form>
                <div
                    aria-label="Page Views"
                    className="select-none text-center text-xs text-neutral-600 dark:text-neutral-500"
                >
                    {pageViews} {pageViews === 1 ? 'visit' : 'visits'} this week
                </div>
            </div>
        </Section>
    );
}
