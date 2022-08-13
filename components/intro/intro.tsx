import NextLink from "next/link"
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import styles from './Intro.module.css';


const Intro = (props: {
    reset: () => void
}) => {
    return (
        <>
            <NextLink href="/" passHref>
                <a 
                    className={styles.header} 
                    onClick={props.reset}
                    >Justin Edwards</a>
            </NextLink>
            <div className={styles.icons}>
                <a
                    href="//www.github.com/jedwards1230"
                    target="_blank"
                    rel="noreferrer">
                    <GitHubIcon />
                </a>
                <a
                    href="//www.linkedin.com/in/justinedwards1230"
                    target="_blank"
                    rel="noreferrer">
                    <LinkedInIcon />
                </a>
                <a
                    href="mailto:justinedwards1230@gmail.com"
                    target="_blank"
                    rel="noreferrer">
                    <AlternateEmailIcon />
                </a>
            </div>
        </>
    )
}

export default Intro