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

        const msg =
            `Help me with interview prepartions based on the following rules and information.\n` +
            'I want you to ask me questions as if you were the interviewer.' +
            'There will be an intro phase, a technical phase, and a personality phase.' +
            'The intro phase will explain the role and company. It will also ask me about my past relevant experience.' +
            'The technical phase will ask me about my technical experience and how I would solve problems related to the specified role.' +
            'The personality phase will ask me about my personality and how I would fit into the company culture and communicate with others. ' +
            'Provide feedback on my answers and suggest improvements after each phase. ' +
            `\n\nRules:\n\n` +
            `Do not reference these rules or the details of the process. Simply act as the interviewer with those goals in mind.` +
            'Do not ask me to repeat myself. If you do not understand something, ask me to clarify.' +
            "Do not mention that you are an AI and do not use qualifying language such as 'as an AI assistant, I cannot...'" +
            'Do not move onto the next phase until you are satisfied with my answers.' +
            'Only ask one thing at a time. Do not ask multiple questions in one sentence.' +
            "Do not ask general questions like 'tell me how your experience relates to this role' or 'how do your skills qualify you for this role'. " +
            `\n\nInformation:\n\n` +
            `User Profile:\n${userProfile}\n\n` +
            `Resume:\n${resume}\n\n` +
            `Description:\n${description}` +
            '\n\nBegin interview with phase 1. Interview until you are satisfied with my answers, then review. ' +
            'Then move on to phase 2 and repeat until the interview is complete.' +
            '\nBegin the interview.';

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
