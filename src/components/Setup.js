import { useState, useEffect } from 'react';
import { Box, Grid, Typography, Tooltip, TextField, IconButton } from '@mui/material';
import Image from './Image';
import AddTaskIcon from '@mui/icons-material/AddTask';
import AddIcon from '@mui/icons-material/Add';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useFirebase, createDoc } from '../services/firebase';
import { isEmpty, docId } from '../utils/utilities';
import { Textarea } from './Textarea';

export default function Setup() {
    const [siteData, setSiteData] = useState({ gallery:[], videos:[]});
    const [middleImg, setMiddleImg] = useState(null);
    const [leftImg, setLeftImg] = useState(null);
    const [rightImg, setRightImg] = useState(null);
    const [photoImgs, setPhotoImgs] = useState([]);
    const [videos, setVideos] = useState([]);
    const [testimonials, setTestimonials] = useState([{text:'', author:''}])
    const [post, setPost] = useState({title:'', text:'', replies:[{text:'', author:''}]})

     const [snapshot, loadingSnapshot, updateDoc, 
        handleImageUpload, handleMultipleUpload] = useFirebase(docId);

    useEffect(() => {
        const data = snapshot?.data();
        console.log('data', data)
          if (!isEmpty(data)) {
            setSiteData(data);
            if (!isEmpty(data.testimonials)) {
                setTestimonials(data.testimonials);
            }
            if (!isEmpty(data.post)) {
                setPost(data.post);
            }
          }
      }, [snapshot]);

      const uploadImages = (e) => {
        e.preventDefault();
        handleMultipleUpload(photoImgs, 'gallery')
      }
      
      const uploadVideos = (e) => {
        e.preventDefault()
        handleMultipleUpload(videos, 'videos')
      }

    const handleChangeText = ( e, i) => {
        let tMonials = [...testimonials];
         tMonials[i] = {text: e.target.value, author: tMonials[i].author};
         setTestimonials(tMonials);
      }
      const handleChangeAuthor = ( e, i) => {
        let tMonials = [...testimonials];
         tMonials[i] = {author: e.target.value, text: tMonials[i].text};
         setTestimonials(tMonials);
      }
      const removeClickTestimonial = (e,i) => {
            e.preventDefault();
            if(i === 0) return;
            let tMonials = [...testimonials];
            tMonials.splice(i, 1);
            setTestimonials(tMonials);
      }

      const addClick = (e) => {
        e.preventDefault();
        let tMonials = [...testimonials];
        tMonials = [...tMonials, {text:'', author:''}]
        setTestimonials(tMonials);
      }

      const renderTestominials = () => {
          return testimonials.map((el,i) => (
            <Grid container key={i}>
              <Grid item container xs={12}>
      
                <Grid item>
      
                 <TextField
                    value={el.text}
                    onChange={(e)=>handleChangeText(e, i)}
                    label={"Testimonial Text"}
                    type="text"
                  />

                    <TextField
                        value={el.author}
                        onChange={(e)=>handleChangeAuthor(e, i)}
                        label={"Testimonial Author"}
                        type="text"
                  />
                <br/>
                </Grid>
              
              <br/>
              </Grid>
      
              <Grid item container xs={12} alignItems="flex-end" direction="column">
                <Grid item>
                <Tooltip title="Remove Testimonial" placement="left-start">
                  <IconButton onClick={(e)=>removeClickTestimonial(e, i)}>
                  <DeleteOutlineIcon /> 
                  </IconButton>
                </Tooltip>
                <br/>
                </Grid>
              </Grid>  
          </Grid>  
          ));
      }

    const postTestimonial = (e) => {
        e.preventDefault()
        const data ={
            ...siteData,
            testimonials,
        }
        firebaseUpdate(data)
    }

    const postPost = (e) => { 
        e.preventDefault()
        const data ={
            ...siteData,
            post,
        }
        firebaseUpdate(data)
    }

    const createData = async (e) => {
        e.preventDefault()
        const id = await createDoc({
            videos: [],
            gallery: []
        });
    }

    const handleChangeText2 = ( e, i) => {
        let pReplies = [...post.replies];
         pReplies[i] = {text: e.target.value, author: pReplies[i].author};
        
         setPost((prevState)=>({
            ...prevState,
            replies: pReplies
        }));
      }
      const handleChangeAuthor2 = ( e, i) => {
        let pReplies = [...post.replies];
         pReplies[i] = {author: e.target.value, text: pReplies[i].text};
         setPost((prevState)=>({
            ...prevState,
            replies: pReplies
        }));
      }
      const removeClickReplies = (e,i) => {
            e.preventDefault();
            if(i === 0) return;
            let pReplies = [...post.replies];
            pReplies.splice(i, 1);

            setPost((prevState)=>({
                ...prevState,
                replies: pReplies
            }));
      }

      const addClick2 = (e) => {
        e.preventDefault();
        let pReplies = [...post.replies];
        pReplies = [...pReplies, {text:'', author:''}]
        setPost((prevState)=>({
            ...prevState,
            replies: pReplies
        }));
      }

      const renderReplies = () => {
          return post.replies.map((el,i) => (
            <Grid container key={i}>
              <Grid item container xs={12}>
      
                <Grid item>
      
                 <TextField
                    value={el.text}
                    onChange={(e)=>handleChangeText2(e, i)}
                    label={"Reply Text"}
                    type="text"
                  />

                    <TextField
                        value={el.author}
                        onChange={(e)=>handleChangeAuthor2(e, i)}
                        label={"Reply Author"}
                        type="text"
                  />
                <br/>
                </Grid>
              <br/>
              </Grid>
      
              <Grid item container xs={12} alignItems="flex-end" direction="column">
                <Grid item>
                <Tooltip title="Remove Reply" placement="left-start">
                  <IconButton onClick={(e)=>removeClickReplies(e, i)}>
                  <DeleteOutlineIcon /> 
                  </IconButton>
                </Tooltip>
                <br/>
                </Grid>
              </Grid>

          </Grid>  
          ));
      }



    const uploadBannerImg = (e) => {
        e.preventDefault();
        handleImageUpload(leftImg, 'leftBanner')
        handleImageUpload(middleImg, 'middleBanner')
        handleImageUpload(rightImg, 'rightBanner')
        console.log('middleImg', middleImg, 'leftImg', leftImg, 'rightImg', rightImg)
    }

    const removeImg = (e, index) => {
        e.preventDefault();
        const { gallery } = siteData;
        gallery.splice(index, 1);
        firebaseUpdate({...siteData, gallery});
        setSiteData((prevState) => ({...prevState, gallery}));
    }

    const removeVid = (e, index) => {
        e.preventDefault();
        const { videos } = siteData;
        videos.splice(index, 1);
        firebaseUpdate({...siteData, videos});
        setSiteData((prevState) => ({...prevState, videos}));
    }


    const firebaseUpdate = (data) => {
        updateDoc(data)
    }
    
    const handleFileUpload = (e, section) => {
        switch(section){
            case 1:
                setLeftImg(e.target.files[0]);
                break;
            case 2:
                setMiddleImg(e.target.files[0]);
                break;
            case 3:
                setRightImg(e.target.files[0]);
                break;
            case 4:
                setPhotoImgs(e.target.files);
                break;
            case 5:
                setVideos(e.target.files);
            default:
                setPhotoImgs(e.target.files);
                break;
        }
    }

    return(
        <Box className="aboutBox">
            {loadingSnapshot ? <p>Loading</p> : ''}
            <Box className="about-container">
                <Box className="resourceBox" sx={{borderTopLeftRadius: '139px',
            display: 'flex', flexDirection:'column'}}>
                    {/* <button onClick={createData}>Create Data</button> */}
                    <label>Left Banner Image</label>
                    <input type="file" accept='image/*' onChange={(e)=>handleFileUpload(e, 1)}/>
                    <label>Middle Banner Image</label>
                    <input type="file" accept='image/*' onChange={(e)=>handleFileUpload(e, 2)}/>
                    <label>Left Banner Image</label>
                    <input type="file" accept='image/*' onChange={(e)=>handleFileUpload(e, 3)}/>
                    <br/>
                    <button onClick={uploadBannerImg} 
                    style={{padding:'15px', color:'#fff', borderRadius:'5px', background:"orange"}}>Upload Banner Images</button>
                    
                    <Box className="video-container">
                                     
                         <Box sx={{padding:'20px', marginTop:'50px', lineHeight:'50px', 
                        width: '100%', height:'540px', overflowY:'scroll'}} >
                    
                            <Typography variant='h5' className="banner-title">Banner Images</Typography>

                            <Grid container spacing={3} rowGap={3} justifyContent={'space-around'}>
                                <Grid item md={4}>
                                    <Typography >Left Banner Image</Typography>
                                    <Image imgSrc={siteData.leftBanner} />
                                </Grid>
                                <Grid item md={4}>
                                    <Typography >Middle Banner Image</Typography>
                                    <Image imgSrc={siteData.middleBanner} />
                                </Grid>
                                <Grid item md={4}>
                                    <Typography >Right Banner Image</Typography>
                                    <Image imgSrc={siteData.rightBanner} />
                                </Grid>
                            </Grid>

                            <br/>
                            <br/>
                            <label>Upload Galley images* (Multiple)</label>
                            <input 
                                type="file" 
                                accept='image/*' 
                                onChange={(e)=>handleFileUpload(e, 4)}
                                multiple
                            />
                            <button onClick={uploadImages}
                            style={{padding:'15px', color:'#fff', 
                            borderRadius:'5px', background:"blue"}}
                            >Upload Images</button>
<br/><br/>
                            <Typography variant='h5' className="banner-title">Photo Gallery</Typography>
                            
                            <Box sx={{display:'flex', background:'#fff', padding:'20px',  
                            justifyContent:'space-around', 
                            height: '450px', overflowY: 'scroll'}}>
                                {
                                    siteData.gallery.map((imgUrl, index) => (
                                        <Box key={index}>
                                            <button style={{padding:'5px', color:'#fff', borderRadius:'5px', background:"red"}}
                                            onClick={(e)=>removeImg(e, index)}>delete</button>
                                            <br/>
                                            <Image imgSrc={imgUrl} />
                                        </Box>
                                    ))
                                }
                            </Box>


                            <br/>
                            <br/>

                            <label>Upload Videos* (Multiple)</label>
                            <input 
                                type="file" 
                                accept='video/*' 
                                onChange={(e)=>handleFileUpload(e, 5)}
                                multiple
                            />
                            <button onClick={uploadVideos}
                            style={{padding:'15px', color:'#fff', borderRadius:'5px', background:"green"}}
                            >Upload Videos</button>
                    
                    <br/>
                    <br/>
                            <Typography variant='h5' className="banner-title">Videos</Typography>
                            <Box sx={{display:'flex', background:'#fff', padding:'20px',  
                            justifyContent:'space-around', 
                            height: '450px', overflowY: 'scroll'}}>
                                {
                                    siteData.videos.map((vidUrl, index) => (
                                        <Box key={index}>
                                            
                                            <button style={{
                                                padding:'5px', 
                                                color:'#fff', 
                                                borderRadius:'5px', 
                                                background:"red"
                                            }}
                                            onClick={(e)=>removeVid(e, index)}
                                            >delete</button>
                                            <video width="300" controls>
                                                <source
                                                src={vidUrl}
                                                type="video/mp4"
                                                />
                                            </video>
                                        </Box>
                                    ))
                                }
                            </Box>
<br/>
<br/>
                           

                       {renderTestominials()}


                       <Grid container>
                       <br/>
                        <Grid item md={12} >
                            <Tooltip title="Add more testimonials" placement="right-start">
                                <IconButton onClick={(e)=>addClick(e)}>
                                <AddCircleOutlineIcon />  
                                </IconButton>
                            </Tooltip>
                        </Grid>

                        <Grid item>
                        <button onClick={(e)=>postTestimonial(e)} 
                        style={{padding:'15px', color:'#fff', borderRadius:'5px', background:"blue"}}
                        disabled={testimonials[0].text === '' || testimonials[0].author === ''}>
                            Submit Testimonials
                        </button>
                        <br/>
                        </Grid>
                    </Grid>
                     
              <Box>
              <Grid container>
                       <br/>
                           <Grid item md={12} >
                           <TextField
                    value={post.title}
                    onChange={(e)=>{
                        setPost((prevState)=>({
                            ...prevState,
                            title: e.target.value,
                        }))
                    }}
                    style={{width:'100%'}}
                    label={"Post title"}
                    type="text"
                  />
                            </Grid>
                            <br/>
                            <br/>
                           <Grid item md={12} >
                            
                                <Textarea aria-label="minimum height" minRows={10}
                                style={{width:'100%'}}
                                value={post.text}
                                onChange={(e)=>{
                                    setPost((prevState)=>({
                                        ...prevState,
                                        text: e.target.value,
                                    }))
                                }}
                                label={"Post Body"}
                                placeholder="Minimum 3 rows" />
                            </Grid>
                </Grid>


                
                <br/>
                        {renderReplies()}
                        

                        <Grid container>
                        <Grid item md={12} >
                        <Tooltip title="Add more replies" placement="right-start">
                            <IconButton onClick={(e)=>addClick2(e)}>
                            <AddCircleOutlineIcon />  
                            </IconButton>
                        </Tooltip>
                    </Grid>

                            <Grid item>
                                    <button 
                                    style={{padding:'15px', color:'#fff', borderRadius:'5px', background:"orange"}}
                                    onClick={(e)=>postPost(e)} disabled={post.replies[0].text === '' || post.replies[0].author === ''}>
                                        Submit Post
                                    </button>
                                    <br/>
                            </Grid>
                        </Grid>

                     </Box>

                    </Box>
                 </Box>
             </Box>

        </Box>
    </Box>

    )
}




