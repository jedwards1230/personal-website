import Markdown from '@/components/Markdown';
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

export default function MessageDialog({
    children,
    message,
}: {
    children: React.ReactNode;
    message: Contact;
}) {
    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="max-h-screen overflow-y-scroll sm:max-h-[95%] sm:max-w-lg md:max-w-xl lg:max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="flex gap-6">Message</DialogTitle>
                </DialogHeader>
                <DialogDescription className="space-y-1">
                    <div className="grid grid-cols-9 items-center gap-4">
                        <Label className="col-span-1">Name:</Label>
                        <p className="text-foreground">{message.name}</p>
                    </div>
                    <div className="grid grid-cols-9 items-center gap-4">
                        <Label className="col-span-1">Email:</Label>
                        <Link
                            className="text-foreground underline-offset-4 hover:underline"
                            href={'mailto:' + message.email}
                        >
                            {message.email}
                        </Link>
                    </div>
                    <div className="grid grid-cols-9 items-center gap-4">
                        <Label className="col-span-1">Date:</Label>
                        <p className="text-foreground">
                            {message.createdAt.toLocaleDateString()}
                        </p>
                    </div>
                </DialogDescription>
                <div className="flex flex-col gap-2 border-t border-border pt-2">
                    <Markdown>{message.message}</Markdown>
                </div>
            </DialogContent>
        </Dialog>
    );
}
