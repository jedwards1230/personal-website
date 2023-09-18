import JobView from './JobView';
import { GenericDialog } from './GenericDialog';
import JobForm from '@/components/forms/admin/JobForm';

export default function JobDialog({
    children,
    job,
}: {
    children: React.ReactNode;
    job?: Job;
}) {
    return (
        <GenericDialog
            dataType="job"
            FormComponent={JobForm}
            ViewComponent={JobView}
            data={job}
        >
            {children}
        </GenericDialog>
    );
}
