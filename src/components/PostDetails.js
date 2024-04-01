import { Typography, Box } from '@mui/material';

export default function PostDetails({post}) {
    return(
            <Box className="posts-container">
                
                <Typography variant='h5' className="about-text">{post.title}</Typography>
                <br/>
                <Typography className="about-text" >
                 {post.text}
                </Typography>
                {
                    post.replies.map((repl) => (
                    <>
                        <br/>
                        <Typography className="about-text" fontWeight={'bold'}>
                            {repl.author}
                        </Typography>
                        <Typography className="about-text" >
                            {repl.text}
                        </Typography>
                    </>
                    ))
                }
                
          
                
            </Box>

    )
}




