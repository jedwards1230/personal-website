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

const formSchema = z.object({
    activeForm: z.string(),
});

export default function TemplateSelector({
    activeForm,
    setActiveForm,
}: {
    activeForm: Forms;
    setActiveForm: (form: Forms) => void;
}) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            activeForm: activeForm,
        },
    });

    return (
        <Form {...form}>
            <form className="w-64">
                <FormField
                    control={form.control}
                    name="activeForm"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Template</FormLabel>
                            <Select
                                defaultValue={field.value}
                                onValueChange={(v: Forms) => {
                                    field.onChange();
                                    setActiveForm(v);
                                }}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder={activeForm} />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="Assistant">
                                        Assistant
                                    </SelectItem>
                                    <SelectItem value="Cover Letter">
                                        Cover Letter
                                    </SelectItem>
                                    <SelectItem value="Interview">
                                        Interview
                                    </SelectItem>
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
