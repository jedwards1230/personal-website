import * as z from 'zod';
import { useForm, useFormContext } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Textarea } from '@/components/ui/textarea';
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
import { buildCoverLetterPrompt } from './prompts';

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
    setMessage,
    experiences,
    about,
    submitButton,
}: {
    setMessage: (msg: string) => void;
    experiences: Experience[];
    about: About;
    submitButton: React.ReactNode;
}) {
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

    const handleSubmit = async (values: z.infer<typeof formSchema>) => {
        const pSize = PARAGRAPH_SIZE[paragraphSize];
        const userProfile = values.about;
        const resume = values.resume;
        const description = values.description;

        const msg = buildCoverLetterPrompt(
            userProfile,
            resume,
            description,
            pSize,
        );

        setMessage(msg);
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-2"
            >
                <FormFields />
                <div className="flex gap-4">
                    {submitButton}
                    <RadioGroup className="flex" value={paragraphSize}>
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

function FormFields() {
    const form = useFormContext<z.infer<typeof formSchema>>();

    return (
        <div>
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
        </div>
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
                <Label>{title}</Label>
            </div>
            <div className="w-full py-1">{children}</div>
        </div>
    );
}
