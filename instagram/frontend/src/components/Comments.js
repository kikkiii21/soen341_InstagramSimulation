import React from "react";
import "../../static/css/post.css";
import Grid from "@material-ui/core/Grid";

const Comments = ({username, comment, key}) => {
    return(
        <Grid item xs={12}>
            <article className="Comment">
                <header>
                    <div className="Comment-body">
                        <span><strong>{username}</strong> {comment}</span>
                        <div className="Comment-user">
                        
                        </div>
                    </div>
                </header>
            </article>
        </Grid>
    );
}

export default Comments;
