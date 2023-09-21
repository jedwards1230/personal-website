'use client';

import { useState } from 'react';
import { Settings } from 'lucide-react';

import TemplateSelector from './TemplateSelector';
import Chat from './Chat';
import { buildPrompt } from './prompts';
import { Button } from '@/components/ui/button';
import TemplateSettings from './TemplateSettings';
import { Label } from '@/components/ui/label';

export default function Assistant({
    experiences,
    projects,
    about,
    jobs,
}: {
    experiences: Experience[];
    projects: Project[];
    about: About;
    jobs: Job[];
}) {
    const [activeForm, setActiveForm] = useState<Forms>('Assistant');
    const [activeJob, setActiveJob] = useState<Job | null>(null);
    const [interviewPhase, setInterviewPhase] =
        useState<InterviewPhase>('Initial');

    const systemMessage = {
        id: 0,
        role: 'system' as const,
    };

    const promptProps = {
        form: activeForm,
        about,
        experiences,
        activeJob,
        interviewPhase,
    };

    const [message, setMessage] = useState<Message | null>({
        ...systemMessage,
        content: buildPrompt(promptProps),
    });

    const setForm = (form: Forms) => {
        setActiveForm(form);
        setMessage({
            ...systemMessage,
            content: buildPrompt({
                ...promptProps,
                form,
            }),
        });
    };

    const setJob = (id: number) => {
        const job = jobs.find((job) => job.id === id) ?? null;
        setActiveJob(job);
        setMessage({
            ...systemMessage,
            content: buildPrompt({
                ...promptProps,
                form: activeForm,
                activeJob: job,
            }),
        });
    };

    const setPhase = (phase: InterviewPhase) => {
        setInterviewPhase(phase);
        setMessage({
            ...systemMessage,
            content: buildPrompt({
                ...promptProps,
                form: activeForm,
                interviewPhase: phase,
            }),
        });
    };

    return (
        <>
            <div className="flex items-end justify-between">
                <div>
                    <Label>Active Job:</Label>{' '}
                    <p>{activeJob ? activeJob.company : 'None'}</p>
                </div>
                <div className="flex items-end justify-end gap-4 px-1">
                    <TemplateSelector
                        activeForm={activeForm}
                        setActiveForm={setForm}
                    />
                    <TemplateSettings
                        activeForm={activeForm}
                        setForm={setForm}
                        activeJob={activeJob}
                        jobs={jobs}
                        setJob={setJob}
                        interviewPhase={interviewPhase}
                        setInterviewPhase={setPhase}
                    >
                        <Button variant="outline" size="icon">
                            <Settings />
                        </Button>
                    </TemplateSettings>
                </div>
            </div>
            <Chat initialMessage={message} />
        </>
    );
}
