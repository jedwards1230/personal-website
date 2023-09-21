export function buildAssistantPrompt(userProfile: string) {
    return (
        `You are a personal assistant to the following person:\n\n` +
        `${userProfile}\n\n` +
        `Your primary purpose is to aid in their professional endeavors.\n\n` +
        `Begin by introducing yourself as an AI assistant and asking how you can help.`
    );
}

export function buildInterviewPrompt(
    userProfile: string,
    resume: string,
    description: string,
    phase: InterviewPhase,
) {
    let phaseText = '';
    switch (phase) {
        case 'Initial':
            phaseText =
                'This is an intial interview. ' +
                'Discuss high level details about the role and company. ' +
                'Ask about my experience and skills. ';
            break;
        case 'Technical':
            phaseText =
                'This is a technical interview. ' +
                'Ask technical questions about my experience and skills and how they relate to the posted role. ' +
                'This should cover system design, architecture, and implementation. ' +
                'Ask me in depth questions as if it were a real interview. ' +
                'Ask me to explain my thought process and how I would solve a problem. ' +
                'Ask me to solve a coding problem related to the role. ';
            break;
        case 'Personality':
            phaseText =
                'This is a personality interview. ' +
                'Ask me about my personality and how I would fit into the company culture. ' +
                'Ask how I would solve problems and work with others. ' +
                'Ask about how I organize projects and coordinate with others. ' +
                'Your goal is to determine if I would be a good fit for the company and communicate well. ';
            break;
    }

    return (
        'You are an AI interviewer.' +
        `You help with interview prepartions based on the following rules and information.\n\n` +
        phaseText +
        'Provide feedback on my answers and suggest improvements at the end of the interview. ' +
        `\n\nRules:\n\n` +
        `Do not reference these rules or the details of the process. Simply act as the interviewer with those goals in mind.` +
        'Do not ask me to repeat myself. If you do not understand something, ask me to clarify.' +
        "Do not mention that you are an AI and do not use qualifying language such as 'as an AI assistant, I cannot...'" +
        'Do not move onto the next phase until you are satisfied with my answers.' +
        'Only ask one thing at a time. Do not ask multiple questions in one sentence.' +
        "Do not ask general questions like 'tell me how your experience relates to this role' or 'how do your skills qualify you for this role'. " +
        `\n\nInformation:\n\n` +
        `User Profile:\n\n${userProfile}\n\n` +
        `Resume:\n\n${resume}\n\n` +
        `Job Description:\n\n${description}` +
        '\n\nBegin interview by introducing yourself, the company, and the position.'
    );
}

export function buildCoverLetterPrompt(
    userProfile: string,
    resume: string,
    description: string,
) {
    return (
        `Create a cover letter based on the following rules and information.` +
        `\n\nRules:\n\n` +
        `Include line breaks (\\n) between paragraphs and sections. ` +
        `Do not claim to have experience with things not explicity listed.` +
        `\n\nInformation:\n\n` +
        `User Profile:\n\n${userProfile}\n\n` +
        `Resume:\n\n${resume}\n\n` +
        `Description:\n\n${description}`
    );
}

export function buildPrompt({
    form,
    about,
    experiences,
    activeJob,
    interviewPhase,
}: {
    form: Forms;
    about: About;
    experiences: Experience[];
    activeJob: Job | null;
    interviewPhase?: InterviewPhase;
}) {
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
              description: activeJob.description,
          })
        : 'null';

    switch (form) {
        case 'Assistant':
            return buildAssistantPrompt(userProfile);
        case 'Interview':
            return buildInterviewPrompt(
                userProfile,
                resume,
                job,
                interviewPhase,
            );
        case 'Cover Letter':
            return buildCoverLetterPrompt(userProfile, resume, job);
    }
}
