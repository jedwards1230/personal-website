import { useFilter } from '@/FilterProvider';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { projects } from '@/data';
import { Funnel } from './Icons';
import { Input } from './ui/input';
import { Checkbox } from './ui/checkbox';

export default function FilterPopover() {
    const {
        companyFilter,
        clientFilter,
        yearFilter,
        tagFilter,
        filterCompany,
        removeCompanyFilter,
        filterClient,
        removeClientFilter,
        filterYear,
        removeYearFilter,
        filterTag,
        removeTagFilter,
    } = useFilter();

    const companyOptions: string[] = [];
    const clientOptions: string[] = [];
    const yearOptions: number[] = [];
    const tagOptions: string[] = [];

    projects.forEach((project) => {
        if (!companyOptions.includes(project.company)) {
            companyOptions.push(project.company);
        }
        if (project.client && !clientOptions.includes(project.client)) {
            clientOptions.push(project.client);
        }
        if (!yearOptions.includes(project.year)) {
            yearOptions.push(project.year);
        }
        project.tags.forEach((tag) => {
            if (!tagOptions.includes(tag)) {
                tagOptions.push(tag);
            }
        });
    });

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" size="icon">
                    <Funnel />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="bg-background">
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-2 pb-2">
                        Company
                        <div className="flex max-h-28 flex-col gap-1 overflow-y-scroll rounded border border-border p-1">
                            {companyOptions.map((option) => (
                                <div className="flex gap-2" key={option}>
                                    <Checkbox
                                        id={'company-filter-' + option}
                                        checked={companyFilter.includes(option)}
                                        onCheckedChange={() => {
                                            if (
                                                companyFilter.includes(option)
                                            ) {
                                                removeCompanyFilter(option);
                                            } else {
                                                filterCompany(option);
                                            }
                                        }}
                                    />
                                    <Label htmlFor={'company-filter-' + option}>
                                        {option}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 pb-2">
                        Client
                        <div className="flex max-h-28 flex-col gap-1 overflow-y-scroll rounded border border-border p-1">
                            {clientOptions.map((option) => (
                                <div className="flex gap-2" key={option}>
                                    <Checkbox
                                        id={'client-filter-' + option}
                                        checked={clientFilter.includes(option)}
                                        onCheckedChange={() => {
                                            if (clientFilter.includes(option)) {
                                                removeClientFilter(option);
                                            } else {
                                                filterClient(option);
                                            }
                                        }}
                                    />
                                    <Label htmlFor={'client-filter-' + option}>
                                        {option}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 pb-2">
                        Year
                        <div className="flex max-h-28 flex-col gap-1 overflow-y-scroll rounded border border-border p-1">
                            {yearOptions.map((option) => (
                                <div className="flex gap-2" key={option}>
                                    <Checkbox
                                        id={'year-filter-' + option}
                                        checked={yearFilter.includes(option)}
                                        onCheckedChange={() => {
                                            if (yearFilter.includes(option)) {
                                                removeYearFilter(option);
                                            } else {
                                                filterYear(option);
                                            }
                                        }}
                                    />
                                    <Label htmlFor={'year-filter-' + option}>
                                        {option}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex grid-cols-3 flex-col gap-2 pb-2">
                        Tags
                        <div className="flex max-h-28 flex-col gap-1 overflow-y-scroll rounded border border-border p-1">
                            {tagOptions.map((option) => (
                                <div className="flex gap-2" key={option}>
                                    <Checkbox
                                        id={'tag-filter-' + option}
                                        checked={tagFilter.includes(option)}
                                        onCheckedChange={() => {
                                            if (tagFilter.includes(option)) {
                                                removeTagFilter(option);
                                            } else {
                                                filterTag(option);
                                            }
                                        }}
                                    />
                                    <Label htmlFor={'tag-filter-' + option}>
                                        {option}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}
