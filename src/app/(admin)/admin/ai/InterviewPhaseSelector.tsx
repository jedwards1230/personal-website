import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

const phases: InterviewPhase[] = ['Initial', 'Technical', 'Personality'];

const formSchema = z.object({
    phase: z.string(),
});

export default function InterviewPhaseSelector({
    phase,
    setActivePhase,
}: {
    phase: InterviewPhase;
    setActivePhase: (phase: InterviewPhase) => void;
}) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { phase },
    });

    return (
        <Form {...form}>
            <form className="flex w-full items-end gap-2">
                <FormField
                    control={form.control}
                    name="phase"
                    render={({ field }) => (
                        <FormItem className="flex w-full flex-col">
                            <FormLabel>Interview Phase</FormLabel>
                            <Select
                                defaultValue={field.value.toString()}
                                onValueChange={(id: string) => {
                                    field.onChange();
                                    setActivePhase(id as InterviewPhase);
                                }}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder={phase} />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {phases.map((p) => (
                                        <SelectItem key={p} value={p}>
                                            {p}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    );
}
