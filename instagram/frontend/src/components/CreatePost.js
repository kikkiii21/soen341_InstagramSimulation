import React, {useState} from "react";
import "../../static/css/post.css";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from "@material-ui/core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faImages } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";


const CreatePostStyles = makeStyles((theme) => ({
    card: {
        borderRadius: '3px',
        border: '1px solid #e6e6e6',
        backgroundColor: '#fff',
        padding: '30px',
        marginLeft: '20%',
        marginBottom: '20px',
        display: 'flex',
        justifyContent: 'space-around',
        flexDirection: "column",
                
    },
    hideInput: {
        display: 'none',
    },
    imageUpload: {
        // width: '100%',
        // backgroundColor: '#F8F9FA',
        // padding: '10px',
    },
    centerElement: {
        marginLeft: '40%',
    },
    PostButton: {
        width: '30px',
        marginRight: '30px',
        marginLeft: 'auto',
    },
    
}));



const CreatePost = () => {
    //state
    const style = CreatePostStyles();
    const [selectedImage, setSelectedImage] = useState(null);


    //event handlers

    //handle image submission to be completed
    const imageSelectedHandler = (e) => {
         setSelectedImage(e.target.files[0]);
        
    };

    return (
        <div className={style.card}>
            
                
                    <div className={style.imageUpload}>
                        <label for="file-input" >
                            <FontAwesomeIcon className={style.centerElement} icon={faImages} size="6x" color="gray"/>
                            
                        </label>
                        <input className={style.hideInput} id="file-input" type="file" onChange={imageSelectedHandler}/>
                    </div>
                
                    <TextField id="outlined-basic" label="Outlined" variant="outlined" />
               
                <Button className={style.PostButton} variant="contained" color="default" >
                Post
                </Button>
           
        </div>
  );
}
export default CreatePost;