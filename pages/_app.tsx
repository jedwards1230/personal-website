import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import { GoogleAnalytics, usePageViews } from "nextjs-google-analytics";
import '../styles/globals.css'

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
