import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { DialogFooter } from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';
import { createJob, updateJob } from '@/lib/actions';

const formSchema = z.object({
    title: z.string().nonempty(),
    company: z.string().nonempty(),
    pay: z.string(),
    ad: z.string().nonempty(),
});

export default function JobForm({
    data,
    setEdit,
}: {
    data?: Job;
    setEdit: (edit: boolean) => void;
}) {
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: data?.title || '',
            company: data?.company || '',
            pay: data?.pay || '',
            ad: data?.ad || '',
        },
    });

    const handleSubmit = async (values: z.infer<typeof formSchema>) => {
        const updatedJob: Job = {
            ...data,
            title: values.title,
            company: values.company,
            pay: values.pay,
            ad: values.ad,
        };

        try {
            if (!data) {
                await createJob(updatedJob);
            } else {
                await updateJob(updatedJob);
            }
            setEdit(false);
            router.refresh();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Form {...form}>
            <form>
                <div className="flex flex-col gap-2 pb-4 sm:gap-4">
                    <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Company</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="pay"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Pay</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="ad"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea className="h-24" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <DialogFooter>
                    <Button
                        onClick={form.handleSubmit(handleSubmit)}
                        type="submit"
                    >
                        Save {data ? 'Changes' : 'Experience'}
                    </Button>
                </DialogFooter>
            </form>
        </Form>
    );
}
