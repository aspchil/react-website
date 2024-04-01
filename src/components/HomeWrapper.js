import { useEffect, useState } from 'react'
import { Typography, Box, Grid } from '@mui/material';
import PhotoGallery from './PhotoGallery';
import Banner from './Banner';
import About from './About';
import Posts from './Posts';
import Testimonial from './Testimonial'; 
import Videos from './Videos';
import Copyright from './Copyright';

import { useFirebase } from '../services/firebase';
import { isEmpty, docId } from '../utils/utilities';

export default function HomeWrapper() {
    const [isMobile, setIsMobile] = useState(false);
    const [siteData, setSiteData] = useState({ gallery:[], videos:[]});
    const [testimonials, setTestimonials] = useState([{text:'', author:''}])
    const [post, setPost] = useState({title:'', text:'', replies:[{text:'', author:''}]})
    
    const [snapshot, loadingSnapshot, updateDoc, 
      handleImageUpload, handleMultipleUpload] = useFirebase(docId);

  useEffect(() => {
      const data = snapshot?.data();
      console.log('data', data)
      console.log('post', post)
        if (!isEmpty(data)) {
          setSiteData(data);
          if (!isEmpty(data.testimonials)) {
            setTestimonials(data.testimonials);
          }
          if (!isEmpty(data.post)) {
            console.log('not is empty')
              setPost(data.post);
          }
        }
    }, [snapshot]);


    const handleResize = () => {
        console.log("windowsize", window.innerWidth)
        if (window.innerWidth < 720) {
          setIsMobile(true);
        } else {
          setIsMobile(false);
        }
      };
    
      useEffect(() => {
        window.addEventListener("resize", handleResize);
      }, [window.innerWidth]);
    
    return(
        <main style={{width:'100%'}}>
            <Banner isMobile={isMobile} 
                    middleBanner={siteData.middleBanner}
                    rightBanner={siteData.rightBanner}
                    leftBanner={siteData.leftBanner}
              />
            <About isMobile={isMobile}/>
            
            <Box className="resourceBox">
                <Box className="resource-container">
                    <Grid container display={'flex'} rowGap={3}>
                        <Grid item md={6} >
                                <Typography variant='h5' className="banner-title" color={'#921712'}>PHOTO GALLERY</Typography>             
                                <PhotoGallery gallery={siteData.gallery} />
                        </Grid>
                        <Grid item md={6}>
                            <Typography variant='h5' className="banner-title" color={'#921712'}>TESTIMONIALS</Typography>        
                            <Testimonial testimonials={testimonials} />
                        </Grid>
                    </Grid>
                </Box>
            </Box>

          <Posts isMobile={isMobile} post={post}/>
            <Videos videos={siteData.videos}/>
            <Copyright />
        </main>
    )
}




