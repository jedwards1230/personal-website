import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import '../styles/globals.css'
import { Amplify, Analytics } from 'aws-amplify';
import config from '../aws-exports';
import { useState, useEffect } from 'react';

Amplify.configure({
	...config, ssr: true
});

Analytics.record({
	name: 'pageVisit',
	immediate: true
});

Analytics.autoTrack('pageView', {
    enable: true,
    eventName: 'pageView',
    attributes: {
        attr: 'attr'
    },
    type: 'multiPageApp',
    provider: 'AWSPinpoint',
    getUrl: () => {
        // the default function
        return window.location.origin + window.location.pathname;
    }
});

Analytics.autoTrack('event', {
    enable: true,
    events: ['click'],
    // OPTIONAL, the prefix of the selectors, by default is 'data-amplify-analytics-'
    // in order to avoid collision with the user agent, according to https://www.w3schools.com/tags/att_global_data.asp
    // always put 'data' as the first prefix
    selectorPrefix: 'data-amplify-analytics-',
    provider: 'AWSPinpoint',
    attributes: {
        attr: 'attr'
    }
});

Analytics.autoTrack('session', {
	enable: true,
	attributes: {
		attr: 'attr'
	},
	provider: 'AWSPinpoint'
});

function MyApp({ Component, pageProps }: AppProps) {
	// fix initial page load flash of unstyled content
	const [mounted, setMounted] = useState(false)
	useEffect(() => setMounted(true), [])

	return (
		<ThemeProvider disableTransitionOnChange>
			<Component {...pageProps} />
		</ThemeProvider>
	)
}

export default MyApp
