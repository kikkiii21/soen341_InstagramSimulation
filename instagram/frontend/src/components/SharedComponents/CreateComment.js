import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import "../../../static/css/comment.css";
import { UserContext } from "../Context/AppContext";
import { CommentsContext } from "../Context/CommentsContext";
import { v4 as uid } from "uuid";
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
    const commentChange = e.target.value;
    setNewComment(commentChange);
  };

  const onSubmit = () => {
    //setting the comment to show in frontend
    let newCommentObject = {
      comment: newComment,
      author: JSON.parse(localUser).author || LoggedInUserInfo.author,
      post: pid,
    };
    setComment([newCommentObject, ...comment]);

    //submitting post details to backend
    newCommentObject != "" &&
      axios
        .post("commentsEndpoint/", newCommentObject, {
          headers: {
            "content-type": "application/json",
            Authorization: `token ${
              LoggedInUserInfo.token || JSON.parse(localUser).token
            }`,
          },
        })
        .catch((err) => console.log(err));
  };

  return (
    <div className="spacer">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="CommentBar">
          <input
            onChange={commentChangeHandler}
            value={newComment}
            class="text-field"
            type="text"
            ref={register}
          />

          <button class="button">Comment</button>
        </div>
      </form>
    </div>
  );
};

export default CreateComment;
