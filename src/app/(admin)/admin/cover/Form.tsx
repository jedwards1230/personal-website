'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useEffect, useRef, useState } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form';

const SECTIONS = {
    ABOUT: 'User Profile',
    DESCRIPTION: 'Job Description',
    RESUME: 'Resume',
    RESULT: 'Result',
};

const PARAGRAPH_SIZE = {
    short: 'short (1-2 Paragraphs)',
    medium: 'medium (3-4 Paragraphs)',
    large: 'large (5+ Paragraphs)',
};

const formSchema = z.object({
    about: z.string().nonempty(),
    resume: z.string().nonempty(),
    description: z.string().nonempty(),
});

export default function CoverForm({
    experiences,
    about,
}: {
    experiences: Experience[];
    about: About;
}) {
    const [loading, setLoading] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            about: about?.description || '',
            resume: JSON.stringify(experiences) || '',
            description: '',
        },
    });

    const [completion, setCompletion] = useState('');
    const [paragraphSize, setParagraphSize] = useState<
        'short' | 'medium' | 'large'
    >('short');
    const textareaRef = useRef(null);

    const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event);
        setParagraphSize(event.target.value as 'short' | 'medium' | 'large');
    };

    const handleSubmit = async () => {
        setLoading(true);
        setCompletion('');
        const pSize = PARAGRAPH_SIZE[paragraphSize];
        const info = `User Profile: ${form.getValues().about}\nResume: ${
            form.getValues().resume
        }\nDescription: ${form.getValues().description}`;
        const msg = `Create a ${pSize} cover letter based on the following information:\n${info}`;
        const messages = [
            {
                role: 'system',
                content: msg,
            },
        ];
        try {
            const res = await fetch('http://localhost:3000/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ messages }),
            });

            const data = await res.json();

            if (data.error) throw new Error(data.error);

            setCompletion(data.choices[0].message.content);
        } catch (err: any) {
            form.setError('root', {
                type: 'manual',
                message: err.message,
            });
        }
        setLoading(false);
    };

    useEffect(() => {
        if (!textareaRef.current || !completion) return;
        textareaRef.current.style.height = 'inherit';
        const scrollHeight = textareaRef.current.scrollHeight;
        textareaRef.current.style.height = `${scrollHeight}px`;
    }, [completion]);

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-2"
            >
                <Section title={SECTIONS.ABOUT}>
                    <FormField
                        control={form.control}
                        name="about"
                        render={({ field }) => (
                            <FormItem className="col-span-3">
                                {/* <FormLabel>Bio</FormLabel> */}
                                <FormControl>
                                    <Textarea {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </Section>
                <Section title={SECTIONS.RESUME}>
                    <FormField
                        control={form.control}
                        name="resume"
                        render={({ field }) => (
                            <FormItem className="col-span-3">
                                {/* <FormLabel>Bio</FormLabel> */}
                                <FormControl>
                                    <Textarea {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </Section>
                <Section title={SECTIONS.DESCRIPTION}>
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem className="col-span-3">
                                {/* <FormLabel>Bio</FormLabel> */}
                                <FormControl>
                                    <Textarea {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </Section>
                <div className="flex gap-4">
                    <Button disabled={loading} type="submit">
                        Generate
                    </Button>
                    <RadioGroup
                        disabled={loading}
                        className="flex"
                        value={paragraphSize}
                        onChange={handleSizeChange}
                    >
                        <div
                            onClick={() => setParagraphSize('short')}
                            className="flex items-center space-x-2"
                        >
                            <RadioGroupItem value="short" id="short" />
                            <Label htmlFor="short">
                                Short (1-2 Paragraphs)
                            </Label>
                        </div>
                        <div
                            onClick={() => setParagraphSize('medium')}
                            className="flex items-center space-x-2"
                        >
                            <RadioGroupItem value="medium" id="medium" />
                            <Label htmlFor="medium">
                                Medium (3-4 Paragraphs)
                            </Label>
                        </div>
                        <div
                            onClick={() => setParagraphSize('large')}
                            className="flex items-center space-x-2"
                        >
                            <RadioGroupItem value="large" id="large" />
                            <Label htmlFor="large">Long (5+ Paragraphs)</Label>
                        </div>
                    </RadioGroup>
                </div>
                {form.formState.errors.root && (
                    <FormMessage>
                        {form.formState.errors.root.message}
                    </FormMessage>
                )}
                {completion && (
                    <Section title={SECTIONS.RESULT}>
                        <Textarea
                            className="py-1"
                            ref={textareaRef}
                            readOnly
                            value={completion}
                        />
                    </Section>
                )}
            </form>
        </Form>
    );
}

function Section({
    children,
    title,
}: {
    children: React.ReactNode;
    title: string;
}) {
    return (
        <div className="w-full transition-all">
            <div className="flex w-full justify-between">
                <Title>{title}</Title>
            </div>
            <List>{children}</List>
        </div>
    );
}

function Title({ children }: { children: React.ReactNode }) {
    return <div className="py-2 text-lg font-bold">{children}</div>;
}

function List({ children }: { children: React.ReactNode }) {
    return <div className="w-full py-1">{children}</div>;
}
