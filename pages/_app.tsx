import type { AppProps } from 'next/app'
import { CssBaseline, NoSsr } from '@mui/material'
import { CssVarsProvider } from '@mui/joy'
import theme from '../styles/theme'
import '../styles/globals.css'


function MyApp({ Component, pageProps }: AppProps) {
	return (
		<NoSsr>
			<CssVarsProvider defaultMode="system" theme={theme}>
				<CssBaseline />
				<Component {...pageProps} />
			</CssVarsProvider>
		</NoSsr>
	)
}

export default MyApp
