import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import { GoogleAnalytics, usePageViews } from "nextjs-google-analytics";
import '../globals.css'
import { useState, useEffect } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
	usePageViews();
	const [isMounted, setIsMounted] = useState(false);
	useEffect(() => {
		setIsMounted(true);
	}, []);
	if (!isMounted) return null;

	return (
		<ThemeProvider disableTransitionOnChange>
			<GoogleAnalytics strategy='lazyOnload' />
			<Component {...pageProps} />
		</ThemeProvider>
	)
}

export default MyApp
