import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import TemplateSelector from './TemplateSelector';
import JobSelector from './JobSelector';
import { AddButton, ListItem, Section } from '../UIHelpers';
import JobDialog from '@/components/dialogs/admin/JobDialog';

export default function TemplateSettings({
    children,
    activeForm,
    setForm,
    activeJob,
    jobs,
    setJob,
}: {
    children: React.ReactNode;
    activeForm: Forms;
    setForm: (form: Forms) => void;
    activeJob: Job | null;
    jobs: Job[];
    setJob: (id: number) => void;
}) {
    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="max-h-screen overflow-y-scroll transition-all sm:max-h-[95%] sm:max-w-xl md:max-w-2xl lg:max-w-3xl">
                <DialogHeader>
                    <DialogTitle>Template Settings</DialogTitle>
                </DialogHeader>
                <TemplateSelector
                    activeForm={activeForm}
                    setActiveForm={setForm}
                />
                {activeForm === 'Assistant' && <></>}
                {activeForm === 'Cover Letter' && <></>}
                {activeForm === 'Interview' && (
                    <JobSelector
                        jobs={jobs}
                        activeJob={activeJob}
                        setActiveJob={setJob}
                    />
                )}
                <Section
                    title="Jobs"
                    addButtonDialog={
                        <JobDialog>
                            <AddButton />
                        </JobDialog>
                    }
                >
                    {jobs.length > 0 ? (
                        jobs.map((job, i) => (
                            <JobDialog job={job} key={'job-' + i}>
                                <ListItem>
                                    <div className="flex justify-between px-1">
                                        <div>{job.company}</div>
                                        <div>{job.title}</div>
                                    </div>
                                </ListItem>
                            </JobDialog>
                        ))
                    ) : (
                        <p>No jobs saved</p>
                    )}
                </Section>
            </DialogContent>
        </Dialog>
    );
}
