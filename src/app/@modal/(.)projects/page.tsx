'use client';

import { useEffect } from 'react';

import ProjectList from '@/app/projects/ProjectList';
import Modal from '@/components/Modal';

export default function Page() {
    // on mount, get <main> element and disable scrolling
    // on unmount, enable scrolling

    useEffect(() => {
        const main = document.querySelector('main');
        if (main) {
            main.style.overflow = 'hidden';
        }
        return () => {
            if (main) {
                main.style.overflow = 'auto';
            }
        };
    }, []);

    return (
        <Modal>
            <ProjectList />
        </Modal>
    );
}
