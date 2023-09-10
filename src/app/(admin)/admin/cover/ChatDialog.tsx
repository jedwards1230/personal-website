'use client';

import * as z from 'zod';
import clsx from 'clsx';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form';

const formSchema = z.object({
    input: z.string().nonempty(),
});

export default function ChatDialog({
    initialMessage,
}: {
    initialMessage: Message | null;
}) {
    const [open, setOpen] = useState(true);
    const [messages, setMessages] = useState<Message[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            input: '',
        },
    });

    const getChat = useCallback(
        async (newMessages: Message[]) => {
            try {
                const data = await fetchChat(newMessages);
                setMessages((prev) => [...prev, data]);
            } catch (err: any) {
                form.setError('root', {
                    type: 'manual',
                    message: err.message,
                });
            }
        },
        [form],
    );

    const handleSubmit = async (values: z.infer<typeof formSchema>) => {
        const newMessages: Message[] = [
            ...messages,
            {
                content: values.input,
                role: 'user',
            },
        ];
        form.setValue('input', '');
        setMessages(newMessages);
        getChat(newMessages);
    };

    useEffect(() => {
        if (messages.length === 0 && initialMessage !== null) {
            const initialMessages = [initialMessage];
            setMessages(initialMessages);
            getChat(initialMessages);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialMessage]);

    useEffect(() => {
        if (containerRef.current) {
            const element = containerRef.current;
            element.scrollTop = element.scrollHeight; // scroll to bottom
        }
    }, [messages]);

    return (
        <Dialog open={open && initialMessage !== null}>
            <DialogContent
                onInteractOutside={() => setOpen(false)}
                className="relative max-h-screen -translate-y-3/4 overflow-y-scroll p-1 sm:max-h-[90%] sm:max-w-2xl md:max-w-3xl lg:max-w-4xl"
            >
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)}>
                        <div
                            ref={containerRef}
                            className="max-h-[85vh] space-y-2 overflow-y-scroll scroll-smooth p-1 pb-24"
                        >
                            {messages.map((m, i) => (
                                <ChatBubble key={i}>
                                    {m.role === 'system' ? (
                                        <SystemMessage message={m} />
                                    ) : (
                                        <GenericMessage message={m} />
                                    )}
                                </ChatBubble>
                            ))}
                            {form.formState.errors.root && (
                                <ChatBubble>
                                    <FormMessage>
                                        {form.formState.errors.root.message}
                                    </FormMessage>
                                </ChatBubble>
                            )}
                        </div>
                        <div className="absolute inset-x-0 bottom-0 m-0.5 h-24 bg-background px-4 py-2">
                            <div className="relative">
                                <FormField
                                    control={form.control}
                                    name="input"
                                    render={({ field }) => (
                                        <FormItem className="col-span-3">
                                            <FormControl>
                                                <Textarea {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button
                                    className="absolute bottom-2 right-3"
                                    type="submit"
                                >
                                    Send
                                </Button>
                            </div>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

async function fetchChat(messages: Message[]): Promise<Message> {
    const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            messages,
        }),
    });

    const data = await res.json();

    if (data.error) throw new Error(data.error);

    return data.choices[0].message;
}

function ChatBubble({ children }: { children: React.ReactNode }) {
    return (
        <div className="overflow-x-scroll rounded-lg border border-border p-4">
            {children}
        </div>
    );
}

function GenericMessage({ message }: { message: Message }) {
    const content = message.content.split('\n');

    return (
        <div className="flex w-full flex-col gap-2">
            <Label
                className={clsx(
                    'text-foreground transition-colors',
                    message.role === 'assistant' && 'text-primary-foreground',
                )}
            >
                {message.role}
            </Label>
            <div className="space-y-2">
                {content.map((m, i) => (
                    <p key={i}>{m}</p>
                ))}
            </div>
        </div>
    );
}

function SystemMessage({ message }: { message: Message }) {
    const [hidden, setHidden] = useState(true);
    const [content, setContent] = useState(message.content);

    useEffect(() => {
        setContent(message.content);
    }, [message]);

    return (
        <div className="flex flex-col items-center">
            <div className="flex flex-col gap-2">
                <Label
                    className={clsx(
                        'transition-colors',
                        !hidden
                            ? 'text-foreground'
                            : 'text-secondary-foreground',
                    )}
                >
                    System
                </Label>
                <p
                    className={clsx(
                        'whitespace-pre-wrap text-sm transition-colors',
                        !hidden
                            ? 'text-foreground'
                            : 'max-h-8 overflow-hidden text-secondary-foreground',
                    )}
                >
                    {content}
                </p>
            </div>
            <Button
                variant="link"
                type="button"
                onClick={() => setHidden(!hidden)}
                className="text-sm text-secondary-foreground underline hover:text-foreground"
            >
                {!hidden ? 'Show Less' : 'Show More'}
            </Button>
        </div>
    );
}
