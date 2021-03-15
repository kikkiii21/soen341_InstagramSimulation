import React from "react";
import "../../static/css/comment.css";
import Grid from "@material-ui/core/Grid";

const Comments = ({ username, comment, key }) => {
  return (
    <Grid item xs={12}>
      <article className="Comment">
        <div className="comment-segments">
          <div className="Comment-user">
            <div className="username">{username}</div>
          </div>
          <div className="Comment-body">
            <span>{comment}</span>
          </div>
        </div>
      </article>
    </Grid>
  );
};

export default Comments;
