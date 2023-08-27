'use client';

import { useEffect } from 'react';

import Modal from '@/components/Modal';
import ProjectList from '@/components/ProjectList';

export default function Page() {
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
