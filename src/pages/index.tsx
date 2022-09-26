import type { NextPage } from 'next'
import Head from 'next/head'
import Game from '../components/gameComponent'
//import Game from '../components/pixi/game'
import { useEffect, useState } from 'react';
import useWindowSize from '../../scripts/windowSize';
import Intro from '../components/intro';
import NoSsr from '../../scripts/noSsr';

const Home: NextPage = () => {
	const [idx, setIdx] = useState(0);
	const size = useWindowSize();

	// reset the game when the window size changes
	const reset = () => setIdx(idx + 1);

	useEffect(() => {
		reset()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [size]);

	return (
		<>
			<NoSsr>
				<Game key={idx} />
			</NoSsr>
			<div className='overflow-hidden snap-y h-screen w-screen'>
				<Head>
					<title>J. Edwards</title>
					<meta name="description" content="Personal website for Justin Edwards" />
					<link rel="icon" href="/favicon.ico" />
				</Head>

				<main>
					<PageSection>
						<Intro reset={reset} />
					</PageSection>
				</main>
			</div>
		</>
	)
}

const PageSection = (props: { children: React.ReactNode }) => {
	return (
		<div className='snap-start min-h-screen w-screen'>
			<div className='h-screen flex flex-col justify-center items-center text-center relative'>
				{props.children}
			</div>
		</div>
	)
}

export default Home
