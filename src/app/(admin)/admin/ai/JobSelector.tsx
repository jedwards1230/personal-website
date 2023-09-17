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
import { Button } from '@/components/ui/button';

const formSchema = z.object({
    id: z.coerce.number(),
});

export default function JobSelector({
    jobs,
    activeJob,
    setActiveJob,
}: {
    jobs: Job[];
    activeJob: Job | null;
    setActiveJob: (id: number) => void;
}) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            id: activeJob ? activeJob.id : -1,
        },
    });

    return (
        <Form {...form}>
            <form className="flex w-64 items-end gap-2">
                <FormField
                    control={form.control}
                    name="id"
                    render={({ field }) => (
                        <FormItem className="flex w-full flex-col">
                            <FormLabel>Job</FormLabel>
                            <Select
                                defaultValue={field.value.toString()}
                                onValueChange={(id: string) => {
                                    field.onChange();
                                    setActiveJob(parseInt(id));
                                }}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue
                                            placeholder={
                                                activeJob
                                                    ? activeJob.toString()
                                                    : 'Select a job'
                                            }
                                        />
                                    </SelectTrigger>
                                </FormControl>
                                {jobs.length > 0 && (
                                    <SelectContent>
                                        {jobs.map((job) => (
                                            <SelectItem
                                                key={job.id}
                                                value={job.id.toString()}
                                            >
                                                {job.company}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                )}
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button
                    type="button"
                    className="flex"
                    variant="outline"
                    size="icon"
                >
                    +
                </Button>
            </form>
        </Form>
    );
}
