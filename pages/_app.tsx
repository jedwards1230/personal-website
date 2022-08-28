import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import { GoogleAnalytics, usePageViews } from "nextjs-google-analytics";
import '../styles/globals.css'
import NoSsr from '../scripts/noSsr';

function MyApp({ Component, pageProps }: AppProps) {
	usePageViews();

	return (
		<ThemeProvider disableTransitionOnChange>
			<NoSsr>
				<GoogleAnalytics strategy='lazyOnload' />
				<Component {...pageProps} />
			</NoSsr>
		</ThemeProvider>
	)
}

export default MyApp
