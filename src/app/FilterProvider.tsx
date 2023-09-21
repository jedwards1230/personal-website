'use client';

import { usePlausible } from 'next-plausible';
import { createContext, useContext, useState } from 'react';

type FilterContextType = {
    companyFilter: string[];
    clientFilter: string[];
    yearFilter: number[];
    tagFilter: string[];
    filterCompany: (company: string) => void;
    removeCompanyFilter: (company: string) => void;
    filterClient: (client: string) => void;
    removeClientFilter: (client: string) => void;
    filterYear: (year: number) => void;
    removeYearFilter: (year: number) => void;
    filterTag: (tag: string) => void;
    removeTagFilter: (tag: string) => void;
    filterProjects: (p: Project) => boolean;
};

export const FilterContext = createContext<FilterContextType | undefined>(
    undefined,
);

export const useFilter = () => {
    const context = useContext(FilterContext);
    if (context === undefined) {
        throw new Error('useFilter must be used within a FilterProvider');
    }
    return context;
};

export default function FilterProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const plausible = usePlausible();
    const [companyFilter, setCompanyFilter] = useState<string[]>([]);
    const [clientFilter, setClientFilter] = useState<string[]>([]);
    const [yearFilter, setYearFilter] = useState<number[]>([]);
    const [tagFilter, setTagFilter] = useState<string[]>([]);

    const analyze = (prop: string) =>
        plausible('Filter', {
            props: {
                prop,
            },
        });

    const filterCompany = (company: string) => {
        if (companyFilter.includes(company)) return;
        setCompanyFilter([...companyFilter, company]);
        analyze(company);
    };

    const removeCompanyFilter = (company: string) => {
        setCompanyFilter(companyFilter.filter((c) => c !== company));
    };

    const filterClient = (client: string) => {
        if (clientFilter.includes(client)) return;
        setClientFilter([...clientFilter, client]);
        analyze(client);
    };

    const removeClientFilter = (client: string) => {
        setClientFilter(clientFilter.filter((c) => c !== client));
    };

    const filterYear = (year: number) => {
        if (yearFilter.includes(year)) return;
        setYearFilter([...yearFilter, year]);
        analyze(year.toString());
    };

    const removeYearFilter = (year: number) => {
        setYearFilter(yearFilter.filter((y) => y !== year));
    };

    const filterTag = (tag: string) => {
        if (tagFilter.includes(tag)) return;
        setTagFilter([...tagFilter, tag]);
        analyze(tag);
    };

    const removeTagFilter = (tag: string) => {
        setTagFilter(tagFilter.filter((t) => t !== tag));
    };

    const filterProjects = (p: Project) => {
        // filter by company
        if (companyFilter.length > 0 && !companyFilter.includes(p.company))
            return false;
        // filter by client
        if (clientFilter.length > 0 && !clientFilter.includes(p.client))
            return false;
        // filter by year
        if (yearFilter.length > 0 && !yearFilter.includes(p.year)) return false;
        // filter by tag
        if (
            tagFilter.length > 0 &&
            !tagFilter.every((t) => p.tags.includes(t))
        ) {
            return false;
        }

        return true;
    };

    return (
        <FilterContext.Provider
            value={{
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
                filterProjects,
            }}
        >
            {children}
        </FilterContext.Provider>
    );
}
