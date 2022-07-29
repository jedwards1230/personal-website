import styles from './Projects.module.css';
import AspectRatio from '@mui/joy/AspectRatio';
import Link from '@mui/joy/Link';
import Card from '@mui/joy/Card';
import CardOverflow from '@mui/joy/CardOverflow';
import { Grid } from '@mui/material';
import { Sheet, Typography } from '@mui/joy';
import ImageIcon from '@mui/icons-material/Image';

const Projects = () => {
    return (
        <>
            <div className={styles.title}>
                <Link
                    color="neutral"
                    underline="none"
                    variant="plain"
                    href="//www.github.com/jedwards1230">Projects</Link>
            </div>
            <div className={styles.icons}>
                <Grid container columns={2} rowSpacing={4} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={2} sm={1}>
                        <Item
                            title='Daily ArXiv'
                            desc='Quickly browse ArXiv by date and subject' />
                    </Grid>
                    <Grid item xs={2} sm={1}>
                        <Item
                            title='Smart Cars'
                            desc=' A small game to learn ML concepts ' />
                    </Grid>
                    <Grid item xs={2} sm={1}>
                        <Item
                            title='Project'
                            desc='Description' />
                    </Grid>
                    <Grid item xs={2} sm={1}>
                        <Item
                            title='Project'
                            desc='Description' />
                    </Grid>
                </Grid>
            </div>
        </>
    )
}

const Item = (props: {
    title: string
    desc: string
}) => {
    return (
        <Card
            variant="plain"
            sx={{
                padding: 2,
                backgroundColor: 'rgba(25, 25, 25, 0.85)',
            }}>
            <Sheet>
                <Typography>{props.title}</Typography>
            </Sheet>
            <CardOverflow>
                <AspectRatio
                    ratio={16 / 10}
                    variant="outlined"
                    minHeight="200px"
                    maxHeight="200px"
                    sx={{ my: 2 }}>
                    <Typography level="h2" component="div">
                        <ImageIcon sx={{ color: 'text.tertiary' }} />
                    </Typography>
                </AspectRatio>
            </CardOverflow>
            <Typography>{props.desc}</Typography>
        </Card>
    )
}

export default Projects