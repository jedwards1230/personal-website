import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Game from '../components/gameoflife/game'
import { useState } from 'react';
import { ThemeProvider } from 'next-themes'

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<ThemeProvider defaultTheme="system">
				<Component {...pageProps} />
			</ThemeProvider>
		</>
	)
}

export default MyApp
