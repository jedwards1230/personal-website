import NextLink from "next/link"
import Image from "next/image";
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
                    <Image
                        src="/github-brands.svg"
                        alt='Github Icon'
                        className={styles.icon}
                        height={30}
                        width={30} />
                </a>
                <a
                    href="//www.linkedin.com/in/justinedwards1230"
                    target="_blank"
                    rel="noreferrer">
                    <Image
                        src="/linkedin-brands.svg"
                        alt='LinkedIn Icon'
                        className={styles.icon}
                        height={30}
                        width={30} />
                </a>
                <a
                    href="mailto:justinedwards1230@gmail.com"
                    target="_blank"
                    rel="noreferrer">
                    <Image
                        src="/at-solid.svg"
                        alt='Email Icon'
                        className={styles.icon}
                        height={30}
                        width={30} />
                </a>
            </div>
        </>
    )
}

export default Intro