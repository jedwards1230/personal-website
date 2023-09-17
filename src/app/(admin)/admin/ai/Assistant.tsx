'use client';

import { useState } from 'react';
import { Settings } from 'lucide-react';

import TemplateSelector from './TemplateSelector';
import Chat from './Chat';
import {
    buildAssistantPrompt,
    buildCoverLetterPrompt,
    buildInterviewPrompt,
} from './prompts';
import { Button } from '@/components/ui/button';
import TemplateSettings from './TemplateSettings';

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
    const [activeJob, setActiveJob] = useState<Job | null>(
        jobs.length > 0 ? jobs[0] : null,
    );

    const [message, setMessage] = useState<Message | null>({
        id: 0,
        role: 'system',
        content: buildPrompt(activeForm, about, experiences, activeJob),
    });

    const setForm = (form: Forms) => {
        setActiveForm(form);
        setMessage({
            id: 0,
            role: 'system',
            content: buildPrompt(form, about, experiences, activeJob),
        });
    };

    const setJob = (id: number) => {
        const job = jobs.find((job) => job.id === id) ?? null;
        setActiveJob(job);
        setMessage({
            id: 0,
            role: 'system',
            content: buildPrompt(activeForm, about, experiences, job),
        });
    };

    return (
        <>
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
                >
                    <Button variant="outline" size="icon">
                        <Settings />
                    </Button>
                </TemplateSettings>
            </div>
            <Chat initialMessage={message} />
        </>
    );
}

function buildPrompt(
    form: Forms,
    about: About,
    experiences: Experience[],
    activeJob: Job,
) {
    const userProfile = JSON.stringify({
        name: about.name,
        title: about.title,
        location: about.location,
        ...(form === 'Cover Letter' && {
            email: about.email,
            phone: about.phone,
        }),
    });

    const resume = experiences
        .map((experience) =>
            JSON.stringify({
                title: experience.title,
                company: experience.company,
                period: experience.period,
                description: experience.description,
                tags: experience.tags,
            }),
        )
        .join('\n\n');

    const job = activeJob
        ? JSON.stringify({
              company: activeJob.company,
              title: activeJob.title,
              pay: activeJob.pay,
              ad: activeJob.ad,
          })
        : 'null';

    switch (form) {
        case 'Assistant':
            return buildAssistantPrompt(userProfile);
        case 'Interview':
            return buildInterviewPrompt(userProfile, resume, job);
        case 'Cover Letter':
            return buildCoverLetterPrompt(userProfile, resume, job, '');
    }
}
