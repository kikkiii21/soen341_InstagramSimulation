import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import { v4 as uid } from "uuid";
import "../../static/css/comment.css";
import { UserContext } from "./AppContext";
import { CommentsContext } from "./CommentsContext";
import axios from "axios";

const CreateComment = ({ pid }) => {
  //state
  const [newComment, setNewComment] = useState("");
  const { register, handleSubmit } = useForm();
  const localUser = localStorage.getItem("userInfo");
  const { LoggedInUserInfo, setLoggedInUserInfo } = useContext(UserContext);
  const { comment, setComment } = useContext(CommentsContext);

  //event handlers
  const commentChangeHandler = (e) => {
    let commentChange = e.target.value;
    console.log(e.target.value);
    setNewComment(commentChange);
  };

  const onSubmit = (obj) => {
    //setting the comment to show in frontend
    let newCommentObject = {
      body: newComment,
      owner: JSON.parse(localUser).name || LoggedInUserInfo.name,
      post: pid,
    };
    setComment([newCommentObject, ...comment]);
    console.log(newCommentObject);

    //submitting post details to backend
    axios
      .post("comments/", newCommentObject, {
        headers: {
          "content-type": "application/json",
          Authorization: `token ${
            LoggedInUserInfo.token || JSON.parse(localUser).token
          }`,
        },
      })
      
      .catch((err) => console.log(err));

    setNewComment("");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="CommentBar">
        <input
          class="text-field"
          type="text"
          ref={register}
          onChange={commentChangeHandler}
        />
        <b />
        <button class="button">Comment</button>
      </div>
    </form>
  );
};

export default CreateComment;
