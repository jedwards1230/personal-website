import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import { GoogleAnalytics, usePageViews } from "nextjs-google-analytics";
import '../styles/globals.css'
import { Amplify, Analytics } from 'aws-amplify';
import config from '../aws-exports';

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
	// REQUIRED, turn on/off the auto tracking
	enable: true,
	// OPTIONAL, the attributes of the event, you can either pass an object or a function 
	// which allows you to define dynamic attributes
	attributes: {
		attr: 'attr'
	},
	// when using function
	// attributes: () => {
	//    const attr = somewhere();
	//    return {
	//        myAttr: attr
	//    }
	// },
	// OPTIONAL, the service provider, by default is the Amazon Pinpoint
	provider: 'AWSPinpoint'
});

function MyApp({ Component, pageProps }: AppProps) {
	usePageViews();

	return (
		<ThemeProvider disableTransitionOnChange>
			<GoogleAnalytics strategy='lazyOnload' />
			<Component {...pageProps} />
		</ThemeProvider>
	)
}

export default MyApp
