import Grid from '@mui/material/Grid'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
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
						<Grid item xs={6} style={{ maxHeight: '100vh', overflow: 'auto' }}>
							<LeftColumn />
						</Grid>
						<Grid item xs={6}>
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
			<p className={styles.header}>
				Header
			</p>
			<p className={styles.description}>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
			</p>
			<p className={styles.header}>
				Header
			</p>
			<p className={styles.description}>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
			</p>
			<p className={styles.header}>
				Header
			</p>
			<p className={styles.description}>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
			</p>
		</div>
	)
}

const LeftColumn = () => {
	return (
		<div className={styles.leftColumn}>
			<h1 className={styles.title}>
				<Link href="/">Justin Edwards</Link>
			</h1>
			<Box>
				<a href="//www.github.com/jedwards1230" target="_blank" rel="noreferrer">
					<GitHubIcon />
				</a>
				<a href="//www.linkedin.com/in/justinedwards1230/" target="_blank" rel="noreferrer">
					<LinkedInIcon />
				</a>
				<a href="#" target="_blank" rel="noreferrer">
					<AlternateEmailIcon />
				</a>
			</Box>
			<p className={styles.description}>
				Subheader
			</p>
		</div>
	)
}

export default Home
