import NextLink from "next/link"
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import { Link } from "@mui/material";
import { Box } from "@mui/material";


const Intro = (props: {
    reset: () => void
}) => {
    const linkIcon = {
        padding: '0.25rem 0.5rem'
    }

    const header = {
        fontSize: '4rem',
        pb: 1,
        m: 0,
    }

    return (
        <>
            <NextLink href="/" passHref>
                <Link
                    color='common.white'
                    onClick={props.reset}
                    sx={header}>Justin Edwards</Link>
            </NextLink>
            <Box sx={{ color: 'common.white' }}>
                <Link
                    href="//www.github.com/jedwards1230"
                    target="_blank"
                    rel="noreferrer"
                    color="inherit"
                    sx={linkIcon}>
                    <GitHubIcon />
                </Link>
                <Link
                    href="//www.linkedin.com/in/justinedwards1230"
                    target="_blank"
                    rel="noreferrer"
                    color="inherit"
                    sx={linkIcon}>
                    <LinkedInIcon />
                </Link>
                <Link
                    href="mailto:justinedwards1230@gmail.com"
                    target="_blank"
                    rel="noreferrer"
                    color="inherit"
                    sx={linkIcon}>
                    <AlternateEmailIcon />
                </Link>
            </Box>
        </>
    )
}

export default Intro