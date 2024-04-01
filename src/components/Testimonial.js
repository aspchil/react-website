import { useState, useEffect } from 'react';
import { listToMatrix } from '../utils/utilities';
import { Typography, Box, Grid } from '@mui/material';


export default function Testimonials({ testimonials }) {
    const bgColors = ["#DDF6E7", "#E7F6FF", "#F6DDE1", "#F7EFDE", "#F1EBFF", "#DBFDFF"]
    
    const [testimnls, setTestimnls] = useState([])

    useEffect(() => {
        if (testimonials.length > 0) {
          const matrixes = listToMatrix(testimonials, 2);
          setTestimnls(matrixes);
        } else {
          setTestimnls([]);
        }
      }, [testimonials]);

    return(
        <Box sx={{padding:'22px', marginTop:'50px', height:'520px', lineHeight:'50px', overflowY:'scroll'}} >
           
           {testimnls.map((arr, ind) => {
                        return (
                            <Grid container key={ind} rowGap={2} justifyContent={'space-around'} paddingBottom={1}>
                            {arr.map((testimnl, index) => {
                                return (
                                    <Grid item md={6} key={index}>
                                        <Box sx={{background:`${bgColors[Math.floor(Math.random() * 6)]}`, padding:'20px', width:'210px'}}>
                                            <Typography className="about-text" color="#523A3A">{`"${testimnl.text}"`}</Typography>
                                            <br/>
                                            <Typography className="about-text" color="#921712">{testimnl.author}</Typography>
                                        </Box>
                                    </Grid>
                                );
                            })}
                            </Grid>
                        );
                })}

        </Box>
    )
}




