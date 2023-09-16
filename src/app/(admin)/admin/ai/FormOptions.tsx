'use client';

import { useState } from 'react';

import CoverForm from './CoverForm';
import ChatDialog from './ChatDialog';
import { Button } from '@/components/ui/button';
import TemplateSelector from './TemplateSelector';
import InterviewForm from './InterviewForm';

export default function FormOptions({
    experiences,
    about,
}: {
    experiences: Experience[];
    about: About;
}) {
    const [message, setMessage] = useState<Message | null>(null);
    const [activeForm, setActiveForm] = useState<Forms>('Cover Letter');

    const props = {
        setMessage: (msg: string) =>
            setMessage({
                id: 0,
                role: 'system',
                content: msg,
            }),
        submitButton: (
            <ChatDialog
                initialMessage={message}
                onClose={() => setMessage(null)}
            >
                <Button type="submit">Generate</Button>
            </ChatDialog>
        ),
    };

    return (
        <>
            <TemplateSelector
                activeForm={activeForm}
                setActiveForm={setActiveForm}
            />
            {activeForm === 'Cover Letter' && (
                <CoverForm {...props} experiences={experiences} about={about} />
            )}
            {activeForm === 'Interview' && (
                <InterviewForm
                    {...props}
                    experiences={experiences}
                    about={about}
                />
            )}
        </>
    );
}
