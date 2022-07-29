import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Game from '../components/gameoflife/game'
import { useEffect, useState } from 'react';
import useWindowSize from '../scripts/windowSize';
import Intro from '../components/intro/intro';

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
			<div className={styles.game}>
				<Game key={idx} />
			</div>
			<div className={styles.container}>
				<Head>
					<title>J. Edwards</title>
					<meta name="description" content="Personal website for Justin Edwards" />
					<link rel="icon" href="/favicon.ico" />
				</Head>

				<main className={styles.main}>
					<Intro reset={reset} />
				</main>
			</div>
		</>
	)
}



export default Home
