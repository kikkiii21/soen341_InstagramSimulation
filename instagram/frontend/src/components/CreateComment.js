import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
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
    const commentChange = e.target.value;
    setNewComment(commentChange);
  };

  const onSubmit = () => {
    //setting the comment to show in frontend
    let newCommentObject = {
      body: newComment,
      owner: JSON.parse(localUser).name || LoggedInUserInfo.name,
      post: pid,
    };
    setComment([newCommentObject, ...comment]);

    //submitting post details to backend
    newCommentObject != "" &&
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
  };

  return (
    <div className="spacer">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="CommentBar">
          <input
            class="text-field"
            type="text"
            ref={register}
            onChange={commentChangeHandler}
          />

          <button class="button">Comment</button>
        </div>
      </form>
    </div>
  );
};

export default CreateComment;
