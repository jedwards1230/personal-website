import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import { NoSsr } from '@mui/material'

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<NoSsr>
			<ThemeProvider defaultTheme="system">
				<Component {...pageProps} />
			</ThemeProvider>
		</NoSsr>
	)
}

export default MyApp
