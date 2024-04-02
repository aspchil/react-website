import { Typography, Box, Grid } from '@mui/material';

export default function About({isMobile}) {
    return(
        <Box className="aboutBox">
            <Box className="about-container">
                <Typography variant='h5' className="banner-title">ABOUT ME</Typography>
                            <br/>
                <Typography className="about-text" >I have a profound love for not reading , and you'll often find me exploring the great outdoors through activities like hiking,  dancing and  meditation, and martial arts. and i love fucking big idiots in teh woods lol</Typography>
                <br/>
                <Grid container display={'flex'} height={'auto'} justifyContent={`${isMobile ? 'space-between' : 'space-around'}`}>
                    <Grid item>
                        <Typography className="about-text">Age • Birthday ............  20 • Nov 2005</Typography>
                        <Typography className="about-text">Height ............ 5'0"</Typography>
                        <Typography className="about-text">Intimates ............ 38G • Hourglass</Typography>
                        <Typography className="about-text">Dress ............ 2-3 • small</Typography>
                        <Typography className="about-text">Shoe ............ 5</Typography>
                        <Typography className="about-text">Vaccine ............ Fully vaccinated</Typography>
                    </Grid>
                    <Grid item >
                        <Typography className="about-text">Star Sign ............  Sagitarius</Typography>
                        <Typography className="about-text">Music ...... Psychedelic rock, disco</Typography>
                        <Typography className="about-text">Literature ...... Short story,  graphic novels</Typography>
                        <Typography className="about-text">Cuisine: spanish</Typography>
                        <Typography className="about-text">Pastimes .....  burlesque, writing, video games,fuck</Typography>
                        <Typography className="about-text">Small Pleasures ...... , fresh flowers and fuck</Typography>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}




