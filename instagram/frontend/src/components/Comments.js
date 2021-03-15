import React from "react";
import "../../static/css/comment.css";
import Grid from "@material-ui/core/Grid";


const Comments = ({username, avatar, post, comment, key, created_at}) => {
    return(
        <Grid item xs={12}>
            <article className="Comment">
                <header>
                    <div className="Comment-body">
                        <span><b>{username}</b> {comment}</span>
                    </div>
                </header>
            </article>
        </Grid>
    );
}

export default Comments;
