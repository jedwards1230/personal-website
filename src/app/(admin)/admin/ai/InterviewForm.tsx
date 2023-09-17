import * as z from 'zod';
import { useForm, useFormContext } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form';
import { buildInterviewPrompt } from './prompts';

const SECTIONS = {
    ABOUT: 'User Profile',
    DESCRIPTION: 'Job Description',
    RESUME: 'Resume',
    RESULT: 'Result',
};

const formSchema = z.object({
    about: z.string().nonempty(),
    resume: z.string().nonempty(),
    description: z.string().nonempty(),
});

export default function InterviewForm({
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
        const userProfile = values.about;
        const resume = values.resume;
        const description = values.description;

        const msg = buildInterviewPrompt(userProfile, resume, description);

        setMessage(msg);
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-2"
            >
                <FormFields />
                {submitButton}
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
        <div className="space-y-2">
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
