import React from "react";
import "../../static/css/post.css";
import Grid from "@material-ui/core/Grid";

const Comments = ({username, comment, key}) => {
    return(
        <Grid item xs={12}>
            <article className="Comment">
                <header>
                    <div className="Comment-body">
                        <span>{comment}</span>
                    </div>
                    <div className="Comment-user">
                        <span>{username}</span>
                    </div>
                </header>
            </article>
        </Grid>
    );
}

export default Comments;
