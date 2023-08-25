'use client';

import { useEffect, useState } from 'react';

import Section from '@/components/Section';
import { createContact } from '@/lib/prisma';
import clsx from 'clsx';

export default function Contact() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await createContact(name, email, message);
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
                <label
                    className={clsx(
                        'grid grid-cols-12',
                        success || error ? 'pt-1' : 'pt-2',
                    )}
                >
                    Name:
                    <input
                        className="col-span-8 col-start-5 rounded border border-transparent px-1 py-0.5 focus:border-neutral-300 focus:outline-none dark:bg-neutral-800"
                        type="text"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                </label>
                <label className="grid grid-cols-12">
                    Email:
                    <input
                        className="col-span-8 col-start-5 rounded border border-transparent px-1 py-0.5 focus:border-neutral-300 focus:outline-none dark:bg-neutral-800"
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </label>
                <label className="grid grid-cols-12">
                    Message:
                    <textarea
                        className="col-span-8 col-start-5 rounded border border-transparent px-1 py-0.5 focus:border-neutral-300 focus:outline-none dark:bg-neutral-800"
                        value={message}
                        rows={5}
                        onChange={(event) => setMessage(event.target.value)}
                        required
                    />
                </label>
                <button className="pt-2 hover:underline" type="submit">
                    Send
                </button>
            </form>
        </Section>
    );
}
