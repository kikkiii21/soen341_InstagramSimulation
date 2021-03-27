import React, { useState } from "react";
import "../../../static/css/post.css";
import Grid from "@material-ui/core/Grid";
import Collapsible from "./Collapsible";
import CreateComment from "./CreateComment";
import FavoriteIcon from "@material-ui/icons/Favorite";
import CommentIcon from "@material-ui/icons/Comment";
import ShareIcon from "@material-ui/icons/Share";
import { Link } from "@material-ui/core";
import "../../../static/css/collapsible.css";

const Posts = ({ author, avatar, postImage, postCaption, key, pid }) => {
  //state
  const [event, setEvent] = useState(false);
  const [liked, setLiked] = useState(false);

  //event handlers
  const handleCommentsCollapsable = () => {
    setEvent(!event);
  };
  const handleLikes = () => {
    setLiked(!liked);
  };

  const profileLinkHandler = () => {
    localStorage.setItem("profileRedirect", JSON.stringify(author));
    window.location = "/profile";
  };
  return (
    <Grid item xs={12}>
      <article className="Post">
        <header>
          <div className="Post-user">
            <div className="Post-user-avatar">
              <img src={avatar} alt="Chris" />
            </div>
            <div className="Post-user-nickname">
              <span>
                <a className="link-styling" onClick={profileLinkHandler}>
                  {author}
                </a>
              </span>
            </div>
          </div>
        </header>
        <div className="Post-image">
          <div className="Post-image-bg">
            <img alt="Icon Living" src={postImage} />
          </div>
        </div>
        <div className="action-btn-group">
          <div onClick={handleLikes}>
            <FavoriteIcon className={liked ? "liked" : "action-icons"} />
          </div>
          <div onClick={handleCommentsCollapsable}>
            <CommentIcon className="action-icons" />
          </div>
          <div>
            <ShareIcon className="action-icons" />
          </div>
        </div>
        <div className="Post-caption">
          <div>
            <CreateComment pid={pid} />
            <strong>{author}</strong> {postCaption}
          </div>
          <div className="comment-list">
            <Collapsible pid={pid} event={event} />
          </div>
        </div>
      </article>
    </Grid>
  );
};
export default Posts;
