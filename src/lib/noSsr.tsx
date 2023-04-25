import dynamic from 'next/dynamic';
import React from 'react';

type NoSsrProps = {
    children: React.ReactNode;
};

const NoSsr = (props: NoSsrProps) => <>{props.children}</>;

export default dynamic(() => Promise.resolve(NoSsr), {
    ssr: false,
});
