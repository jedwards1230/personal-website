import NextLink from "next/link"
import { EmailIcon, GithubIcon, LinkedInIcon } from "./icons";

type IntroProps = {
    reset: () => void
}

const Intro = (props: IntroProps) => {
    return (
        <>
            <NextLink href="/" passHref>
                <a
                    className='text-black text-7xl font-medium pb-4 my-0 mx-4 text-center underline decoration-black/50 hover:decoration-black/100 dark:text-white dark:decoration-white/50 dark:hover:decoration-white/100'
                    onClick={props.reset}
                >Justin Edwards</a>
            </NextLink>
            <div className='fill-black dark:fill-white flex justify-between w-48 mt-2'>
                <a
                    className='transition ease-in-out duration-200 transform hover:scale-125'
                    href="//www.github.com/jedwards1230"
                    target="_blank"
                    rel="noreferrer">
                    <GithubIcon width={30} height={30} />
                </a>
                <a
                    className='transition ease-in-out duration-200 transform hover:scale-125'
                    href="//www.linkedin.com/in/justinedwards1230"
                    target="_blank"
                    rel="noreferrer">
                    <LinkedInIcon width={30} height={30} />
                </a>
                <a
                    className='transition ease-in-out duration-200 transform hover:scale-125'
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