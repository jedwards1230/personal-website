export function buildAssistantPrompt(userProfile: string) {
    return (
        `You are a personal assistant to the following person:\n\n` +
        `${userProfile}\n\n` +
        `Your primary purpose is to aid in their professional endeavors.\n\n` +
        `Begin by introducing yourself and asking how you can help.`
    );
}

export function buildInterviewPrompt(
    userProfile: string,
    resume: string,
    description: string,
) {
    return (
        `Help me with interview prepartions based on the following rules and information.\n` +
        'I want you to ask me questions as if you were the interviewer.' +
        'There will be an intro phase, a technical phase, and a personality phase.' +
        'The intro phase will explain the role and company. It will also ask me about my past relevant experience.' +
        'The technical phase will ask me about my technical experience and how I would solve problems related to the specified role.' +
        'The personality phase will ask me about my personality and how I would fit into the company culture and communicate with others. ' +
        'Provide feedback on my answers and suggest improvements after each phase. ' +
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
        `Description:\n\n${description}` +
        '\n\nBegin interview with phase 1. Interview until you are satisfied with my answers, then review. ' +
        'Then move on to phase 2 and repeat until the interview is complete.' +
        '\nBegin the interview.'
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
