import NextLink from "next/link"
import styles from './Intro.module.css';
import { EmailIcon, GithubIcon, LinkedInIcon } from "../icons";

type IntroProps = {
    reset: () => void
}

const Intro = (props: IntroProps) => {
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
                    <GithubIcon width={30} height={30} />
                </a>
                <a
                    href="//www.linkedin.com/in/justinedwards1230"
                    target="_blank"
                    rel="noreferrer">
                    <LinkedInIcon width={30} height={30} />
                </a>
                <a
                    href="mailto:justinedwards1230@gmail.com"
                    target="_blank"
                    rel="noreferrer">
                        <EmailIcon width={30} height={30} />
                </a>
            </div>
        </>
    )
}

export default Intro