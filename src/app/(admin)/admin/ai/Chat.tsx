import * as z from 'zod';
import clsx from 'clsx';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form';
import { fetchChat, parseStreamData, readStream } from '../utils';

const formSchema = z.object({
    input: z.string(),
});

const ENABLE_STREAM = true;

export default function Chat({
    initialMessage,
}: {
    initialMessage: Message | null;
}) {
    const [messages, setMessages] = useState<Message[]>([initialMessage]);
    const containerRef = useRef<HTMLDivElement>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            input: '',
        },
    });

    const reduceStreamData = (acc: string, curr: StreamData) => {
        if (!curr || !curr.choices) {
            if (curr && curr.error) {
                const error = JSON.stringify(curr.error);
            }
            return acc;
        }
        const res = curr.choices[0];
        if (res.finish_reason) {
            //finishReason = res.finish_reason;
            return acc;
        }
        return acc + res.delta.content;
    };

    const upsertMessage = (newMessage: Message) => {
        setMessages((prev) => {
            const messages = [...prev];
            const foundIndex = messages.findIndex(
                (m) => m.id === newMessage.id,
            );

            if (foundIndex !== -1) {
                messages[foundIndex] = newMessage;
            } else {
                messages.push(newMessage);
            }

            return messages;
        });
    };

    const getChat = useCallback(
        async (newMessages: Message[]) => {
            try {
                if (ENABLE_STREAM) {
                    let accumulatedResponse = '';
                    let id = newMessages.length;
                    const streamCallback = (chunk: string) => {
                        const chunks = parseStreamData(chunk);
                        accumulatedResponse = chunks.reduce(
                            reduceStreamData,
                            '',
                        );
                        upsertMessage({
                            id,
                            content: accumulatedResponse,
                            role: 'assistant',
                        });
                    };
                    const stream = (await fetchChat(
                        newMessages,
                        true,
                    )) as ReadableStream;
                    await readStream(stream, streamCallback);
                } else {
                    const data = (await fetchChat(newMessages)) as Message;
                    setMessages((prev) => [...prev, data]);
                }
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
                id: messages.length,
                content: values.input,
                role: 'user',
            },
        ];
        form.setValue('input', '');
        setMessages(newMessages);
        getChat(newMessages);
    };

    useEffect(() => {
        if (initialMessage !== null) {
            const initialMessages = [initialMessage];
            setMessages(initialMessages);
            // TODO: Save chat?
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
        <Form {...form}>
            <form
                className="relative"
                onSubmit={form.handleSubmit(handleSubmit)}
            >
                <div
                    ref={containerRef}
                    className="space-y-2 overflow-y-scroll scroll-smooth p-1"
                >
                    {messages.map((m, i) => {
                        if (m.content === '') return null;
                        return (
                            <ChatBubble key={i}>
                                {m.role === 'system' ? (
                                    <SystemMessage message={m} />
                                ) : (
                                    <GenericMessage message={m} />
                                )}
                            </ChatBubble>
                        );
                    })}
                    {form.formState.errors.root && (
                        <ChatBubble>
                            <FormMessage>
                                {form.formState.errors.root.message}
                            </FormMessage>
                        </ChatBubble>
                    )}
                </div>
                <div className="sticky inset-x-0 bottom-0 h-24 bg-background px-1 py-2">
                    {messages.length > 1 ? (
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
                    ) : (
                        <Button
                            onClick={() => getChat(messages)}
                            className="absolute bottom-2 right-3"
                            type="button"
                        >
                            Begin
                        </Button>
                    )}
                </div>
            </form>
        </Form>
    );
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

    useEffect(() => {
        setHidden(true);
    }, [message]);

    return (
        <div className="flex flex-col items-center">
            <div className="flex w-full flex-col gap-2">
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
                    {message.content}
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
