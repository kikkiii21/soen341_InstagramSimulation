import React from "react";
import "../../static/css/post.css";
import Grid from "@material-ui/core/Grid";


const Posts = ({name, avatar, postImage, postComment, key}) => {
    return (
        <Grid  item xs={12}>
        <article className="Post" >
    <header>
      <div className="Post-user">
        <div className="Post-user-avatar">
          <img src={avatar} alt="Chris" />
        </div>
        <div className="Post-user-nickname">
          <span>{name}</span>
        </div>
      </div>
    </header>
    <div className="Post-image">
      <div className="Post-image-bg">
        <img alt="Icon Living" src={postImage} />
      </div>
    </div>
    <div className="Post-caption">
      <strong>{name}</strong> {postComment}
    <div className="CommentBar">
      <button class="button">Comment</button>
      <p/>
      <textarea class="text-area"></textarea>
      </div>
    </div>  
  </article>
  </Grid>
  );
}
export default Posts;