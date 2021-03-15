import React from "react";
import "../../static/css/post.css";
import Grid from "@material-ui/core/Grid";
import Collapsible from './Collapsible'
import CreateComment from './CreateComment';


const Posts = ({name, avatar, postImage, postComment, key, pid}) => {
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
    <CreateComment pid={pid}/>
      <strong>{name}</strong> {postComment}
      <Collapsible pid={pid} />
    </div>  
  </article>
  </Grid>
  );
}
export default Posts;