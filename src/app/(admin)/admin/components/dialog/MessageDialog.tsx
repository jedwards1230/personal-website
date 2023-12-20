'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Trash } from '@/components/Icons';
import Markdown from '@/components/Markdown';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { deleteContact, readContact } from '@/lib/actions';

export default function MessageDialog({
    children,
    message,
}: {
    children: React.ReactNode;
    message: Contact;
}) {
    const router = useRouter();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (!message.readAt && open) {
            readContact(message.id)
                .then(() => router.refresh())
                .catch(console.error);
        }
    }, [message.id, message.readAt, open, router]);

    return (
        <Dialog open={open} onOpenChange={(o) => setOpen(o)}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="max-h-screen overflow-y-scroll sm:max-h-[95%] sm:max-w-lg md:max-w-xl lg:max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="flex gap-6">Message</DialogTitle>
                </DialogHeader>
                <div className="flex justify-between text-secondary-foreground">
                    <div className="space-y-1">
                        <div className="grid grid-cols-9 items-center gap-12 sm:gap-4">
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
                    </div>
                    <div className="flex items-end justify-end">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={async () => {
                                try {
                                    await deleteContact(message.id);
                                    setOpen(false);
                                    router.refresh();
                                } catch (err) {
                                    console.error(err);
                                }
                            }}
                        >
                            <Trash />
                        </Button>
                    </div>
                </div>
                <div className="flex flex-col gap-2 overflow-x-scroll whitespace-pre-wrap border-t border-border pt-2">
                    <Markdown>{message.message}</Markdown>
                </div>
            </DialogContent>
        </Dialog>
    );
}
