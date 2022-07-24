import Grid from '@mui/material/Grid'
import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import Box from '@mui/material/Box'
import Link from 'next/link'
import Game from '../components/gameoflife/game'

const Home: NextPage = () => {
	return (
		<>
			<div className={styles.game}>
				<Game />
			</div>
			<div className={styles.container}>
				<Head>
					<title>J. Edwards</title>
					<meta name="description" content="Personal website for Justin Edwards" />
					<link rel="icon" href="/favicon.ico" />
				</Head>

				<main className={styles.main}>
					<Grid
						container
						justifyContent="center"
						alignItems="center">
						<Grid item xs={8} style={{ maxHeight: '100vh', overflow: 'auto' }}>
							<LeftColumn />
						</Grid>
						<Grid item xs={4}>
							<RightColumn />
						</Grid>
					</Grid>
				</main>
			</div>
		</>
	)
}

const RightColumn = () => {
	return (
		<div className={styles.rightColumn} >
			<p className={styles.description}>
				<a href="//dailyarxiv.jedwards.cc" target="_blank" rel="noreferrer">
					Daily Arxiv
				</a> - Description
			</p>

			<p className={styles.description}>
				<a href="//cars.jedwards.cc" target="_blank" rel="noreferrer">
					Smart Cars
				</a> - Description
			</p>
		</div>
	)
}

const LeftColumn = () => {
	return (
		<div className={styles.leftColumn}>
			<Box>
				<h1 className={styles.title}>
					<Link href="/">Justin Edwards</Link>
				</h1>
				<a href="//www.github.com/jedwards1230" target="_blank" rel="noreferrer">
					<GitHubIcon />
				</a>
				<a href="//www.linkedin.com/in/justinedwards1230/" target="_blank" rel="noreferrer">
					<LinkedInIcon />
				</a>
				<a href="mailto:justinedwards1230@gmail.com" target="_blank" rel="noreferrer">
					<AlternateEmailIcon />
				</a>
			</Box>
		</div>
	)
}

export default Home
