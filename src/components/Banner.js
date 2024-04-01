import { Typography, Box, Grid } from '@mui/material';
import dp3 from '../assets/dp3.jpg';
import dp1 from '../assets/dp1.png';

export default function Banner({
    isMobile, 
    middleBanner,
    rightBanner,
    leftBanner
}) {
    return(
            <Box className="containerBox">
                <Box className="text-box">
                    {isMobile ? 
                    <Typography variant='h6' className="banner-title">SHARP AT HEART, SHARP WIT AND STUPID</Typography>
                    :
                    <Typography variant='h3' className="banner-title">SHARP AT HEART, SHARP WIT AND STUPID</Typography>}
                    <Typography className="banner-text" >My body is a temple. I believe in keeping both body and spirit in perfect harmony through an active lifestyle. Staying active isn't just a hobby; it's a way of life for me.</Typography>
                </Box>
                <Grid container spacing={0}>
                    <Grid item md={4}>
                        <img src={leftBanner} className='banner-img' height='500px' width='100%'/>
                    </Grid>
                    <Grid item md={4}>
                        <img src={middleBanner} className='banner-img' height='500px' width='100%'/>
                    </Grid>
                    <Grid item md={4}>
                        <img src={rightBanner} className='banner-img' height='500px' width='100%'/>
                    </Grid>
                </Grid>

                
            </Box>
        )
}




