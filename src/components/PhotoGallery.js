import { useState, useEffect } from 'react';
import { listToMatrix } from '../utils/utilities';
import { Box, Grid } from '@mui/material';
import img4 from '../assets/img4.png';
import img3 from '../assets/img3.png';
import img2 from '../assets/img2.png';
import img1 from '../assets/img1.png';
import Image from './Image';

export default function PhotoGallery({gallery}) {
    const [photos, setPhotos] = useState([])

    useEffect(() => {
        if (gallery.length > 0) {
          const matrixes = listToMatrix(gallery, 2);
          setPhotos(matrixes);
        } else {
          setPhotos([]);
        }
      }, [gallery]);
    
    return(
            <Box sx={{padding:'15px', marginTop:'50px', lineHeight:'50px', 
            border:'4mm ridge #ddf6e7', height:'540px', overflowY:'scroll'}} >
                {photos.map((arr, ind) => {
                        return (
                            <Grid container key={ind} spacing={0} rowGap={2} justifyContent={'space-around'}>
                            {arr.map((photo, index) => {
                                return (
                                    <Grid item md={6} key={index}>
                                        <Image imgSrc={photo}/>
                                    </Grid>
                                );
                            })}
                            </Grid>
                        );
                })}
                
            </Box>
    )
}




