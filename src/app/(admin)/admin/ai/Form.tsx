'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form';
import ChatDialog from './ChatDialog';

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
    const [message, setMessage] = useState<Message | null>(null);
    const [paragraphSize, setParagraphSize] =
        useState<keyof typeof PARAGRAPH_SIZE>('short');

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            about:
                JSON.stringify({
                    name: about.name,
                    title: about.title,
                    location: about.location,
                    email: about.email,
                    phone: about.phone,
                }) || '',
            resume: JSON.stringify(experiences) || '',
            description: '',
        },
    });

    const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setParagraphSize(event.target.value as keyof typeof PARAGRAPH_SIZE);
    };

    const handleSubmit = async (values: z.infer<typeof formSchema>) => {
        const pSize = PARAGRAPH_SIZE[paragraphSize];
        const userProfile = values.about;
        const resume = values.resume;
        const description = values.description;

        const msg =
            `Create a cover letter based on the following rules and information.` +
            `\n\nRules:\n\n` +
            `Letter size: ${pSize}. ` +
            `Include line breaks (\\n) between paragraphs and sections. ` +
            `Do not claim to have experience with things not explicity listed.` +
            `\n\nInformation:\n\n` +
            `User Profile:\n${userProfile}\n\n` +
            `Resume:\n${resume}\n\n` +
            `Description:\n${description}`;

        setMessage({
            role: 'system',
            content: msg,
        });
    };

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
                    <ChatDialog
                        initialMessage={message}
                        onClose={() => setMessage(null)}
                    >
                        <Button type="submit">Generate</Button>
                    </ChatDialog>

                    <RadioGroup
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
