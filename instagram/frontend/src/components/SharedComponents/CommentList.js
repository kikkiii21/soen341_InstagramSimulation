import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import Comments from "./Comments";
import { CommentsContext } from "../Context/CommentsContext";
import { v4 as uid } from "uuid";
import { UserContext } from "../Context/AppContext";
import { UserStatusContext } from "../Context/UserStatusContext";
import Posts from "./Posts";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

const CommentList = ({ pid }) => {
  const { comment, setComment } = useContext(CommentsContext);
  const { LoggedInUserInfo, setLoggedInUserInfo } = useContext(UserContext);
  const { isLoggedIn, setIsLoggedIn } = useContext(UserStatusContext);
  const [isLoading, setIsLoading] = useState(true);
  const localPosts = localStorage.getItem("userInfo");

  useEffect(() => {
    axios

      .get("commentsEndpoint/")
      .then((response) => {
        setComment(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    localStorage.setItem("comments", JSON.stringify(comment));
    setIsLoading(false);
  }, [comment]);

  return (
    <>
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        comment &&
        comment.map(
          (item) =>
            item.post == pid && (
              <Comments
                author={item.author}
                comment={item.comment}
                key={uid()}
                pid={item.pid}
              />
            )
        )
      )}
    </>
  );
};
export default CommentList;
