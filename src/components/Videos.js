import { useState, useEffect } from 'react';
import { listToMatrix } from '../utils/utilities';
import { Box, Grid, Typography } from '@mui/material';

export default function Videos({videos}) {
    
    const [vids, setVids] = useState([])

    useEffect(() => {
        if (videos.length > 0) {
          const matrixes = listToMatrix(videos, 3);
          setVids(matrixes);
        } else {
          setVids([]);
        }
      }, [videos]);

    return(
        <Box className="aboutBox">
            <Box className="about-container">
                <Box className="resourceBox" sx={{borderTopLeftRadius: '139px'}}>
                    <Box className="video-container">
                        <Typography variant='h5' className="banner-title" color={'#921712'}>OUR VIDEOS</Typography>             
                         <Box sx={{padding:'20px', width:'90%', marginTop:'50px', lineHeight:'50px', 
                        border:'4mm ridge #ddf6e7', height:'540px', overflowY:'scroll'}} >
                    
                            
                    {vids.map((arr, ind) => {
                        return (
                            <Grid container key={ind}  spacing={3} rowGap={3} justifyContent={'space-around'}>
                            {arr.map((vid, index) => {
                                return (
                                    <Grid item md={4} key={index}>
                                        <video width="300" controls>
                                        <source
                                        src={vid}
                                        type="video/mp4"
                                        />
                                    </video>
                                    </Grid>
                                );
                            })}
                            </Grid>
                        );
                })}


                       </Box>
                 </Box>
             </Box>

        </Box>
    </Box>

    )
}




