import { Grid } from "@mui/material"
import Link from "next/link"
import styles from "./Intro.module.css"
import Sheet from '@mui/joy/Sheet'
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';


const Intro = (props: {
    reset: () => void
}) => {
    return (
        <>
            <h1 className={styles.title} onClick={props.reset}>
                <Link href="/">Justin Edwards</Link>
            </h1>
            <div className={styles.icons}>
                <a href="//www.github.com/jedwards1230" target="_blank" rel="noreferrer">
                    <GitHubIcon />
                </a>
                <a href="//www.linkedin.com/in/justinedwards1230/" target="_blank" rel="noreferrer">
                    <LinkedInIcon />
                </a>
                <a href="mailto:justinedwards1230@gmail.com" target="_blank" rel="noreferrer">
                    <AlternateEmailIcon />
                </a>
            </div>
        </>
    )
}

export default Intro