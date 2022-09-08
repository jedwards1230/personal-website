import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import { GoogleAnalytics, usePageViews } from "nextjs-google-analytics";
import '../styles/globals.css'
import Amplify from 'aws-amplify';
import config from '../aws-exports';

Amplify.configure({
  ...config, ssr: true
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
