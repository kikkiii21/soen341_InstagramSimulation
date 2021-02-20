import React, {useState} from "react";
import "../../static/css/post.css";
import { makeStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBorderNone, faImage, faImages } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import { useForm } from 'react-hook-form';
import { getName } from './data';
import { v4 as uid } from "uuid";


const CreatePostStyles = makeStyles((theme) => ({
    card: {
        borderRadius: '10px',
        border: '1px solid #e6e6e6',
        backgroundColor: '#fff',
        padding: '0px 30px 30px 0px ',
        // marginLeft: '20%',
        marginBottom: '20px',
				display: 'flex',
        justifyContent: 'space-between',
        flexDirection: "column",
				boxShadow: '2px 2px 50px rgb(204, 204, 204)',
				width: '-webkit-fill-available',
    },
		topGroup: {
			display: 'flex',
			flexDirection: "row",
			justifyContent: 'space-between',
			
		},
		bottomGroup: {
			display: 'flex',
			flexDirection: "row",
			justifyContent: 'flex-end',
			margin : '0px',
		},
    hideInput: {
        display: 'none',
    },
    hideImageInput: {
			display: "none",
    },
		postBtn: {
			border: "none",
			backgroundColor: "#0095F6",
			width: '60px',
			height: '35px',
			color: '#fff',
			fontSize: '18px',
			transition: 'background 0.5s ease',
			// borderRadius: '15px',
      outline: 'none',

			'&:hover': {
				backgroundColor: "#000",
				transition: 'background 0.5s ease',
			},
			
		},
    imgBtn: {
			backgroundColor: "#0095F6",
			margin: "0px 10px 0px 10px",
			color: '#fff',
			padding: '8px',
			width: '80px',
			height: '20px',
			// borderRadius: '15px',
			'&:hover':{
				backgroundColor: '#000',
			},
    },
		PostUser: {
			display: 'flex',
			padding: '16px',
			alignItems: 'center',
		},
		PostUserAvatar: {
			width: '60px',
			height: '60px',
			position: 'relative',
			overflow: 'hidden',
			borderRadius: '50%',
		},
		image: {
			display: 'inline',
			margin: '0 auto',
			// marginLeft: '-70%',
			height: '100%',
			width: 'auto',
		},
	 
		PosUserNickname: {
			marginLeft: '20px',
			fontFamily: 'PT Sans',
			fontWeight: 'bold',
		},
		TextField:{
			width: "100%",
			height: "30px",
			borderRadius: "20px",
			outline: "none",
			border: "none",
			backgroundColor: "#E4E6E9",
			padding: "5px 5px 5px 10px",
		},
		TextFieldWrapper: {
			width: "100%",
			display: "flex",
			flexDirection: "column",
			justifyContent: "space-around",
		},
		separatingLine: {
			width: "100%",
			height: "1px",
			backgroundColor: "#E4E6E9",
			border: "none",
			margin: "10px",

		},
    
}));



const CreatePost = ({posts,
                    setPosts,
                    isLoggedIn,
                    setIsLoggedIn,
                    LoggedInUserInfo,
                    setLoggedInUserInfo}) => {
    //state
    const style = CreatePostStyles();
    const [selectedImage, setSelectedImage] = useState({url : "" , raw: ""});
    const [caption, setCaption] = useState("");
    const {register, handleSubmit} = useForm();


    // Event Handlers 

    // handle image change
    const imageSelectedHandler = (e) => {
         setSelectedImage({
           url: URL.createObjectURL(e.target.files[0]),
           raw: e.target.files[0]
         });
    };
    const captionHandler = (e) => {
      let cap = e.target.value;
      setCaption(cap);
    };

    //react hook form submit
    const onSubmit = (obj) => {
		let newPost = {
			name: LoggedInUserInfo.name,
			avatar: LoggedInUserInfo.avatar,
			postImage: selectedImage.url,
			postComment: caption,
			id: uid(),
		};
    setPosts([newPost, ...posts]);
    setCaption("");
    
    };
    
    return (
  <div className={style.card}>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={style.topGroup}>
        <div className={style.PostUser}>
          <div className={style.PostUserAvatar}>
            <img className={style.image} src={LoggedInUserInfo.avatar} alt="Username" />
          </div>
        </div>
        <div className={style.TextFieldWrapper}>
          <input value={caption} type="text" required ref={register} name="postCaption" className={style.TextField} onChange={captionHandler} />
        </div>
      </div>
      <div className={style.bottomGroup}>
        <label for="img-upload">
          <FontAwesomeIcon className={style.imgBtn} icon={faImages} size="2x" />
        </label>
        <input required value={null} onChange={imageSelectedHandler} ref={register} name="picture" id="img-upload" className={style.hideImageInput} type="file" />
        <button className={style.postBtn} >Post</button>
      </div>
    </form> 
  </div>
  );
}
export default CreatePost;