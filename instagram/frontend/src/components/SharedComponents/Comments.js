import React from "react";
import "../../../static/css/comment.css";
import Grid from "@material-ui/core/Grid";

const Comments = ({ author, comment, key, pid }) => {
  return (
    <Grid item xs={12}>
      <article className="Comment">
        <div className="comment-segments">
          <div className="Comment-user">
            <div className="author"><strong>{author}</strong></div>
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
