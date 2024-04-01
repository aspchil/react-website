import { Box, Typography } from '@mui/material';
import PostDetails from './PostDetails';

export default function Post({post}) {
    return(
        <Box className="aboutBox">
            <Typography variant='h5' className="banner-title" sx={{alignSelf:'center'}}>Posts</Typography>
                <br/>
            <PostDetails post={post}/>
        </Box>
    )
}




