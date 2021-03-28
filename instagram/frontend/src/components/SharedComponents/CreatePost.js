import React, { useState, useContext } from "react";
import "../../../static/css/post.css";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { useForm } from "react-hook-form";
import { v4 as uid } from "uuid";
import { UserContext } from "../Context/AppContext";
import { PostsContext } from "../Context/PostsContext";
import { UserStatusContext } from "../Context/UserStatusContext";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
// to account for cross site request forgery vulnerability
// required by django backend
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

const CreatePostStyles = makeStyles((theme) => ({
  card: {
    borderRadius: "10px",
    border: "1px solid #e6e6e6",
    backgroundColor: "#fff",
    padding: "0px 30px 30px 0px ",
    // marginLeft: '20%',
    marginBottom: "20px",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    boxShadow: "2px 2px 50px rgb(204, 204, 204)",
    width: "-webkit-fill-available",
  },
  topGroup: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bottomGroup: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    margin: "0px",
  },
  hideInput: {
    display: "none",
  },
  hideImageInput: {
    display: "none",
  },
  postBtn: {
    backgroundColor: "#0095F6",
    fontSize: "15px",
    padding: "5px 10px",
    margin: "5px 0px",
    transitionDuration: "0.4s",
    border: "none",
    borderRadius: "5px",
    margin: "0px 10px",
    outline: "none",
    color: "#fff",
    height: "40px",

    "&:hover": {
      backgroundColor: "#000",
      transition: "background 0.5s ease",
    },
  },
  imgBtn: {
    width: "40px",
    height: "30px",
    backgroundColor: "#0095F6",
    fontSize: "25px",
    padding: "5px 8px",
    margin: "5px 0px",
    transitionDuration: "0.4s",
    border: "none",
    borderRadius: "5px",
    margin: "0px 10px",
    outline: "none",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#000",
    },
  },
  PostUser: {
    display: "flex",
    padding: "16px",
    alignItems: "center",
  },
  PostUserAvatar: {
    width: "60px",
    height: "60px",
    position: "relative",
    overflow: "hidden",
    borderRadius: "50%",
  },
  image: {
    display: "inline",
    margin: "0 auto",
    // marginLeft: '-70%',
    height: "100%",
    width: "auto",
  },

  PosUserNickname: {
    marginLeft: "20px",
    fontFamily: "PT Sans",
    fontWeight: "bold",
  },
  TextField: {
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

const CreatePost = () => {
  //state
  const style = CreatePostStyles();
  const [selectedImage, setSelectedImage] = useState({ url: "", raw: "" });
  const [caption, setCaption] = useState("");
  const { register, handleSubmit } = useForm();
  const { LoggedInUserInfo, setLoggedInUserInfo } = useContext(UserContext);
  const { isLoggedIn, setIsLoggedIn } = useContext(UserStatusContext);
  const { posts, setPosts } = useContext(PostsContext);
  const local = localStorage.getItem("userInfo");

  // Event Handlers

  // handle image change
  const imageSelectedHandler = (e) => {
    setSelectedImage({
      url: URL.createObjectURL(e.target.files[0]),
      raw: e.target.files[0],
    });
  };
  const captionHandler = (e) => {
    let cap = e.target.value;
    setCaption(cap);
  };

  //react hook form submit
  const onSubmit = (obj) => {
    //setting the post to show in frontend
    let newPost = {
      author: JSON.parse(local).author,
      avatar: LoggedInUserInfo.avatar,
      photo: selectedImage.url,
      caption: caption,
      id: uid(),
    };
    setPosts([newPost, ...posts]);

    //submitting post details to backend
    let form_data = new FormData();
    form_data.append("photo", selectedImage.raw);
    form_data.append("caption", newPost.caption);
    form_data.append("author", newPost.author);
    let url = "postsEndpoint/";
    axios
      .post(url, form_data, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `token ${
            LoggedInUserInfo.token || JSON.parse(local).token
          }`,
        },
      })
      .then((res) => {
        // console.log(res.data);
      })
      .catch((err) => console.log(err));

    setCaption("");
  };

  return (
    <div className={style.card}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={style.topGroup}>
          <div className={style.PostUser}>
            <div className={style.PostUserAvatar}>
              <img
                className={style.image}
                src={LoggedInUserInfo.avatar || JSON.parse(local).avatar}
                alt="Username"
              />
            </div>
          </div>
          <div className={style.TextFieldWrapper}>
            <input
              value={caption}
              type="text"
              required
              ref={register}
              name="postCaption"
              className={style.TextField}
              onChange={captionHandler}
            />
          </div>
        </div>
        <div className={style.bottomGroup}>
          <label for="img-upload">
            <AddPhotoAlternateIcon
              className={style.imgBtn}
              fontSize="default"
            />
          </label>
          <input
            required
            value={null}
            onChange={imageSelectedHandler}
            ref={register}
            name="picture"
            id="img-upload"
            className={style.hideImageInput}
            type="file"
          />
          <button className={style.postBtn}>Post</button>
        </div>
      </form>
    </div>
  );
};
export default CreatePost;
